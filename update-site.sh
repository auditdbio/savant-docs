#!/bin/bash

# Display information about the script execution
echo "🔄 Starting container update process without stopping the service..."

# Run tweet preloading
echo "🔄 Running tweet preloading..."
npm run preload-tweets

# Check if the previous step was successful
if [ $? -ne 0 ]; then
  echo "❌ Error during tweet preloading. Aborting process."
  exit 1
fi

echo "✅ Tweet preloading completed successfully."

# Save the current image version for recovery in case of error
echo "📸 Creating backup of the current image..."
CONTAINER_ID=$(docker-compose ps -q savant-site)
CURRENT_IMAGE=$(docker inspect --format='{{.Image}}' $CONTAINER_ID)
TAG_DATE=$(date +"%Y%m%d%H%M%S")
docker tag $CURRENT_IMAGE savant-docs-backup:$TAG_DATE

echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "❌ Error building Docker image. Aborting process."
  exit 1
fi

# Check if the container is currently running
CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER_ID 2>/dev/null)

if [ "$CONTAINER_STATUS" = "running" ]; then
  # Use docker-compose up with flags to update without stopping
  echo "🚀 Updating running container..."
  docker-compose up -d --no-deps --build
  
  # Check if the update was successful
  if [ $? -ne 0 ]; then
    echo "❌ Error updating container. Restoring previous version..."
    docker tag savant-docs-backup:$TAG_DATE savant-site:latest
    docker-compose up -d
    exit 1
  fi
  
  # Wait a moment and check if the container is running
  echo "⏳ Checking if container started successfully..."
  sleep 5
  NEW_CONTAINER_ID=$(docker-compose ps -q savant-site)
  NEW_CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' $NEW_CONTAINER_ID 2>/dev/null)
  
  if [ "$NEW_CONTAINER_STATUS" != "running" ]; then
    echo "❌ Container failed to start after update. Restoring previous version..."
    docker tag savant-docs-backup:$TAG_DATE savant-site:latest
    docker-compose up -d
    exit 1
  fi
else
  # If the container is not running, just start it
  echo "🚀 Container is not running, starting new version..."
  docker-compose up -d
  
  # Check if the start was successful
  if [ $? -ne 0 ]; then
    echo "❌ Error starting container."
    exit 1
  fi
fi

echo ""
echo "✅ Container successfully updated and running."
echo "   Website is available at http://localhost:3000"

# We can remove the backup if everything is successful
docker rmi savant-docs-backup:$TAG_DATE &>/dev/null 