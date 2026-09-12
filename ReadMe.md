# Hello AI Coding Agent

A minimal scaffold for experimenting with AI-assisted coding agents.

## Setup

```bash
npm install --no-package-lock
```

> Never commit `package-lock.json` - see GUARDRAILS.md.

## Usage

```bash
npm start
```

## Running Tests

```bash
npm test
```

> **Note:** If `src/index.test.js` is absent, `npm test` exits 0 silently — this is a false-pass. The file must exist for a real gate.

## Validation

```bash
# ES5 compliance check (automated gate for forbidden ES6+ syntax)
npm run es5-check

# Byte-verify the stdout oracle (must produce exactly 25 bytes)
node src/index.js | xxd
# Expected: 48 65 6c 6c 6f 2c 20 41 49 20 43 6f 64 69 6e 67 20 41 67 65 6e 74 21 0a

# Full pre-PR gate
npm run lint && npm run type-check && npm run es5-check && npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`
