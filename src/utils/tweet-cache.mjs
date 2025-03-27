import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to cache file
const CACHE_DIR = path.join(__dirname, "../../.cache");
const CACHE_FILE = path.join(CACHE_DIR, "tweets.json");
// Path to last successful cache backup file
const BACKUP_CACHE_FILE = path.join(CACHE_DIR, "tweets.backup.json");

// Cache TTL in milliseconds (7 days)
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

/**
 * Loads tweet data using Twitter API
 * @param {string} tweetId Tweet ID to load
 * @returns {Promise<Object>} Tweet data
 */
export async function fetchTweetData(tweetId) {
  // Check if this tweet is marked as problematic (for testing)
  const failedTweetId = process.env.FAILED_TWEET_ID;
  if (failedTweetId && tweetId === failedTweetId) {
    console.error(
      `Tweet ${tweetId} is marked as problematic (FAILED_TWEET_ID), generating error`
    );
    throw new Error(`Simulated loading error for tweet ${tweetId}`);
  }

  // If forced mock data generation mode is enabled
  if (process.env.FORCE_MOCK_TWEETS === "true") {
    console.log(
      `Generating mock data for tweet ${tweetId} (FORCE_MOCK_TWEETS=true)`
    );
    return generateMockTweetData(tweetId);
  }

  try {
    // Use react-tweet API
    const url = `https://react-tweet.vercel.app/api/tweet/${tweetId}`;

    // Execute request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "DocusaurusTweetLoader/1.0",
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Error details not available";
      }

      throw new Error(
        `Error loading tweet: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();

    // Extract tweet data from response
    let tweetData;

    // Check response structure
    if (responseData.data) {
      // If data is in the data field
      tweetData = responseData.data;
    } else if (responseData.id_str || responseData.id) {
      // If this is direct tweet data
      tweetData = responseData;
    } else {
      throw new Error(`Unexpected tweet data format`);
    }

    // Check for required fields for display
    if (!tweetData.user && responseData.user) {
      tweetData.user = responseData.user;
    }

    if (tweetData.user && !tweetData.user.screen_name && responseData.author) {
      tweetData.user.screen_name = responseData.author.username || "unknown";
    }

    return tweetData;
  } catch (error) {
    console.error(`Error while loading tweet ${tweetId}:`, error);

    // Check if we should use mock data
    if (process.env.FORCE_MOCK_TWEETS === "true") {
      console.log(`Using mock data for ${tweetId}`);
      return generateMockTweetData(tweetId);
    }

    throw error;
  }
}

/**
 * Generates mock tweet data for development
 * @param {string} tweetId Tweet ID
 * @returns {Object} Mock tweet data
 */
function generateMockTweetData(tweetId) {
  return {
    id: tweetId,
    text: `This is a mock tweet with ID ${tweetId} for development and testing.`,
    author: {
      name: "Mock User",
      username: "mockuser",
      profile_image_url:
        "https://robohash.org/mockuser.png?size=48x48&set=set1",
    },
    created_at: new Date().toISOString(),
    metrics: {
      retweet_count: Math.floor(Math.random() * 50) + 5,
      reply_count: Math.floor(Math.random() * 20) + 1,
      like_count: Math.floor(Math.random() * 100) + 20,
      quote_count: Math.floor(Math.random() * 10),
    },
    _isMock: true,
  };
}

/**
 * Creates cache directory
 */
function ensureCacheDirectory() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Creates a backup of working cache
 * @param {Object} cache Cache to save as backup
 */
function createCacheBackup(cache) {
  try {
    // Ensure cache directory exists
    ensureCacheDirectory();

    // Check if cache file exists
    if (fs.existsSync(CACHE_FILE)) {
      // Copy current cache to backup file
      fs.copyFileSync(CACHE_FILE, BACKUP_CACHE_FILE);
      console.log("Tweet cache backup created");
    }
  } catch (error) {
    console.error("Error creating cache backup:", error);
  }
}

/**
 * Loads tweet cache backup
 * @returns {Object|null} Tweet cache from backup or null
 */
function loadCacheBackup() {
  try {
    // Try to load from backup file
    if (fs.existsSync(BACKUP_CACHE_FILE)) {
      console.log(`Loading tweet cache from backup`);
      const backupData = fs.readFileSync(BACKUP_CACHE_FILE, "utf-8");
      const backupCache = JSON.parse(backupData);

      if (
        backupCache &&
        backupCache.tweets &&
        Object.keys(backupCache.tweets).length > 0
      ) {
        return backupCache;
      }
    }
    return null;
  } catch (error) {
    console.error("Error loading cache backup:", error);
    return null;
  }
}

/**
 * Loads tweet cache from file
 * @returns {Object} Tweet cache
 */
export function loadTweetCache() {
  ensureCacheDirectory();

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(cacheData);
    }
  } catch (error) {
    console.warn("Error loading tweet cache:", error);
  }

  // If main cache is unavailable, try to load backup
  const backupCache = loadCacheBackup();
  if (backupCache) {
    console.log("Using backup cache instead of main cache");
    return backupCache;
  }

  return { tweets: {}, timestamp: Date.now() };
}

/**
 * Saves tweet cache to file
 * @param {Object} cache Tweet cache to save
 * @param {boolean} createBackup Also create a backup of successful cache
 */
export function saveTweetCache(cache, createBackup = false) {
  ensureCacheDirectory();

  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log("Tweet cache successfully saved");

    // If cache was successfully saved and backup is needed
    if (createBackup) {
      createCacheBackup(cache);
    }
  } catch (error) {
    console.error("Error saving tweet cache:", error);
  }
}

/**
 * Checks if cache is stale
 * @param {Object} cache Cache to check
 * @returns {boolean} true if cache is stale
 */
function isCacheStale(cache) {
  const now = Date.now();
  return now - cache.timestamp > CACHE_TTL;
}

/**
 * Load cache from file
 * @returns {Promise<Object>} Tweet cache
 */
async function loadCache() {
  // Ensure cache directory exists before any operations
  ensureCacheDirectory();

  try {
    // Check if cache file exists
    if (fs.existsSync(CACHE_FILE)) {
      console.log(`Loading tweets from cache`);
      const data = fs.readFileSync(CACHE_FILE, "utf8");
      return JSON.parse(data);
    }

    console.log(`Cache file not found, creating new empty cache`);
    // Create empty cache
    const emptyCache = { tweets: {}, timestamp: Date.now() };

    // If forced mock data generation mode is enabled
    if (process.env.FORCE_MOCK_TWEETS === "true") {
      try {
        const mockTweets = await generateMockTweets();
        emptyCache.tweets = mockTweets;
      } catch (err) {
        console.error("Error generating mock data:", err);
      }
    }

    return emptyCache;
  } catch (error) {
    console.error("Error loading cache:", error);
    return { tweets: {}, timestamp: Date.now() };
  }
}

/**
 * Save cache to file
 * @param {Object} cache Tweet cache to save
 */
function saveCache(cache) {
  // Ensure cache directory exists before any operations
  ensureCacheDirectory();

  try {
    // Create backup before updating
    createCacheBackup(cache);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error("Error saving cache:", error);
  }
}

/**
 * Compares tweet data to detect changes
 * @param {Object} oldData Old tweet data from cache
 * @param {Object} newData New tweet data from API
 * @returns {boolean} true if tweet data changed significantly
 */
function detectTweetChanges(oldData, newData) {
  if (!oldData || !newData) return true;

  // Check for deleted tweets
  if (newData._deleted && !oldData._deleted) {
    console.log(`Tweet was deleted, updating cache`);
    return true;
  }

  // Check content changes
  if (newData.text !== oldData.text) {
    console.log(`Tweet text changed, updating cache`);
    return true;
  }

  // If this is mock data and we have real data now
  if (oldData._isMock && !newData._isMock) {
    console.log(`Replacing mock data with real data`);
    return true;
  }

  // If this is backup data and we have fresh data now
  if (oldData._isBackup && !newData._isBackup) {
    console.log(`Replacing backup data with fresh data`);
    return true;
  }

  return false;
}

/**
 * Preload tweets for specified ID list
 * @param {string[]} tweetIds Array of tweet IDs to load
 * @param {boolean} forceUpdate Force update cache even if it's fresh
 * @returns {Promise<{
 *   success: boolean,
 *   loadedCount: number,
 *   errorCount: number,
 *   cacheUsed: number,
 *   backupUsed: number,
 *   mockUsed: number
 * }>} Loading results
 */
export async function preloadTweets(tweetIds, forceUpdate = false) {
  console.log("Preloading tweets...");

  // Ensure cache directory exists first
  ensureCacheDirectory();

  // Try to load cache from file
  let cache = await loadCache();
  const cacheAge = Date.now() - cache.timestamp;
  const maxAge = process.env.TWEET_CACHE_MAX_AGE
    ? parseInt(process.env.TWEET_CACHE_MAX_AGE)
    : 24 * 60 * 60 * 1000; // Default 24 hours

  // Also load backup cache if it exists - we'll use it for fallback
  const backupCache = loadCacheBackup();

  // Check cache freshness
  const isFreshCache = !forceUpdate && cacheAge < maxAge;
  if (!isFreshCache) {
    console.log(`Cache is stale or force update requested, updating tweets...`);
  }

  let loadedCount = 0;
  let errorCount = 0;
  let cacheUsed = 0;
  let backupUsed = 0;
  let mockUsed = 0;
  let updatedCache = false;
  let allTweetsLoaded = true;

  for (const tweetId of tweetIds) {
    // If tweet is in cache and cache is fresh, skip loading
    if (isFreshCache && cache.tweets[tweetId]) {
      loadedCount++;
      cacheUsed++;
      continue;
    }

    try {
      // Save old data for comparison (if exists)
      const oldData = cache.tweets[tweetId];

      // Load tweet via API
      const tweetData = await fetchTweetData(tweetId);

      // Check if data has changed
      const hasChanged = detectTweetChanges(oldData, tweetData);

      if (hasChanged || !oldData) {
        cache.tweets[tweetId] = tweetData;
        updatedCache = true;
        console.log(
          `Tweet ${tweetId} successfully loaded and cached (${
            hasChanged ? "updated" : "new"
          })`
        );
      } else {
        console.log(
          `Tweet ${tweetId} loaded but no significant changes detected`
        );
        cacheUsed++;
      }

      loadedCount++;

      // Delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to load tweet ${tweetId}:`, error);
      errorCount++;
      allTweetsLoaded = false;

      // If error skipping mode is enabled, try to recover from cache or backup
      if (process.env.SKIP_TWEET_ERRORS === "true") {
        console.log(`Skipping tweet ${tweetId} due to error`);
        let recovered = false;

        // Check if this tweet is already in cache
        if (cache.tweets[tweetId]) {
          console.log(`Using existing cache data for tweet ${tweetId}`);
          loadedCount++;
          errorCount--; // Don't count as error since we're using cache
          cacheUsed++;
          recovered = true;
        }
        // Try to find tweet in backup cache
        else if (
          backupCache &&
          backupCache.tweets &&
          backupCache.tweets[tweetId]
        ) {
          console.log(`Using backup cache data for tweet ${tweetId}`);
          // Copy data from backup and add a marker that this is backup data
          const backupTweetData = {
            ...backupCache.tweets[tweetId],
            _isBackup: true,
          };
          cache.tweets[tweetId] = backupTweetData;
          updatedCache = true;
          loadedCount++;
          errorCount--; // Don't count as error since we're using backup
          backupUsed++;
          recovered = true;
        }

        // If we can't recover, use mock data if enabled
        if (!recovered && process.env.FORCE_MOCK_TWEETS === "true") {
          console.log(`Creating mock data for tweet ${tweetId}`);
          cache.tweets[tweetId] = generateMockTweetData(tweetId);
          updatedCache = true;
          errorCount--; // Decrease error counter as we recovered
          loadedCount++;
          mockUsed++;
          recovered = true;
        }

        // Continue to next tweet
        if (recovered) continue;
      }

      // If we're here, we couldn't recover the tweet and errors can't be skipped
      if (process.env.SKIP_TWEET_ERRORS !== "true") {
        throw error;
      }
    }
  }

  // Update cache timestamp if there were changes
  if (updatedCache) {
    cache.timestamp = Date.now();
    // Create backup only if all tweets were successfully loaded
    saveTweetCache(cache, allTweetsLoaded);
  }

  console.log(
    `Preloading complete. Success: ${loadedCount}, Errors: ${errorCount}, From Cache: ${cacheUsed}, From Backup: ${backupUsed}, From Mock: ${mockUsed}`
  );

  return {
    success: errorCount === 0,
    loadedCount,
    errorCount,
    cacheUsed,
    backupUsed,
    mockUsed,
  };
}

/**
 * Gets tweet data from cache
 * @param {string} tweetId Tweet ID
 * @returns {Object|null} Tweet data or null if not found
 */
export function getCachedTweet(tweetId) {
  const cache = loadTweetCache();
  return cache.tweets[tweetId] || null;
}

/**
 * Gets all cached tweets
 * @returns {Object} Object with tweet data
 */
export function getAllCachedTweets() {
  const cache = loadTweetCache();
  return cache.tweets;
}

// Generate mock data for tweets from configuration
async function generateMockTweets() {
  try {
    // Import tweet ID list from configuration
    const { tweetIds } = await import("../config/tweets.mjs");

    const mockTweets = {};
    for (const tweetId of tweetIds) {
      mockTweets[tweetId] = generateMockTweetData(tweetId);
    }

    return mockTweets;
  } catch (error) {
    console.error("Error generating mock data for tweets:", error);
    return {};
  }
}
