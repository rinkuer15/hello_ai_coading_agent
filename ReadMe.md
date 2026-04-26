# Hello AI Coding Agent

A minimal scaffold for experimenting with AI-assisted coding agents, featuring a dark/light ANSI theme system for the CLI output.

## Setup

```bash
npm install   # no-op: zero runtime dependencies
```

Requires **Node.js ≥ 20.0.0** (see `.nvmrc`).

## Usage

```bash
# Run with default theme (dark)
npm start

# Run with a specific theme
node src/index.js --theme dark
node src/index.js --theme light

# Persist theme preference for future runs
node src/index.js --theme dark   # saves to ~/.hello-ai-config.json

# Show help
node src/index.js --help
node src/index.js -h
```

### Theme Options

| Theme   | Description                         |
|---------|-------------------------------------|
| `dark`  | Bright-white primary text (default) |
| `light` | Blue primary text                   |

The **default theme is `dark`** — chosen because most modern terminals use dark backgrounds and bright-white text offers maximum contrast.

ANSI colour output is automatically suppressed when:
- `NO_COLOR` environment variable is set
- `TERM=dumb`
- stdout is not a TTY (e.g. piped to a file)

## Running Tests

```bash
npm test
```

Runs all `*.test.js` files via `node --test` (Node.js built-in test runner, stable since v20).

## Lint / Syntax Check

```bash
npm run lint        # node --check src/index.js (syntax validation)
npm run type-check  # same as lint
```

## Architecture

**Module system:** CommonJS (`require` / `module.exports`) — chosen because no transpilation step exists and CJS is natively supported in all Node.js 20 environments without flags.

**Data flow:**

```
node src/index.js [--theme dark|light]
  └─ main()
       ├─ parseArgs(process.argv)      → { theme: 'dark'|'light'|null }
       ├─ config.loadConfig()          → { version, theme } (reads ~/.hello-ai-config.json)
       ├─ resolveTheme(arg, cfg)       → 'dark'|'light'
       ├─ config.saveConfig(theme)     → writes ~/.hello-ai-config.json (if --theme given)
       └─ renderGreeting(theme)
            └─ theme.applyTheme(msg, theme, opts) → ANSI-coloured or plain string
```

**Source layout:**

```
src/
  index.js        Entry point; parseArgs, printHelp, resolveTheme, main
  theme.js        ANSI constants and applyTheme(); no config knowledge
  config.js       loadConfig / saveConfig for ~/.hello-ai-config.json; no ANSI knowledge
  *.test.js       Co-located unit and integration tests
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`
