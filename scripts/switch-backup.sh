#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker container is running
if ! docker ps | grep -q savant-docs; then
  echo -e "${RED}Error: savant-docs container is not running${NC}"
  echo "Start the container using command: docker-compose up -d"
  exit 1
fi

# Get list of backups in the local directory
echo -e "${BLUE}Available backups in local directory:${NC}"
LOCAL_BACKUPS=$(ls -1 .cache/backups/ | grep tweets.backup | sort -r)
echo -e "${YELLOW}0.${NC} Current cache (tweets.json)"
echo -e "${YELLOW}1.${NC} Standard backup (tweets.backup.json)"

COUNT=2
for backup in $LOCAL_BACKUPS; do
  timestamp=$(echo $backup | sed 's/tweets.backup.//g' | sed 's/.json//g')
  echo -e "${YELLOW}$COUNT.${NC} $backup ($timestamp)"
  COUNT=$((COUNT+1))
done

# Get user choice
echo 
echo -e "${BLUE}Enter backup number to restore (or 'q' to exit):${NC}"
read choice

# Check input
if [[ "$choice" == "q" ]]; then
  echo "Operation cancelled."
  exit 0
fi

if ! [[ "$choice" =~ ^[0-9]+$ ]]; then
  echo -e "${RED}Error: Enter a valid backup number${NC}"
  exit 1
fi

# Determine which file to restore
if [[ "$choice" -eq "0" ]]; then
  echo -e "${GREEN}No need to restore, using current cache${NC}"
  exit 0
elif [[ "$choice" -eq "1" ]]; then
  BACKUP_FILE=".cache/tweets.backup.json"
  echo -e "${GREEN}Restoring from standard backup${NC}"
else
  # Calculate index in the backup array
  INDEX=$((choice-2))
  # Get filename
  BACKUP_FILE_NAME=$(echo "$LOCAL_BACKUPS" | sed -n "$((INDEX+1))p")
  
  if [[ -z "$BACKUP_FILE_NAME" ]]; then
    echo -e "${RED}Error: Backup with specified number not found${NC}"
    exit 1
  fi
  
  BACKUP_FILE=".cache/backups/$BACKUP_FILE_NAME"
  echo -e "${GREEN}Restoring from backup: $BACKUP_FILE_NAME${NC}"
fi

# Copy selected backup to tweets.json
if [[ -f "$BACKUP_FILE" ]]; then
  # Create backup of current tweets.json
  cp .cache/tweets.json .cache/tweets.previous.json
  
  # Copy backup to tweets.json
  cp "$BACKUP_FILE" .cache/tweets.json
  
  echo -e "${GREEN}Copying backup to Docker container...${NC}"
  # Copy to container
  docker cp .cache/tweets.json savant-docs:/app/.cache/tweets.json
  
  echo -e "${GREEN}Backup successfully restored!${NC}"
  
  # Ask if user wants to update the site without rebuilding
  echo 
  echo -e "${BLUE}Do you want to update the site without rebuilding? [y/N]:${NC}"
  read update_choice
  
  if [[ "$update_choice" == "y" || "$update_choice" == "Y" ]]; then
    echo -e "${YELLOW}Updating the site in the container...${NC}"
    
    # Create temporary script to execute in the container
    cat > /tmp/refresh_script.sh << 'EOF'
#!/bin/sh
# Script to update static site without rebuilding
# Create new index.html with updated data
echo "Updating the site with new data from cache..."

# Create marker for site reload
mkdir -p /tmp/refresh
touch /tmp/refresh/trigger_reload

# Small delay to apply changes
sleep 2

# Optional: server restart in container
echo "Update process completed!"
EOF
    
    # Copy script to container
    docker cp /tmp/refresh_script.sh savant-docs:/tmp/refresh_script.sh
    
    # Make script executable and run in container
    docker exec savant-docs chmod +x /tmp/refresh_script.sh
    docker exec savant-docs /tmp/refresh_script.sh
    
    # Restart container to ensure changes are applied
    echo -e "${YELLOW}Restarting container to apply changes...${NC}"
    docker restart savant-docs
    
    echo -e "${GREEN}Site successfully updated with new data from cache!${NC}"
  else
    echo -e "${YELLOW}Note:${NC} To apply changes on the site, you may need to restart the container:"
    echo "docker-compose restart"
  fi
else
  echo -e "${RED}Error: Backup file not found: $BACKUP_FILE${NC}"
  exit 1
fi 