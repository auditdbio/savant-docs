##############################################
# Stage 1: Build Docusaurus static files
##############################################
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files (the lockfile references local file: tarballs
# for the dev-only uilint packages, so they must exist before npm ci)
COPY package.json package-lock.json ./
COPY .uilint-packages ./.uilint-packages

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build static files
RUN npm run build

##############################################
# Stage 2: Serve static files with web server
##############################################
FROM node:20-alpine AS serve

WORKDIR /app

# Install serve - a simple static web server
RUN npm install -g serve@14.2.1

# Copy only built static files from previous stage
COPY --from=build /app/build /app

# Expose port 3000
EXPOSE 3000

# Serve static files with per-route HTML support
CMD ["serve", ".", "-l", "3000"]
