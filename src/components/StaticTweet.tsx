import React, { Suspense } from "react";
import { Tweet, TweetSkeleton, EmbeddedTweet } from "react-tweet";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";

interface StaticTweetProps {
  tweetId: string;
  isQuoted?: boolean;
}

interface GlobalData {
  "docusaurus-plugin-tweets"?: {
    default: {
      tweetIds: string[];
      cachedTweets: Record<string, any>;
    };
  };
}

/**
 * Check if tweet data has all required fields for proper display
 */
function isValidTweetData(tweet: any): boolean {
  if (!tweet) return false;

  // Check for basic required fields
  if (!tweet.id && !tweet.id_str) return false;

  // Tweet must have either text content or full_text
  if (!tweet.text && !tweet.full_text) return false;

  // Tweet must have user information
  if (!tweet.user) return false;

  // User must have screen_name
  if (!tweet.user.screen_name) return false;

  return true;
}

/**
 * Safe wrapper for EmbeddedTweet that handles errors
 */
function SafeEmbeddedTweet({ tweet }: { tweet: any }) {
  try {
    return <EmbeddedTweet tweet={tweet} />;
  } catch (error) {
    console.error(`Error rendering EmbeddedTweet:`, error);
    return null;
  }
}

/**
 * Component for displaying a tweet using cached data or react-tweet API
 */
function TweetWithCache({ tweetId }: { tweetId: string }) {
  const { siteConfig } = useDocusaurusContext();
  const globalData = useGlobalData() as GlobalData;

  // Get settings from siteConfig
  const useLocalCache = siteConfig.customFields?.useLocalTweetCache as boolean;
  // Always use strict mode - only show tweets from cache
  const strictMode = true;

  // Get cached tweet data
  const cachedTweets =
    globalData["docusaurus-plugin-tweets"]?.default?.cachedTweets || {};
  const cachedTweet = cachedTweets[tweetId];

  // In strict mode:
  // 1. If tweet is in cache, show it from cache
  // 2. If tweet is not in cache, don't show anything
  if (!cachedTweet) {
    return null; // No tweet in cache, don't display
  }

  // Check if the cached tweet has all required data
  if (!isValidTweetData(cachedTweet)) {
    console.warn(`Tweet ${tweetId} has invalid data structure in cache`);
    return null;
  }

  // Tweet is in cache, display it
  const isMock = Boolean(cachedTweet._isMock);
  const isBackup = Boolean(cachedTweet._isBackup);

  const cssClasses = [
    "tweet-content",
    isMock ? "mock-tweet" : "",
    isBackup ? "backup-tweet" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cssClasses}>
      {isBackup && (
        <div className="text-xs bg-yellow-50 text-yellow-600 p-1 text-center rounded-t-md">
          This tweet was loaded from a backup cache
        </div>
      )}
      <SafeEmbeddedTweet tweet={cachedTweet} />
    </div>
  );
}

export default function StaticTweet({
  tweetId,
  isQuoted = false,
}: StaticTweetProps) {
  const { siteConfig } = useDocusaurusContext();
  const globalData = useGlobalData() as GlobalData;

  // Always use strict mode - only show tweets from cache
  const strictMode = true;

  // Get cached tweet data for pre-checking
  const cachedTweets =
    globalData["docusaurus-plugin-tweets"]?.default?.cachedTweets || {};
  const cachedTweet = cachedTweets[tweetId];

  // If there's no cached tweet or it's invalid, don't render anything
  if (!cachedTweet || !isValidTweetData(cachedTweet)) {
    return null;
  }

  return (
    <div
      className={`tweet-container ${
        isQuoted ? "border rounded-lg p-2 md:p-4 mt-2 md:mt-4 bg-gray-50" : ""
      }`}
    >
      <Suspense fallback={<TweetSkeleton />}>
        <div className="tweet-wrapper bg-white rounded-2xl border border-gray-100 hover:border-gray-200 overflow-hidden tweet-centered">
          <TweetWithCache tweetId={tweetId} />
        </div>
      </Suspense>
    </div>
  );
}
