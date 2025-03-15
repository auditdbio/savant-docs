#!/bin/bash

echo "Starting Savant Chat website..."
docker-compose up -d

echo ""
echo "Website is running at http://localhost:3000"
echo "To stop the website, run: ./stop-site.sh" 