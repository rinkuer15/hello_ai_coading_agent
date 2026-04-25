# AI Agent Instructions for Hello AI Coding Agent

> **Always read GUARDRAILS.md before making any changes.**
> **Always read MISSION.md before accepting or scoping any task.**
> When this file and CLAUDE.md conflict on code style, CLAUDE.md wins.

## Project Overview

Hello AI Coding Agent is a bare-bones Node.js scaffold designed as a starting point for AI-assisted coding agent experimentation. The entire runtime behaviour today is a single `console.log('Hello, AI Coding Agent!')` call inside a `main()` function — the project's purpose is to provide a clean, minimal canvas on which AI agents can iteratively add real functionality.

This is a CLI-style application with no HTTP layer, no database, and no framework. It runs directly with `node src/index.js` (plain JavaScript, CommonJS/ES5-style). There are zero runtime or development dependencies. Any agent working on this project is, by definition, extending its capabilities from scratch.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (version unconstrained — no `.nvmrc` or `engines` field) |
| Language | Plain JavaScript (no TypeScript, no JSDoc, no transpilation) |
| Framework | None |
| Database | None |
| Test runner | Node.js built-in (`node --test`) — discovers `**/*.test.js`, `**/*.spec.js`, `test/` |
| Lint | `node --check` (syntax parse only — no ESLint or Prettier) |
| Package manager | npm (no `package-lock.json` because there are no dependencies yet) |

## Repository Layout

```
.
├── src/
│   └── index.js        # Sole source file; entry point; entire application logic
├── package.json        # Project metadata, npm scripts, main: "src/index.js"
├── ReadMe.md           # Human-facing scaffold instructions and architecture notes
└── .gitignore          # Excludes node_modules/, dist/, .env, *.log, __pycache__, .DS_Store
```

`dist/` is gitignored and reserved for future build output. No build step exists yet.
All new source files belong under `src/`.

## Build, Test & Lint

    # Install dependencies (currently a no-op — zero deps declared)
    npm install

    # Run the application
    npm start

    # Run all tests (node --test discovers *.test.js / *.spec.js / test/ files)
    npm test

    # Syntax check / type-check (node --check only; not a real type-checker)
    npm run type-check

    # Lint (identical to type-check — node --check src/index.js)
    npm run lint

    # Full pre-PR validation sequence
    npm run lint && npm test

> ⚠️ `npm test` exits `0` even when zero test files exist. A green test run does NOT
> mean the codebase is tested. Always confirm test files exist and cover new code.

## Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **Route all logic through `main()`** — The `main()` function is the established top-level orchestrator. New logic must be added inside `main()` or called from it. Never execute logic at the raw module level outside of the `main()` call at the bottom of the file.
2. **No silent failures** — There is currently no error handling. When adding error-prone code (I/O, network, parsing), wrap it in `try/catch` and surface errors explicitly (e.g., `console.error` + non-zero `process.exit`). Do not swallow exceptions.
3. **Establish the module system deliberately** — No `require` or `import` is used yet. The first agent to add a cross-file import sets the precedent for the whole repo. Choose ESM (`import`/`export`) or CJS (`require`) intentionally and document the choice. Do not mix the two.
4. **Co-locate test files and write real tests** — Place test files as `src/*.test.js` alongside the source they cover. Never modify an existing test to force it to pass; fix the implementation instead.
5. **No type annotations exist — add JSDoc if you add complexity** — There is no TypeScript or strict linting. If you add non-trivial functions, document parameter and return types with JSDoc so future agents and humans can understand intent.

## What NOT to Do

- Never modify MISSION.md, GUARDRAILS.md, AGENTS.md, or CLAUDE.md
- Never commit secrets, API keys, tokens, or `.env` files to the repository (`.env` is gitignored — keep it that way)
- Never add dependencies without justification (see GUARDRAILS.md §2); update `package.json` and commit `package-lock.json` when you do
- Never declare a task done without running `npm run lint && npm test`
- Never expand scope beyond what the task explicitly requests
- Never mix ESM and CJS module syntax within the same codebase
- Never pin or assume a specific Node.js version without also adding an `.nvmrc` and an `engines` field in `package.json` — the runtime is currently unconstrained
- Never place source files outside of `src/` or build artefacts outside of `dist/`
- Never mistake a passing `npm test` (exit 0 with no test files) for a tested codebase

## Architecture Notes

1. **Single-layer architecture** — There are no service, controller, or data layers. The entire application is `src/index.js`. Any agent adding meaningful features should introduce `src/` sub-modules deliberately and document the layering decision rather than piling everything into `index.js`.

2. **Data flow is trivial today** — `node src/index.js` → `main()` → `console.log(...)`. When new logic is added, document the updated data flow here so future agents understand how a request enters the system and how a result is returned.

3. **No module system is established** — The project's `import`/`require` convention is an open question. The agent that introduces the first cross-file dependency owns this architectural choice. Decide once, document it in this file, and be consistent.

4. **`npm run lint` is not a real linter** — `node --check` only validates that JavaScript parses successfully. Style issues, unused variables, and logic errors are invisible to it. Do not rely on a green lint run as a quality signal beyond "the file is valid JS".

5. **The `.gitignore` includes `__pycache__/`** — The scaffold was created with a generic template that anticipates possible Python experimentation. Do not assume the project is permanently Node.js-only; if Python files are added, treat them as first-class citizens with their own lint and test commands.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
