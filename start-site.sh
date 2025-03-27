#!/bin/bash

echo "Starting Savant Chat website..."

# Run tweet preloading
echo "🔄 Running tweet preloading..."
npm run preload-tweets

# Check if the previous step was successful
if [ $? -ne 0 ]; then
  echo "❌ Error during tweet preloading. Aborting process."
  exit 1
fi

echo "✅ Tweet preloading completed successfully."

# Start the container
docker-compose up -d

echo ""
echo "Website is running at http://localhost:3000"
echo "To stop the website, run: ./stop-site.sh" 