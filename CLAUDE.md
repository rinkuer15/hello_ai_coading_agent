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

`hello_ai_coading_agent` is a minimal Node.js CLI scaffold designed as an experimentation
platform for AI-assisted coding agents. Its runtime behaviour is intentionally trivial: running
`node src/index.js` (or `npm start`) prints `Hello, AI Coding Agent!` to stdout and exits 0.
The application itself is four lines of plain JavaScript.

The real substance of the project is its **governance layer** — a set of protected markdown
files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that define exactly how AI
coding agents may and may not operate on the repository. This makes the project a controlled
environment for testing, validating, and refining agent behaviour under strict constraints.

The project has zero external dependencies, no build step, no framework, and no database.
It targets any modern Node.js version (currently unpinned) and is deployed purely as a local
CLI invocation. Developers and AI agents alike interact with it through four npm scripts:
`start`, `test`, `lint`, and `type-check`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (version unpinned — no `.nvmrc`, no `"engines"` field) |
| Language | Plain JavaScript, ES5-compatible, single-quoted strings, semicolons |
| Framework | None |
| Database | None |
| Module system | None — no `require`, no `import` anywhere |
| Test runner | `node --test` (Node.js built-in; auto-discovers `*.test.js` / `*.spec.js`) |
| Lint | `node --check src/index.js` (syntax validation only — NOT a real linter) |
| Type check | `node --check src/index.js` (intentionally identical to lint) |
| Build | None — no transpilation, no bundler, no `dist/` output |
| Package manager | npm (no `package-lock.json` — zero deps) |
| Dependencies | Zero — no `dependencies` or `devDependencies` in `package.json` |

---

## Repository Layout

    .
    ├── src/
    │   └── index.js          ← Entire application: declares main(), invokes it. 4 lines.
    ├── graphify-out/
    │   ├── cache/            ← Knowledge graph cache (gitignored manifest/cost files)
    │   └── ...               ← Knowledge graph output (rest tracked)
    ├── package.json          ← npm metadata, 4 scripts, zero deps, "main": "src/index.js"
    ├── README.md             ← Human-facing: setup, usage, test, contributing
    ├── MISSION.md            ← PROTECTED. Scope authority.
    ├── GUARDRAILS.md         ← PROTECTED. Process authority and auto-reject triggers.
    ├── CLAUDE.md             ← PROTECTED. Style authority (this file).
    ├── AGENTS.md             ← PROTECTED. Redirect shim to CLAUDE.md.
    └── .gitignore            ← Excludes node_modules/, dist/, .env, *.log, __pycache__/, .DS_Store

**Data flow:** `npm start` → Node evaluates `src/index.js` → `main()` is declared, then
invoked → `console.log('Hello, AI Coding Agent!')` writes to stdout → process exits 0.
No inputs, no branches, no return values, no I/O beyond stdout.

---

## Build, Test & Lint

    # Install dependencies (currently a no-op — zero deps — but run after any dep is added)
    npm install

    # Run application
    npm start

    # Run all tests (discovers *.test.js / *.spec.js / test/ automatically)
    npm test

    # Syntax validation (NOT a real linter — catches parse errors only)
    npm run lint

    # Type check (intentionally identical to lint — deliberate scaffolding)
    npm run type-check

    # Full pre-PR validation (run before every PR)
    npm run lint && npm test

> ⚠️ `npm test` exiting 0 with **zero discovered test files** is NOT a passing quality gate.
> Always verify that at least one `*.test.js` file was discovered and executed before
> reporting the test gate as green.

---

## Architecture & Key Patterns

### Core Architecture

1. **Single-file application.** `src/index.js` is the entire codebase. All logic must live
   inside `main()`. No side-effects are permitted at module scope other than the function
   declaration and the single `main()` call.

2. **Module system is an uncommitted one-way door.** There is no `require` and no `import`
   anywhere. Introducing either permanently establishes the module system for the entire repo.
   This decision is "Defer to Human" — never make it autonomously.

3. **Zero-dependency policy is active.** `package.json` has no `dependencies` or
   `devDependencies` keys. Adding either requires explicit human sign-off and a corresponding
   issue. `package-lock.json` must not be committed until a real dependency is added.

4. **Stdout contract is frozen.** The output `Hello, AI Coding Agent!\n` must remain
   byte-for-byte stable unless a human-approved issue explicitly changes it.

5. **Governance files are architecturally equal to source code.** `MISSION.md`,
   `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` are protected. Any automated PR that
   touches them is immediately rejected with no fix attempt.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **All logic inside `main()`.** The only top-level statements in any source file are
   function/variable declarations and the single `main()` invocation — nothing else at
   module scope.
2. **Error handling uses `try/catch` + `process.exit(1)`.** When I/O or async logic is
   introduced, fatal errors must be caught and exit with code 1. Silent swallowing is
   prohibited.
3. **No module imports without human approval.** Neither `require(...)` nor `import ...`
   may be introduced autonomously — this establishes an irreversible module system choice.
4. **Co-locate tests at `src/*.test.js`.** New test files live alongside the source they
   test. Use Node.js built-in `assert` — no external assertion libraries.
5. **No type annotations.** No JSDoc, no TypeScript, no inline type comments. The project
   is plain ES5-compatible JavaScript; type tooling is reserved for future human decision.

### Key Conventions

1. **Single-quoted strings always:** Use `'...'` for all string literals. Template literals
   are only permitted when interpolation is actually required (`${}`).
2. **Semicolons on every statement:** Every statement ends with `;` — no exceptions.
3. **`camelCase` for all identifiers:** Functions, variables, and parameters use `camelCase`.
   File names use `lowercase` (e.g., `index.js`). No abbreviations.
4. **One blank line between declaration and call site:** In `src/index.js`, there is exactly
   one blank line between the closing `}` of `main()` and the `main();` invocation. Maintain
   this spacing in all future files that follow the same pattern.
5. **`console.log` inside `main()` only:** Never at module scope or inside helper functions
   that are called before `main()` is entered.
6. **All source files under `src/`:** No `.js` files at the repository root or in any
   directory other than `src/` (and its future subdirectories).
7. **`npm start` stdout is a contract:** Do not change the output string without a
   human-approved issue explicitly authorising the change.
8. **`lint` and `type-check` scripts are intentionally identical:** Both run
   `node --check src/index.js`. Do not "fix" them to differ — that is an auto-reject trigger.
9. **`__pycache__/` in `.gitignore` is intentional:** Python experimentation is a
   first-class anticipated future addition. Removing it as "unused" is a GUARDRAILS.md
   violation.
10. **`dist/` must not be created speculatively:** The directory is reserved for real future
    build output only. Creating it with placeholder or empty files is an auto-reject.
11. **Node.js version stays unpinned unless both gates open simultaneously:** Adding `.nvmrc`
    without also adding `"engines"` in `package.json` (or vice versa) in the same commit is
    an auto-reject.
12. **Scope is strictly bounded by the open issue:** Every file touched in a PR must be
    causally linked to the specific issue being addressed. "While I'm here" improvements are
    unconditionally rejected.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md`
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add dependencies without human sign-off (see GUARDRAILS.md §2)
- Never declare a task done without running `npm run lint && npm test` and confirming
  at least one test file was discovered
- Never expand scope beyond what the task explicitly requests
- Never modify test files to make tests pass — fix the source code instead
- Never introduce `require(...)` or `import ...` without human approval
- Never commit `package-lock.json` while there are zero dependencies
- Never alter the `"scripts"` block in `package.json` in an automated PR
- Never create `dist/` or any speculative output directory
- Never add `.nvmrc` without simultaneously adding `"engines"` in `package.json`
- Never cite a green `npm run lint` run as evidence of code quality or style compliance —
  it is syntax-only (`node --check`)
- Never cite a green `npm test` run as evidence of passing tests if zero `*.test.js` files
  were discovered

---

## Important Files

| File / Directory | Purpose |
|-----------------|---------|
| `src/index.js` | **Entire application.** Defines `main()`, invokes it. 4 lines of plain JS. |
| `package.json` | npm metadata, all 4 scripts (`start`, `test`, `lint`, `type-check`), zero deps. |
| `MISSION.md` | **PROTECTED.** Scope authority: what is in/out of scope, hard invariants, allowed evolutions, quality standards. |
| `GUARDRAILS.md` | **PROTECTED.** Process authority: triage rules, implementation prohibitions, auto-reject triggers, escalation paths, quality gates. |
| `CLAUDE.md` | **PROTECTED.** Style authority: naming, conventions, patterns, architecture explanation (this file). |
| `AGENTS.md` | **PROTECTED.** Redirect shim to `CLAUDE.md` for tools that look for `AGENTS.md`. |
| `README.md` | Human-facing documentation: setup, usage, testing, and contributing guide. |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, and graphify manifest/cost files. |
| `graphify-out/` | Knowledge graph output directory. Manifest and cost files are gitignored; remaining output is tracked. |

---

## Development Notes

**`npm test` green ≠ tests passing.** With zero `*.test.js` files, `node --test` exits 0
silently. Always verify test file discovery is non-zero before reporting the gate as passed.
A correctly written test for `main()` should capture stdout (e.g., via `process.stdout.write`
mock or child process spawn) and assert the output is exactly `Hello, AI Coding Agent!\n`.

**`npm run lint` is syntax-only.** `node --check` catches parse errors, nothing else. Do not
cite a green lint run as evidence of code quality, logic correctness, or style compliance.

**No `package-lock.json`.** The file is intentionally absent. Committing it while there are
zero dependencies is an explicit auto-reject trigger in GUARDRAILS.md §5. Only generate and
commit it when a real dependency is first added (with human approval).

**No environment variables.** The application reads no env vars and has no `.env` file.
There is nothing to configure before running.

**Run from the repository root.** All npm scripts assume they are executed from the project
root directory (where `package.json` lives). There are no subdirectory-specific invocation
requirements.

**`graphify-out/` is a tool artefact.** Its contents are generated by the `graphify` skill
and should not be hand-edited. The `cache/` subdirectory and cost/manifest files are
gitignored; other outputs are tracked as reference material.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
