# Hello AI Coding Agent

A governance benchmark instrument for AI coding agents. The runtime is a single
5-line Node.js program (`src/index.js`) whose sole behaviour is to write
`Hello, AI Coding Agent!\n` to stdout and exit with code 0.

## Setup

```bash
npm install --no-package-lock
```

> **Note:** Zero dependencies — this is always a no-op. Use `--no-package-lock`
> to avoid generating a lockfile.

## Usage

```bash
npm start
# Expected stdout (byte-exact): Hello, AI Coding Agent!
```

## Running Tests

```bash
npm test
```

The test suite (`src/index.test.js`) verifies:

- **Stdout oracle** — byte-exact match of `Hello, AI Coding Agent!\n`
- **Exit code** — process exits with code 0
- **Blank-line invariant** — exactly one blank line between the closing `}` of
  `main()` and the `main();` call
- **ES5 compliance** — no `const`, `let`, arrow functions, template literals,
  or other ES6+ syntax in the source

## Linting

```bash
npm run lint
```

> **Important:** `npm run lint` runs `node --check src/index.js`, which is a V8
> parse-only check. It accepts all ES2022+ syntax and is **not** an ES5
> compliance gate. ES5 compliance is enforced by the test suite and manual
> inspection.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`
