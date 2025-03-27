#!/usr/bin/env node

/**
 * Script for managing tweet cache:
 * - Creates timestamped backups of the cache
 * - Restores cache from backups
 * - Manages backup rotation
 * - Checks for changes in tweets
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  preloadTweets,
  loadTweetCache,
  saveTweetCache,
} from "../src/utils/tweet-cache.mjs";

// Get cache directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_DIR = path.join(__dirname, "../.cache");
const CACHE_FILE = path.join(CACHE_DIR, "tweets.json");
const BACKUP_FILE = path.join(CACHE_DIR, "tweets.backup.json");
const BACKUP_DIR = path.join(CACHE_DIR, "backups");

// Maximum number of backups to keep
const MAX_BACKUPS = 5;

/**
 * Creates a new timestamped backup
 */
function createTimestampedBackup() {
  // Check if cache exists
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(`❌ Cache file not found: ${CACHE_FILE}`);
    return false;
  }

  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
  }

  try {
    // Create standard backup
    fs.copyFileSync(CACHE_FILE, BACKUP_FILE);
    console.log(`✅ Created standard backup: ${BACKUP_FILE}`);

    // Create dated backup
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/g, "");
    const backupPath = path.join(BACKUP_DIR, `tweets.backup.${timestamp}.json`);
    fs.copyFileSync(CACHE_FILE, backupPath);
    console.log(`✅ Created dated backup: ${backupPath}`);

    // Rotate backups
    rotateBackups();

    return true;
  } catch (error) {
    console.error(`❌ Error creating backup:`, error);
    return false;
  }
}

/**
 * Removes old backups, keeping only the most recent ones
 */
function rotateBackups() {
  try {
    // Check if backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      return false;
    }

    // Get list of backups
    const backups = fs
      .readdirSync(BACKUP_DIR)
      .filter(
        (file) => file.startsWith("tweets.backup.") && file.endsWith(".json")
      )
      .map((file) => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time); // Sort by creation time (newest first)

    // Delete old backups
    if (backups.length > MAX_BACKUPS) {
      console.log(`🔄 Found ${backups.length} backups, removing old ones...`);
      backups.slice(MAX_BACKUPS).forEach((backup) => {
        fs.unlinkSync(backup.path);
        console.log(`🗑️ Removed old backup: ${backup.name}`);
      });
    }

    return true;
  } catch (error) {
    console.error(`❌ Error rotating backups:`, error);
    return false;
  }
}

/**
 * Restores cache from the latest available backup
 */
function restoreFromBackup() {
  try {
    console.log(`🔍 Looking for backups to restore...`);

    // Check if standard backup exists
    if (fs.existsSync(BACKUP_FILE)) {
      fs.copyFileSync(BACKUP_FILE, CACHE_FILE);
      console.log(`✅ Cache restored from standard backup: ${BACKUP_FILE}`);
      return true;
    }

    // If no standard backup, look in the backup directory
    if (fs.existsSync(BACKUP_DIR)) {
      const backups = fs
        .readdirSync(BACKUP_DIR)
        .filter(
          (file) => file.startsWith("tweets.backup.") && file.endsWith(".json")
        )
        .map((file) => ({
          name: file,
          path: path.join(BACKUP_DIR, file),
          time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime(),
        }))
        .sort((a, b) => b.time - a.time); // Sort by creation time (newest first)

      if (backups.length > 0) {
        fs.copyFileSync(backups[0].path, CACHE_FILE);
        console.log(`✅ Cache restored from dated backup: ${backups[0].name}`);
        return true;
      }
    }

    console.log(`⚠️ No backups found`);
    return false;
  } catch (error) {
    console.error(`❌ Error restoring from backup:`, error);
    return false;
  }
}

/**
 * Compares new tweet data with cached data and updates cache if changes are detected
 * @param {string} tweetId Tweet ID
 * @param {Object} newData New tweet data
 * @param {Object} cachedData Cached tweet data
 * @returns {boolean} true if changes were detected, false if not
 */
function detectTweetChanges(tweetId, newData, cachedData) {
  // If no cached data or no new data, this is a change
  if (!cachedData || !newData) return true;

  // Check for deleted tweet
  if (newData._deleted && !cachedData._deleted) {
    console.log(`⚠️ Tweet ${tweetId} was deleted, updating cache`);
    return true;
  }

  // Check for text changes (for edited tweets)
  if (newData.text !== cachedData.text) {
    console.log(`⚠️ Text of tweet ${tweetId} changed, updating cache`);
    return true;
  }

  // Check metrics (likes, retweets, etc.)
  const metricsChanged =
    newData.favorite_count !== cachedData.favorite_count ||
    newData.retweet_count !== cachedData.retweet_count;

  if (metricsChanged) {
    console.log(`📊 Metrics of tweet ${tweetId} changed, updating cache`);
    return true;
  }

  return false;
}

/**
 * Main function - checks and updates cache, creates backups
 */
async function main() {
  try {
    // Make sure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // Load tweet IDs from configuration
    const { tweetIds } = await import("../src/config/tweets.mjs");

    // Check if cache exists
    const cacheExists = fs.existsSync(CACHE_FILE);

    if (!cacheExists) {
      console.log(`⚠️ Cache not found, trying to restore from backup...`);
      const restored = restoreFromBackup();

      if (!restored) {
        console.log(`🔄 Creating new cache...`);
      }
    }

    // In any case, update cache
    console.log(`🔄 Loading and updating tweet data...`);
    const result = await preloadTweets(tweetIds, false); // Don't force update

    if (result.success) {
      console.log(`✅ Cache successfully updated`);
      // Don't create backups here, this will be handled by preload-tweets.mjs
    } else if (result.errorCount > 0) {
      console.log(
        `⚠️ Errors occurred while loading some tweets, but data restored from cache/backups`
      );
    }

    console.log(`✅ Cache management completed successfully`);
  } catch (error) {
    console.error(`❌ Error working with cache:`, error);
    process.exit(1);
  }
}

// Run script if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(`🚀 Running cache management...`);
  main();
}

// Export functions for use in other scripts
export {
  createTimestampedBackup,
  rotateBackups,
  restoreFromBackup,
  detectTweetChanges,
};
