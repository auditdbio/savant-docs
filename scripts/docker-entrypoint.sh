#!/bin/sh

# Инициализация кеша твитов
echo "Initializing tweet cache..."
node /app/scripts/init-cache.mjs

# Запуск веб-сервера
echo "Starting web server..."
exec serve -s /app -l 3000 