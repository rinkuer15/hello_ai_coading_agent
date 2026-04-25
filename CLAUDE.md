# CLAUDE.md

Instructions for Claude Code working in this repository.
Read this file before making any code changes.

**For scope:** See MISSION.md — what is and is not in scope for this project.
**For process:** See GUARDRAILS.md — operating rules, quality gates, what to reject.
**Conflict resolution:** MISSION.md wins on scope, GUARDRAILS.md wins on process,
this file wins on code style and conventions.

---

## Project Overview

A minimal Node.js scaffold for AI-assisted coding agent experimentation — the entire runtime is a single `console.log` wrapped in a `main()` function in `src/index.js`, with no dependencies, no build step, and no module system established. It runs directly with `node` and is deployed nowhere; it exists as a clean starting point for agents to extend.

---

## Build, Test & Lint

    # Install dependencies
    npm install

    # Run all tests
    npm test

    # Type check
    npm run type-check

    # Lint
    npm run lint

    # Lint with auto-fix (if available)
    # Not available — node --check does not support auto-fix

    # Format
    # Not available — no formatter is configured

    # Full pre-PR validation (run before every PR)
    npm run lint && npm test

---

## Architecture

This project has a single source layer with no sub-modules, no imports, and no external services.

    hello_ai_coading_agent/
    ├── src/
    │   └── index.js        # Sole source file; entry point; entire application logic
    ├── package.json         # Project metadata, npm scripts, entrypoint declaration
    ├── ReadMe.md            # Human-facing scaffold instructions
    └── .gitignore           # Excludes node_modules/, dist/, .env, *.log, etc.

**Data flow:** `node src/index.js` invokes `main()`, which executes `console.log('Hello, AI Coding Agent!')` — no inputs, no external calls, no outputs beyond stdout.

---

## Key Conventions

1. **Always route logic through `main()`:** All new logic must be added inside or called from `main()`. Never execute business logic at the top level of the module.
2. **Always place source files under `src/`:** The entry point is `src/index.js`; all future source files belong under `src/`.
3. **Use `camelCase` for functions and variables:** The established naming convention is `camelCase` (e.g., `main`, `myHelper`). Never use `PascalCase` for functions or `snake_case` for variables.
4. **Use lowercase filenames:** File names must be lowercase (e.g., `index.js`, `utils.js`). Never use `Index.js` or `MyModule.js`.
5. **Choose a module system deliberately:** No module system is currently in use. The first `require` or `import` sets the project precedent — pick ESM (`import`/`export`) or CJS (`require`) intentionally and apply it consistently.
6. **Never commit secrets to source:** `.env` is gitignored; all environment configuration belongs there. Never hardcode credentials, tokens, or keys in source files.
7. **Commit `package-lock.json` when adding any dependency:** The lock file does not currently exist because there are no dependencies. Once any dependency is added, commit the resulting lock file immediately to ensure reproducibility.
8. **Always run `npm run lint && npm test` before opening a PR:** Even though `lint` is only a syntax check today, the script must stay green. A passing `npm test` with no test files does not mean the code is tested — write tests for any new logic.
9. **Output build artefacts to `dist/` if a build step is added:** `dist/` is already gitignored; all compiled or bundled output must go there to match the existing ignore rule.
10. **Pin a Node.js version when the first dependency is added:** There is currently no `.nvmrc`, `engines` field, or `.node-version` file. Add one of these as soon as the project gains any dependency or version-sensitive behaviour.
11. **Keep `npm run lint` passing at all times:** The lint script (`node --check src/index.js`) only validates syntax, but it must never be broken. If ESLint or another linter is added later, update this script rather than adding a parallel one.
12. **Never add Python files without updating CI/tooling:** `.gitignore` includes `__pycache__/`, hinting at potential Python use. If Python is introduced, update `package.json` scripts and CI accordingly — do not silently mix runtimes.

---

## Important Files

| File / Directory        | Purpose                                                                                      |
|------------------------|----------------------------------------------------------------------------------------------|
| `src/index.js`         | Sole source file; defines and invokes `main()`; the entire application lives here           |
| `package.json`         | Project metadata; declares `"main": "src/index.js"`; defines all npm scripts                |
| `ReadMe.md`            | Human-facing instructions for setup, usage, testing, and contributing                       |
| `.gitignore`           | Excludes `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`             |
| `src/` (directory)     | Root of all application source code; every new `.js` file must live here                    |
| `dist/` (gitignored)   | Intended output directory for any future build step; does not exist yet                     |
| `.env` (gitignored)    | Environment variable configuration; must never be committed; does not exist yet             |
| `package-lock.json`    | Dependency lock file; does not exist yet — must be created and committed with first dep     |

---

## Development Notes

- **`npm test` silently passes with zero test files.** `node --test` exits `0` when it finds no matching files (`**/*.test.js`, `**/*.spec.js`, `test/` directory). A green test run does not mean anything is tested. Always write at least one test for every new function you add.

- **`npm run lint` is syntax-check only.** `node --check src/index.js` only validates that the file parses correctly. It will not catch unused variables, style issues, or logic errors. Do not rely on it as a quality gate beyond "the file is syntactically valid JavaScript".

- **No Node.js version is pinned.** The project has no `.nvmrc`, `engines` field in `package.json`, or `.node-version` file. If you add code that depends on a specific Node.js API, add an `engines` field to `package.json` and a `.nvmrc` file immediately.

- **No module system is established.** `src/index.js` uses neither `require` nor `import`. The first agent to introduce a module import sets the convention for the entire codebase — make this choice deliberately and document it here.

- **There are zero runtime dependencies.** `npm install` is currently a no-op. Any library must be explicitly added via `npm install <pkg> --save` (or `--save-dev` for dev tools), and the resulting `package-lock.json` must be committed.

- **No environment variables are required** to run the project today. If any are added, document them here with names, descriptions, and example values, and add them to a `.env.example` file (committed) alongside the gitignored `.env`.

- **No async patterns exist.** Everything is synchronous. If async code is introduced, add appropriate error handling (`try/catch` with `async/await` or `.catch()` on promises) — there is currently no `process.on('uncaughtException')` or `process.on('unhandledRejection')` handler.

- **`dist/` is gitignored but does not exist.** If a build step (transpilation, bundling) is added, output must go to `dist/`. Do not invent a different output directory.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
