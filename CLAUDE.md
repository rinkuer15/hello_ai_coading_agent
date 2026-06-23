# Hello AI Coding Agent — Agent Instructions

> **Single source of truth** for all AI agents and coding assistants on this project.
> - **Claude** reads this as `CLAUDE.md` (native)
> - **Copilot / Codex / Other agents** read this via `AGENTS.md` (redirect)
> - All agents share the same instructions.

Instructions for working in this repository. Read this file before making any code changes.

**For scope:** See MISSION.md — what is and is not in scope for this project.
**For process:** See GUARDRAILS.md — operating rules, quality gates, what to reject.
**Conflict resolution:** MISSION.md wins on scope, GUARDRAILS.md wins on process,
this file wins on code style and conventions.

---

## Project Overview

Hello AI Coding Agent is a deliberately minimal Node.js CLI application whose entire runtime behaviour is a single `console.log` statement. The project's real purpose is to serve as a controlled, observable experimental substrate for AI coding agents — a sandbox where agent behaviour, governance compliance, and code-quality tooling can be tested against a codebase small enough to fully understand in seconds.

The application is a command-line program: run `node src/index.js` (or `npm start`) and it prints `Hello, AI Coding Agent!` to stdout then exits with code 0. There is no server, no database, no framework, and no user interaction. All complexity lives in the governance layer — the four protected files (MISSION.md, GUARDRAILS.md, AGENTS.md, CLAUDE.md) are architecturally as significant as the source code itself.

The primary language is plain JavaScript (no TypeScript, no transpilation). The runtime is Node.js with no version constraint currently pinned. There are zero npm dependencies. The build pipeline is `node --check` for syntax validation and `node --test` for the built-in test runner. This project is intentionally kept at near-zero complexity so that any agent modification is immediately visible and attributable.

---

## Tech Stack

| Layer           | Technology                                              |
|-----------------|---------------------------------------------------------|
| Runtime         | Node.js (version unpinned — do not use version-specific APIs without adding `.nvmrc` + `"engines"` in `package.json`) |
| Language        | Plain JavaScript, ES5-compatible, single-quoted strings |
| Framework       | None                                                    |
| Database        | None                                                    |
| Test runner     | `node --test` (Node.js built-in; discovers `**/*.test.js`, `**/*.spec.js`, `test/`) |
| Lint            | `node --check src/index.js` (syntax validation only — not a real linter) |
| Package manager | npm (no `package-lock.json` until first dependency is added) |

---

## Repository Layout

    .
    ├── src/
    │   └── index.js        # Sole application source; defines and invokes main()
    ├── package.json         # npm metadata, scripts, zero dependencies
    ├── README.md            # Human-facing setup and usage instructions
    ├── MISSION.md           # PROTECTED — project scope, hard invariants, allowed evolutions
    ├── GUARDRAILS.md        # PROTECTED — process rules, auto-reject triggers, quality gates
    ├── AGENTS.md            # PROTECTED — AI agent instructions and tech stack reference
    ├── CLAUDE.md            # PROTECTED — code style authority; this file
    └── .gitignore           # Excludes node_modules/, dist/, .env, *.log, __pycache__, .DS_Store

**Data flow:** `node src/index.js` evaluates the module, calls `main()`, writes `Hello, AI Coding Agent!` to stdout, then exits 0. No inputs, no branches, no external calls, no return values.

---

## Build, Test & Lint

    # Install dependencies (currently zero — creates no lock file)
    npm install

    # Run all tests
    npm test

    # Type check (syntax validation only)
    npm run type-check

    # Lint (syntax validation — identical to type-check)
    npm run lint

    # Start the application
    npm start

    # Full pre-PR validation (run before every PR)
    npm run lint && npm test

> ⚠️ `npm test` exits 0 even when zero test files exist. Always confirm at least one
> `*.test.js` file was discovered before treating a green run as a quality signal.

> ⚠️ `npm run lint` runs `node --check` — it validates syntax only. It will not catch
> logic errors, unused variables, or style violations. Do not cite a green lint run
> as a quality gate for anything beyond parse-level correctness.

---

## Architecture & Key Patterns

### Core Architecture

1. **Single execution point:** `main()` in `src/index.js` is the only permitted top-level call. All application logic must live inside `main()` or functions called from it. No side-effects at module scope — the only permitted top-level statements are `function` declarations and the single `main()` invocation.

2. **Module system is an unset one-way door:** No `require` or `import` exists in the codebase. The first agent to introduce one permanently commits the repo to that module system. Per GUARDRAILS.md §1, this decision is classified "Defer to Human". Do not introduce `require` or `import` without an explicit human-approved issue.

3. **Zero dependencies is a deliberate invariant:** `package.json` has no `dependencies` or `devDependencies`. Adding any package requires human approval and a justified issue. `package-lock.json` must not be committed until the first dependency is added.

4. **Governance files ARE the architecture:** MISSION.md, GUARDRAILS.md, AGENTS.md, and CLAUDE.md are not supplementary documentation — they are the primary constraint system. Treat violations of these files as breaking changes.

5. **`dist/` must not be created speculatively:** The directory is gitignored and reserved for future build output only. No source files, no empty directories, no placeholder commits targeting `dist/`.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **All logic flows through `main()`** — never add top-level statements other than function declarations and the `main()` invocation.
2. **No error handling exists yet** — the codebase is synchronous with no I/O. When error handling is introduced, it must use `try/catch` with explicit `process.exit(1)` on fatal errors; silent swallowing is prohibited.
3. **Module system requires human approval** — do not add `require` or `import` without an explicit approved issue; this is a scope-change that affects the entire repo permanently.
4. **Co-locate tests as `src/*.test.js`** — place test files alongside their source counterparts; never modify test files to make tests pass (fix source instead).
5. **No version-specific Node.js APIs** — until `.nvmrc` and `"engines"` are added to `package.json`, use only APIs available across all actively maintained Node.js versions.

### Key Conventions

1. **Single-quoted strings only:** All string literals use single quotes (`'Hello, AI Coding Agent!'`). Never use double quotes or template literals unless interpolation is required.
2. **Semicolons everywhere:** Every statement ends with a semicolon. This includes function bodies and the top-level `main()` invocation.
3. **Blank line between declaration and invocation:** Separate function declarations from the `main()` call site with exactly one blank line.
4. **`camelCase` for all identifiers:** Functions, variables, and parameters use `camelCase`. File names use `lowercase` with no separators (e.g., `index.js`).
5. **All source under `src/`:** Never place source files at the repository root. The `"main"` field in `package.json` points to `src/index.js` — maintain this invariant.
6. **`lint` and `type-check` are intentionally identical:** Both run `node --check src/index.js`. This is deliberate scaffolding. Do not change one without changing the other, and do not treat them as real static analysis.
7. **No JSDoc or type annotations until TypeScript is adopted:** The codebase has no type annotations. Do not add JSDoc unless it is part of an approved TypeScript migration.
8. **Scope creep is an auto-reject:** Touch only files causally related to the linked issue. "While I'm here" changes — however benign — cause immediate PR rejection per GUARDRAILS.md §5.
9. **Python tooling is explicitly anticipated:** `.gitignore` includes `__pycache__/`. Do not remove it; Python experimentation is a first-class future addition.
10. **Never pin a Node.js version partially:** If you need to add `.nvmrc`, you must simultaneously add an `"engines"` field in `package.json`. One without the other is an auto-reject.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md`
- Never modify the `"scripts"` block in `package.json` without explicit human approval
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add dependencies without a human-approved justification (see GUARDRAILS.md §2)
- Never declare a task done without running `npm run lint && npm test`
- Never expand scope beyond what the task explicitly requests
- Never modify test files to make tests pass — fix the source code instead
- Never introduce `require` or `import` without an explicitly approved human issue
- Never commit `package-lock.json` before any dependency entry exists in `package.json`
- Never create files inside `dist/` speculatively — it is reserved for build output only
- Never add `console.log` or other side-effects at module scope (outside `main()`)
- Never use `npm test` green status as proof of correctness when zero test files exist

---

## Important Files

| File / Directory    | Purpose                                                                                  |
|---------------------|------------------------------------------------------------------------------------------|
| `src/index.js`      | Sole application source; defines `main()` and invokes it; entire application is 4 lines |
| `package.json`      | npm metadata and all scripts; `"main": "src/index.js"`; zero dependencies enforced       |
| `MISSION.md`        | **PROTECTED.** Defines project scope: what is in/out, hard invariants, allowed evolutions |
| `GUARDRAILS.md`     | **PROTECTED.** Process rules, auto-reject triggers, quality gates, escalation paths       |
| `AGENTS.md`         | **PROTECTED.** AI agent instructions: tech stack reference, coding rules, prohibitions    |
| `CLAUDE.md`         | **PROTECTED.** Code style authority; wins on naming and conventions over other files      |
| `README.md`         | Human-facing setup and usage instructions; minimal                                        |
| `.gitignore`        | Excludes `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__`, `.DS_Store`           |

---

## Development Notes

**`npm test` is silent on zero tests:** `node --test` exits 0 when it discovers no `*.test.js`, `*.spec.js`, or `test/` files. Always verify that at least one test file was discovered before treating a green run as meaningful. The command `npm test` alone cannot distinguish "all tests passed" from "no tests exist".

**`npm run lint` is not static analysis:** `node --check` only parses the file for syntax errors. It will not catch unused variables, wrong logic, or style violations. Do not use a green lint run as evidence of code quality.

**No lock file until first dependency:** `package-lock.json` does not exist and must not be committed until `package.json` gains at least one entry in `dependencies` or `devDependencies`. Committing a lock file prematurely is an explicit auto-reject trigger in GUARDRAILS.md.

**Module system is uncommitted:** The codebase uses neither `require` nor `import`. Introducing either is a permanent, repo-wide architectural decision. It is classified "Defer to Human" — do not make this choice autonomously.

**Node.js version is unpinned:** No `.nvmrc` or `"engines"` field exists. Do not use any Node.js API that is not available across all current LTS versions. If you must pin a version, add both `.nvmrc` and `"engines"` in the same commit — never one without the other.

**All source lives under `src/`:** The `"main"` field in `package.json` references `src/index.js`. Never place application source files at the repository root or in any directory other than `src/`.

**Governance files are immutable to automated workflows:** Any automated PR that touches `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, `CLAUDE.md`, or the `"scripts"` block of `package.json` is auto-rejected with no fix attempt. These files require human PR review.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
