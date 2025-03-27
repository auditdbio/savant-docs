import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { preloadTweets, getAllCachedTweets } from "../../utils/tweet-cache.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

/**
 * Docusaurus plugin for tweet integration
 */
export default function tweetPlugin(context, options) {
  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-tweets",

    async loadContent() {
      try {
        // Load tweet IDs from configuration
        const { tweetIds } = await import("../../config/tweets.mjs");
        console.log("[Tweet Plugin] Loading tweet IDs:", tweetIds);

        if (!Array.isArray(tweetIds)) {
          console.warn("[Tweet Plugin] tweetIds is not an array:", tweetIds);
          return [];
        }

        // Always preload tweets to cache
        console.log("[Tweet Plugin] Preloading tweets for build...");
        try {
          await preloadTweets(tweetIds);
        } catch (error) {
          console.warn("[Tweet Plugin] Error preloading tweets:", error);

          // Don't interrupt the build on preload errors,
          // if error skipping is enabled
          if (process.env.SKIP_TWEET_ERRORS !== "true") {
            throw error;
          }
        }

        return tweetIds;
      } catch (error) {
        console.warn("[Tweet Plugin] Error loading tweets:", error);
        return [];
      }
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;

      if (!Array.isArray(content)) {
        console.warn("[Tweet Plugin] Content is not an array:", content);
        content = [];
      }

      // Get all cached tweets
      const cachedTweets = getAllCachedTweets();

      // Check if all tweets are cached (always in strict mode)
      const uncachedTweets = content.filter((id) => !cachedTweets[id]);
      if (uncachedTweets.length > 0) {
        console.warn(
          `[Tweet Plugin] Warning: ${uncachedTweets.length} tweets are not cached.`
        );
        console.warn(
          `[Tweet Plugin] These tweets will not be displayed: ${uncachedTweets.join(
            ", "
          )}`
        );
        console.warn(
          `[Tweet Plugin] Run 'node scripts/preload-tweets.mjs' to preload these tweets before building.`
        );
      }

      // Set data for client use
      setGlobalData({
        tweetIds: content,
        cachedTweets: cachedTweets,
      });
    },

    // Additional configuration and client modules
    getClientModules() {
      return [];
    },
  };
}
