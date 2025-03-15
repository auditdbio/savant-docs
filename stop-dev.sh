#!/bin/bash

echo "Stopping Savant Chat development server..."
docker-compose -f docker-compose.dev.yml down

echo ""
echo "Development server has been stopped." 