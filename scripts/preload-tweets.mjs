#!/usr/bin/env node

// Correct import for named export
import { preloadTweets } from "../src/utils/tweet-cache.mjs";
import {
  createTimestampedBackup,
  restoreFromBackup,
} from "./cache-manager.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Get cache directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_DIR = path.join(__dirname, "../.cache");
const CACHE_FILE = path.join(CACHE_DIR, "tweets.json");

/**
 * This script loads all tweets into the cache before building the site
 */
async function main() {
  console.log("🚀 Preloading tweets for build...");
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

  // Display current settings
  console.log(`Configuration:
- USE_PROXY: ${process.env.USE_PROXY}
- PROXY_URL: ${process.env.PROXY_URL ? "✓ (set)" : "✗ (not set)"}
- FORCE_MOCK_TWEETS: ${process.env.FORCE_MOCK_TWEETS}
- SKIP_TWEET_ERRORS: ${process.env.SKIP_TWEET_ERRORS}
- STRICT_TWEET_LOADING: ${process.env.STRICT_TWEET_LOADING}
`);

  try {
    // Check if cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      console.log(`📁 Created cache directory: ${CACHE_DIR}`);
    }

    const { tweetIds } = await import("../src/config/tweets.mjs");

    if (!Array.isArray(tweetIds) || tweetIds.length === 0) {
      console.warn("⚠️ No tweet IDs found in config!");
      process.exit(0);
    }

    console.log(`📋 Found ${tweetIds.length} tweets to load`);

    // Check for cache existence before loading
    const cacheExists = fs.existsSync(CACHE_FILE);
    let forceReload = false;

    // If cache is missing, try to restore from backup
    if (!cacheExists) {
      console.log(`⚠️ Cache is missing, attempting to restore from backup...`);
      const restored = restoreFromBackup();

      if (!restored) {
        console.log(`⚠️ Backup not found, forcing reload of all tweets...`);
        forceReload = true;
      } else {
        console.log(`✅ Cache restored from backup, updating data...`);
      }
    }

    // Load tweets into cache
    const result = await preloadTweets(tweetIds, forceReload);

    if (result.success) {
      console.log(`✅ Tweets loaded: ${result.loadedCount}/${tweetIds.length}`);

      // Create backup of successfully loaded cache
      if (result.loadedCount > 0) {
        console.log(`📦 Creating backup of the cache...`);
        createTimestampedBackup();
      }
    } else {
      console.warn(
        `⚠️ Some tweets failed to load (${result.errorCount}/${tweetIds.length})`
      );

      if (result.cacheUsed) {
        console.log(`ℹ️ Used cached data for ${result.cacheUsed} tweets`);
      }

      if (result.backupUsed) {
        console.log(`ℹ️ Used backup data for ${result.backupUsed} tweets`);
      }

      if (result.mockUsed) {
        console.log(`ℹ️ Generated mock data for ${result.mockUsed} tweets`);
      }
    }

    console.log("✅ Tweet cache processing completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error processing tweets:", error);

    // In case of critical error, try to restore from backup
    console.log(`🔄 Attempting to recover from backup...`);
    const restored = restoreFromBackup();

    if (restored) {
      console.log(`✅ Successfully recovered from backup`);
      process.exit(0);
    } else {
      console.error(`❌ Could not recover from backup`);
      process.exit(1);
    }
  }
}

main();
