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

> **Prerequisites**: This section documents features on the `feature/progressive-web-app` branch.
> Until that branch is merged, `npm run serve`, `.env.example`, and the `public/` directory
> do not exist on `main`. Do not follow these instructions on `main`.

## Web / PWA Mode

Start the local development server:

```bash
npm run serve
```

The app is served at **http://localhost:3000**.

### HTTPS Requirement

Service workers require a secure context (`https://`). For local development, `localhost` is exempt — the service worker will register and offline mode will function on `http://localhost:3000`. In production, the app must be served over `https://`.

### Offline Capability

Once the service worker is installed (on first visit), the app shell and cached assets are available offline. Subsequent loads do not require a network connection.

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the development server listens on |

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

### Known Limitations

`npm run lint` (`node --check src/index.js`) checks only `src/index.js` — it is not a directory scan. It is also **not an ES5 compliance gate** (it accepts all ES2022+ syntax silently). JavaScript files under `public/` are not linted; review them manually.
