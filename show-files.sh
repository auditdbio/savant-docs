#!/bin/bash

# Скрипт для вывода путей ко всем актуальным файлам в Docusaurus проекте
# Исключает временные файлы, папки сборки и зависимости

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода заголовка
print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Проверяем, что мы в Docusaurus проекте
if [[ ! -f "docusaurus.config.js" && ! -f "docusaurus.config.ts" ]]; then
    echo -e "${YELLOW}Предупреждение: docusaurus.config.js/ts не найден. Возможно, это не Docusaurus проект.${NC}"
    echo "Продолжаем поиск файлов..."
    echo
fi

echo -e "${GREEN}Поиск актуальных файлов в Docusaurus проекте...${NC}"
echo

# Массив для исключения директорий и файлов
EXCLUDE_PATTERNS=(
    -path "*/node_modules" -prune -o
    -path "*/.docusaurus" -prune -o
    -path "*/build" -prune -o
    -path "*/.git" -prune -o
    -path "*/.next" -prune -o
    -path "*/dist" -prune -o
    -path "*/.cache" -prune -o
    -path "*/coverage" -prune -o
    -path "*/.nyc_output" -prune -o
    -path "*/.vscode" -prune -o
    -path "*/.idea" -prune -o
    -name "*.log" -prune -o
    -name ".DS_Store" -prune -o
    -name "Thumbs.db" -prune -o
    -name "*.tmp" -prune -o
    -name "*.temp" -prune -o
)

# Функция для поиска файлов с исключениями
find_files() {
    find . "${EXCLUDE_PATTERNS[@]}" -type f -print | sort
}

# 1. Конфигурационные файлы
print_header "Конфигурационные файлы"
find_files | grep -E '\.(js|ts|json|yml|yaml)$' | grep -E '^\./(docusaurus\.config\.|sidebars\.|babel\.config\.|package\.json|\.gitignore|tsconfig\.|yarn\.lock|package-lock\.json)'

echo

# 2. Файлы документации и блогов
print_header "Файлы контента (документация и блоги)"
find_files | grep -E '\.(md|mdx)$'

echo

# 3. Исходный код (src/)
print_header "Исходный код"
find_files | grep -E '^\.\/src\/' | grep -E '\.(js|jsx|ts|tsx|css|scss|sass|less)$'

echo

# 4. Статические файлы
print_header "Статические файлы"
find_files | grep -E '^\.\/static\/'

echo

# 5. Файлы стилей (не в src/)
print_header "Стили (вне src/)"
find_files | grep -E '\.(css|scss|sass|less)$' | grep -v '^\.\/src\/'

echo

# 6. Файлы переводов (i18n)
print_header "Файлы локализации"
find_files | grep -E '^\.\/i18n\/'

echo

# 7. Все остальные актуальные файлы
print_header "Прочие актуальные файлы"
find_files | grep -vE '\.(md|mdx|js|jsx|ts|tsx|css|scss|sass|less|json|yml|yaml|log)$' | grep -vE '^\./(src|static|i18n|docs|blog|node_modules|\.docusaurus|build|\.git)/' | grep -vE '(docusaurus\.config\.|sidebars\.|babel\.config\.|package\.json|\.gitignore|tsconfig\.|yarn\.lock|package-lock\.json)'

echo
echo -e "${GREEN}Поиск завершен!${NC}"

# Опциональный подсчет файлов
echo
echo -e "${BLUE}Статистика:${NC}"
TOTAL_FILES=$(find_files | wc -l)
MD_FILES=$(find_files | grep -E '\.(md|mdx)$' | wc -l)
JS_FILES=$(find_files | grep -E '\.(js|jsx|ts|tsx)$' | wc -l)
CSS_FILES=$(find_files | grep -E '\.(css|scss|sass|less)$' | wc -l)

echo "Всего актуальных файлов: $TOTAL_FILES"
echo "Markdown файлов: $MD_FILES"
echo "JS/TS файлов: $JS_FILES"
echo "CSS файлов: $CSS_FILES"