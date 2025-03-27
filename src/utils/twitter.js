import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {Object} TweetMetrics
 * @property {number} retweet_count
 * @property {number} reply_count
 * @property {number} like_count
 * @property {number} quote_count
 */

/**
 * @typedef {Object} TweetAuthor
 * @property {string} name
 * @property {string} username
 * @property {string} profile_image_url
 */

/**
 * @typedef {Object} TweetMedia
 * @property {string} type
 * @property {string} url
 * @property {string} [preview_image_url]
 */

/**
 * @typedef {Object} Tweet
 * @property {string} id
 * @property {string} text
 * @property {TweetAuthor} author
 * @property {string} created_at
 * @property {TweetMedia[]} [media]
 * @property {Object[]} [referenced_tweets]
 * @property {TweetMetrics} metrics
 */

// Cache file path
const CACHE_FILE = path.join(__dirname, "../../.cache/tweets.json");

// Static cache for tweets
let tweetsCache = [];

// Load cache from disk
function loadCacheFromDisk() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = fs.readFileSync(CACHE_FILE, "utf8");
      tweetsCache = JSON.parse(cacheData);
    }
  } catch (error) {
    console.warn("Failed to load cache from disk:", error);
  }
}

// Save cache to disk
function saveCacheToDisk() {
  try {
    const cacheDir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(tweetsCache, null, 2));
    console.log(`Saved ${tweetsCache.length} tweets to cache`);
  } catch (error) {
    console.warn("Failed to save cache to disk:", error);
  }
}

// Load cache at initialization
loadCacheFromDisk();

// Import fallback tweets
import { fallbackTweets } from "../data/fallbackTweets.js";

// Main function for loading tweets
async function fetchTweetDataDirect(tweetId, retryCount = 0) {
  if (typeof window !== "undefined") {
    console.warn(
      "Twitter API calls should only be made during build time, not in the browser"
    );
    return null;
  }

  const token = process.env.TWITTER_BEARER_TOKEN;
  if (!token) {
    console.warn(
      "Twitter Bearer Token not found. Please set TWITTER_BEARER_TOKEN environment variable."
    );
    return null;
  }

  try {
    console.log(`Fetching tweet ${tweetId}...`);

    const response = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&media.fields=type,url,preview_image_url,variants&tweet.fields=created_at,public_metrics,referenced_tweets&user.fields=name,username,profile_image_url`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.text();
      console.error(`Twitter API error: ${status} - ${response.statusText}`);
      console.error(`Error details:`, errorData);
      return null;
    }

    const data = await response.json();
    return transformTwitterResponse(data);
  } catch (error) {
    console.error(`Error fetching tweet ${tweetId}:`, error);
    return null;
  }
}

function transformTwitterResponse(apiResponse) {
  const tweet = apiResponse.data;
  const user = apiResponse.includes?.users?.[0] || {
    name: "Unknown",
    username: "unknown",
    profile_image_url:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
  };
  const media = apiResponse.includes?.media;
  const quotedTweet = tweet.referenced_tweets?.find(
    (ref) => ref.type === "quoted"
  );
  const quotedTweetData = quotedTweet
    ? apiResponse.includes?.tweets?.find((t) => t.id === quotedTweet.id)
    : null;
  const quotedTweetAuthor = quotedTweetData
    ? apiResponse.includes?.users?.find(
        (u) => u.id === quotedTweetData.author_id
      )
    : null;
  const quotedTweetMedia = quotedTweetData?.attachments?.media_keys
    ? apiResponse.includes?.media?.filter((m) =>
        quotedTweetData.attachments.media_keys.includes(m.media_key)
      )
    : null;

  return {
    id: tweet.id,
    text: tweet.text,
    author: {
      name: user.name,
      username: user.username,
      profile_image_url: user.profile_image_url,
    },
    created_at: tweet.created_at,
    media: media?.map((m) => ({
      type: m.type,
      url: m.url || m.preview_image_url,
      preview_image_url: m.preview_image_url,
      variants: m.variants,
    })),
    quoted_tweet: quotedTweetData
      ? {
          id: quotedTweetData.id,
          text: quotedTweetData.text,
          author: quotedTweetAuthor
            ? {
                name: quotedTweetAuthor.name,
                username: quotedTweetAuthor.username,
                profile_image_url: quotedTweetAuthor.profile_image_url,
              }
            : null,
          created_at: quotedTweetData.created_at,
          media: quotedTweetMedia?.map((m) => ({
            type: m.type,
            url: m.url || m.preview_image_url,
            preview_image_url: m.preview_image_url,
            variants: m.variants,
          })),
          metrics: quotedTweetData.public_metrics
            ? {
                retweet_count:
                  quotedTweetData.public_metrics.retweet_count || 0,
                reply_count: quotedTweetData.public_metrics.reply_count || 0,
                like_count: quotedTweetData.public_metrics.like_count || 0,
                quote_count: quotedTweetData.public_metrics.quote_count || 0,
              }
            : {
                retweet_count: 0,
                reply_count: 0,
                like_count: 0,
                quote_count: 0,
              },
        }
      : null,
    metrics: tweet.public_metrics
      ? {
          retweet_count: tweet.public_metrics.retweet_count || 0,
          reply_count: tweet.public_metrics.reply_count || 0,
          like_count: tweet.public_metrics.like_count || 0,
          quote_count: tweet.public_metrics.quote_count || 0,
        }
      : {
          retweet_count: 0,
          reply_count: 0,
          like_count: 0,
          quote_count: 0,
        },
  };
}

// Function to update cache
export function updateTweetsCache(tweets) {
  // Instead of replacing the entire cache, merge new tweets with existing ones
  const existingTweets = getCachedTweets();
  const tweetMap = new Map(existingTweets.map((tweet) => [tweet.id, tweet]));

  // Update or add new tweets
  tweets.forEach((tweet) => {
    if (tweet) {
      tweetMap.set(tweet.id, tweet);
    }
  });

  // Convert map back to array
  tweetsCache = Array.from(tweetMap.values());
  saveCacheToDisk();
}

// Function to get tweets from cache
export function getCachedTweets() {
  return tweetsCache;
}

// Function to load and cache tweets
export async function fetchAndCacheTweets(tweetIds) {
  // If we're in the browser, return an empty array
  if (typeof window !== "undefined") {
    return [];
  }

  const cachedTweets = getCachedTweets();
  console.log(
    "Current cache contains IDs:",
    cachedTweets.map((t) => t.id)
  );

  const cachedTweetMap = new Map(
    cachedTweets.map((tweet) => [tweet.id, tweet])
  );

  // Create Map for quick access to fallback tweets
  const fallbackTweetMap = new Map(
    fallbackTweets.map((tweet) => [tweet.id, tweet])
  );

  // Filter tweet IDs that are not in cache AND not in fallback
  const uncachedTweetIds = tweetIds.filter(
    (id) => !cachedTweetMap.has(id) && !fallbackTweetMap.has(id)
  );
  console.log("Uncached IDs:", uncachedTweetIds);

  // If there are tweets to load, load only one at a time
  if (uncachedTweetIds.length > 0) {
    // Take only the first uncached tweet
    const tweetIdToFetch = uncachedTweetIds[0];
    console.log(`Attempting to fetch tweet ${tweetIdToFetch}...`);

    const fetchedTweet = await fetchTweetDataDirect(tweetIdToFetch);

    // Process result
    if (fetchedTweet) {
      // If tweet is successfully retrieved, update or add to the cache
      const existingIndex = tweetsCache.findIndex(
        (t) => t.id === tweetIdToFetch
      );
      if (existingIndex !== -1) {
        tweetsCache[existingIndex] = fetchedTweet;
      } else {
        tweetsCache.push(fetchedTweet);
      }
      cachedTweetMap.set(tweetIdToFetch, fetchedTweet);

      // Save updated cache
      saveCacheToDisk();
      console.log(`Successfully fetched and cached tweet ${tweetIdToFetch}`);
    }
  } else {
    console.log(
      "All requested tweets are already cached or have fallback data."
    );
  }

  // Return only the requested tweets in the correct order
  return tweetIds.map((id) => {
    const tweet = cachedTweetMap.get(id);
    if (tweet) return tweet;

    // Use fallback only if tweet exists in fallback data
    const fallbackTweet = fallbackTweetMap.get(id);
    if (fallbackTweet) {
      console.log(`Using fallback data for tweet ${id}`);
      return fallbackTweet;
    }

    console.log(`No data available for tweet ${id}`);
    return null;
  });
}
