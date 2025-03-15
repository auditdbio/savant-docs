#!/bin/bash

echo "Starting Savant Chat website in development mode..."
docker-compose -f docker-compose.dev.yml up -d

echo ""
echo "Website is running in development mode at http://localhost:3000"
echo "Changes to files will automatically reload the site."
echo "To stop the development server, run: ./stop-dev.sh" 