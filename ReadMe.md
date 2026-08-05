# Hello AI Coding Agent

A minimal scaffold for experimenting with AI-assisted coding agents.

## Repository Layout

    .
    ├── src/
    │   ├── index.js          # 5-line runtime oracle. Only Node.js source file permitted.
    │   └── index.test.js     # Oracle test (node --test). ES5, Node.js built-ins only.
    ├── public/               # Browser-only app shell. No Node.js APIs permitted in any file here.
    │   ├── service-worker.js # Cache-first SW (FR-4, FR-5). ES5, browser globals only.
    │   ├── index.html        # App shell HTML. Registers service worker with feature guard.
    │   ├── manifest.json     # PWA web manifest.
    │   └── icons/            # App icons (placeholder PNGs).
    ├── MISSION.md            # Scope authority. Immutable.
    ├── GUARDRAILS.md         # Process authority. Immutable.
    ├── CLAUDE.md             # Style/convention authority. Immutable.
    ├── AGENTS.md             # Discovery shim → CLAUDE.md. Immutable.
    ├── README.md             # Human-facing documentation. May be modified by automation.
    └── package.json          # 4 frozen scripts + zero deps.

## Setup

```bash
npm install --no-package-lock
```

## Usage

```bash
npm start
```

Expected output (byte-exact):

```
Hello, AI Coding Agent!
```

## Running Tests

```bash
npm test
```

`npm test` discovers `src/index.test.js` and runs the oracle test, verifying `node src/index.js` produces the expected stdout. A real pass shows ≥1 discovered file in the output.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`
