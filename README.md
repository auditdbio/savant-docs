# Savant Chat - Smart Contract Security

Documentation and static website for Savant Chat. The site is built using [Docusaurus](https://docusaurus.io/).

## Development

### Local Setup

```bash
npm install
npm start
```

The site will be available at: http://localhost:3000

### Build

```bash
npm run build
```

The built site will be located in the `build/` directory.

## Docker

### Building Docker Image

```bash
docker build -t savant-docs .
```

### Running Docker Container

```bash
docker run -p 3000:3000 savant-docs
```

The site will be available at: http://localhost:3000

## Docker Compose

For easier development and testing, you can use Docker Compose:

```bash
docker-compose up -d
```

The site will be available at: http://localhost:3000

### Stopping

```bash
docker-compose down
```

## CI/CD (auto deploy from `main`)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-main.yml`.

On every push/merge to `main`, it deploys **only** the docs service on production:

```bash
/root/savant/deploy/deploy-docs.sh
```

The server script runs:

```bash
cd /root/savant/deploy
docker compose -p app up -d --no-deps --build docs
```

So it does not restart other services in the main `savant` stack.

### Required GitHub secrets

Set these repository secrets before enabling the workflow:

- `DOCS_DEPLOY_HOST` (example: `your.server.ip`)
- `DOCS_DEPLOY_USER` (example: `root`)
- `DOCS_DEPLOY_SSH_KEY` (private SSH key with access to the server)

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
# savant-docs
