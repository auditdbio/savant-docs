##############################################
# Stage 1: Build Next.js static export
##############################################
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build (prebuild preloads tweets + blog assets, then `next build`
# emits a static export to /app/out because next.config.mjs sets output: "export").
COPY . .
# Don't fail the build if the tweet API is unreachable during CI/build.
ENV SKIP_TWEET_ERRORS=true
RUN npm run build

##############################################
# Stage 2: Serve the static export
##############################################
FROM node:20-alpine AS serve

WORKDIR /app

# Simple static web server with clean-URL support
RUN npm install -g serve@14.2.4

# Copy only the static export from the build stage
COPY --from=build /app/out /app

EXPOSE 3000
CMD ["serve", ".", "-l", "3000"]
