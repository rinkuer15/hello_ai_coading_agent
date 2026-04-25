# AI Agent Instructions for Hello AI Coding Agent

> Read GUARDRAILS.md before making any changes. Read MISSION.md to understand scope.

## Project Overview

Hello AI Coding Agent is a minimal Node.js scaffold designed as a starting point for experimenting with AI-assisted coding agents. Its runtime behaviour is intentionally trivial — invoking `main()` prints `"Hello, AI Coding Agent!"` to stdout and exits with code 0. There is no domain logic, business rules, persistence layer, or network I/O.

The project's value is as a clean, zero-dependency baseline: a known-good structure that AI agents can extend, instrument, or use as a reference implementation while learning to interact with a codebase safely and predictably.

## Tech Stack

- **Runtime**: Node.js (≥ 18 implied by `node --test`; no version pinned — no `.nvmrc`, no `engines` field)
- **Language**: Plain JavaScript — CommonJS style, no TypeScript, no ESM `import`/`export`
- **Frameworks**: None
- **Test runner**: Node.js built-in test runner (`node --test`) — no Jest, Mocha, or Vitest
- **Lint / syntax check**: `node --check src/index.js` — syntax validation only; no ESLint, Prettier, or Biome
- **Build tool**: None — source files are run directly with `node`; no transpilation or bundling
- **Database**: None
- **Dependencies**: Zero — `package.json` declares no `dependencies` or `devDependencies`
- **License**: MIT

## Key Directories

| Path | Purpose |
|---|---|
| `src/` | Source root — all application code lives here |
| `src/index.js` | Entire application: single `main()` function, one `console.log` |
| `package.json` | Project metadata and npm scripts; zero runtime or dev dependencies |
| `ReadMe.md` | Human-readable overview; describes the scaffold and its commands |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env`, logs, Python cache, `.DS_Store` |

> `dist/` is gitignored, hinting that a future build step may be anticipated even though none exists today.

## Build, Test & Lint

All commands are defined in `package.json`. Run them from the repository root.

```bash
# Run the application
npm start
# equivalent: node src/index.js

# Run the test suite (Node built-in runner; currently finds 0 test files)
npm test
# equivalent: node --test

# Syntax-check the source file (NOT a real linter or type checker)
npm run lint
# equivalent: node --check src/index.js

# Alias for the same syntax check
npm run type-check
# equivalent: node --check src/index.js
```

> `lint` and `type-check` are **identical** — both run `node --check`. This is syntax validation only, not ESLint and not TypeScript. Do not confuse either command for a real linter or type system.

No build step exists. Do not assume a compile phase before running or testing code.

## Coding Rules

See GUARDRAILS.md for the complete rule set.

Key highlights for this stack:

1. **Wrap all executable code in `main()`** — never write top-level side-effect code outside a named function. The existing `main()` pattern is the established convention; follow it when adding any new logic.
2. **No module system is in use** — the single source file has no `require()` / `module.exports` and no ESM `import` / `export`. If you need to add modules, make a deliberate, explicit choice between CommonJS and ESM and document it.
3. **Zero-dependency discipline** — `package.json` has no dependencies at all. Any feature that requires a package must include an explicit `npm install <package>` step; never assume a package is available.
4. **Use `console.log` for output** — no logger abstraction exists. Use raw `console.log` until a structured logger is deliberately introduced.
5. **No type system** — source files are plain `.js`. Do not add TypeScript, JSDoc type annotations wired to a checker, or any typed layer without explicit project-level setup and agreement.

## What NOT to Do

- **Do not add top-level side-effect code** outside a named function — always wrap executable logic in `main()` or another clearly named function.
- **Do not assume any package is installed** — there are zero dependencies; `require('anything')` will fail unless you install it first.
- **Do not treat `npm run lint` as a real linter** — it only runs `node --check` (syntax validation). It will not catch logical errors, style violations, or security issues.
- **Do not add TypeScript, ESM, or a bundler** without explicit approval and full setup — the project has no build step and no module system configured.
- **Do not write test files** that target a framework other than the Node.js built-in runner (`node --test`) — no Jest, Mocha, Vitest, or Tap is installed or configured.
- **Do not commit or log secrets, tokens, API keys, or `.env` files** — `.gitignore` already excludes `.env` but this must be respected unconditionally.
- **Do not delete or overwrite `ReadMe.md`, `package.json`, or `.gitignore`** without explicit instruction.
- **Never modify MISSION.md, GUARDRAILS.md, or CLAUDE.md** — these governance files are read-only to agents.
- **Do not pin a Node.js version** unless you also add `.nvmrc` and update `package.json#engines` — partial version constraints create confusion.
- **Do not introduce a `dist/` directory or compiled output** into the repository — `dist/` is gitignored for a reason; committing it would pollute history.

## Architecture Notes

### Single-file architecture
The entire application is one file: `src/index.js`. There are no layers, no modules, no abstractions. Any expansion of the codebase should be done deliberately — introduce new files in `src/` only when there is clear separation of concern to justify it.

### Entry point convention
`package.json#main` points to `src/index.js`. The npm `start` script runs `node src/index.js` directly. This must remain the canonical entry point unless `package.json` is updated accordingly.

### `main()` wrapper pattern
All runtime logic is wrapped in a `main()` function that is called immediately at the bottom of the file. This pattern exists to:
- Avoid polluting the top-level scope
- Make the entry point easy to identify
- Allow future test files to `require()` / `import` the module without triggering side effects (once a module system is added)

Preserve this pattern in all new code added to `src/index.js` or any new source files.

### Test scaffold (empty by design)
`npm test` runs `node --test`, which discovers `*.test.js` files and files inside a `test/` directory per Node.js conventions. No test files exist yet — this is intentional scaffolding. When adding tests, place them at `src/*.test.js` or `test/*.test.js` and use only the Node.js built-in `assert` and `node:test` modules.

### Python artefacts in `.gitignore`
`.gitignore` includes `__pycache__/`, suggesting the scaffold may be intended to accommodate Python scripts or was generated from a generic multi-language template. Do not add Python files unless explicitly instructed.

### Anticipated but absent build step
`dist/` is gitignored, indicating the project template anticipates a future compile or bundle step. No such step exists today. Do not create `dist/` manually, and do not reference it in scripts unless a real build tool is introduced.

### MIT license compatibility
All code, dependencies, and assets added to this project must be compatible with the MIT license. Verify licenses before adding any third-party package.
