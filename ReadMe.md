# Hello AI Coding Agent

A minimal scaffold for experimenting with AI-assisted coding agents.

## Setup

```bash
npm install
```

## Usage

```bash
npm start
```

## Running Tests

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`

## Web / PWA Mode

> **Prerequisite**: This section documents features delivered by the
> `feature/progressive-web-app` branch (issues #33-#37). The commands below
> are not available on `main` until that branch is merged.

Start the local development server:

```bash
npm run serve
```

Open your browser at: `http://localhost:3000`

**HTTPS requirement**: Service workers require a secure origin (`https://`).
`localhost` is exempt and works without TLS for local development.
Production deployments must be served over `https://`.

**Offline capability**: The service worker uses a cache-first strategy. Once
the app shell is cached, it loads without a network connection.

**Port configuration**: The default port is `3000`. Override with the `PORT`
environment variable:

```bash
PORT=8080 npm run serve
```

See `.env.example` for all configurable environment variables.

**Known gap**: `npm run lint` runs `node --check src/index.js` only.
JavaScript files under `public/` are **not** covered by the linter.
