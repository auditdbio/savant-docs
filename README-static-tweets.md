## Launch Logic for Static Tweets

The Savant Documentation site uses a sophisticated system for preloading, caching, and rendering Twitter content. This approach provides several advantages:

- **API Rate Limit Protection**: By preloading tweets, the site avoids hitting Twitter's API rate limits during user visits
- **Resilience**: The site continues to display tweets even when Twitter's API is unavailable
- **Performance**: Cached tweets load instantly without API latency
- **Zero-Downtime Updates**: The container update system ensures continuous service

### Launch Process Flow

The static tweets system follows a structured launch process:

1. **Configuration Phase**

   - Tweet IDs are defined in `src/config/tweets.mjs` as a simple array
   - Environment variables control behavior (proxy usage, error handling, etc.)

2. **Preloading Phase**

   - The `preload-tweets.mjs` script is executed
   - Script reads configuration and existing cache
   - Each tweet is either fetched from API or loaded from cache
   - All tweets are saved to `.cache/tweets.json`
   - Backup copies are created in `.cache/backups/`

3. **Container Management Phase**

   - Docker containers are built with the cached tweets
   - Volume mapping ensures cache persistence between updates
   - Health checks verify successful container startup

4. **Fallback Mechanisms**
   - If a tweet can't be loaded, the system tries multiple recovery paths:
     - Attempt to load from cache
     - Try to restore from backup files
     - Generate mock data if configured
     - Skip the problematic tweet (configurable)

### Script Execution Flow

The system provides several launch scripts with different purposes:

#### `start-site.sh`

- Complete startup process
- Preloads tweets
- Builds Docker image
- Starts container
- Makes site available at http://localhost:3000

#### `update-site.sh`

- Zero-downtime update mechanism
- Preloads tweets with npm run preload-tweets
- Creates a backup of the current container image
- Builds a new Docker image
- Updates the running container without stopping service
- Verifies successful startup
- Automatically rolls back to previous version on failure

#### `stop-site.sh`

- Stops the running website container

### Technical Implementation

The system uses Docker volume mapping to ensure tweet cache persistence between container updates. This means:

1. The `.cache` directory is mounted as a volume in the Docker container
2. Tweet data remains available even when containers are replaced
3. Updates can occur without requiring a full re-fetch of all tweets

The update process specifically creates a tagged backup of the running container before attempting updates, enabling automatic rollback if the new container fails to start properly.

For more detailed information, please see [README-static-tweets.md](./README-static-tweets.md).
