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

This project is a **governance scaffold for AI coding agent experimentation**, not a production application. The runtime code (`src/index.js`) is a deliberate, minimal artefact — four lines that declare `main()`, invoke it, and print exactly one string to stdout. Its sole purpose is to give AI agents something concrete to interact with, without any risk to real business logic.

The true substance of this project is its **governance layer**: four protected markdown files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that encode a complete rule system governing how automated agents may read, write, and submit pull requests against this repository. The project exists to test, calibrate, and demonstrate those governance rules in a zero-risk sandbox environment.

Target users include AI tooling researchers, Developer Experience engineers benchmarking AI coding assistants, platform architects designing agent governance patterns, and red-team engineers probing governance gaps. This is not a CLI tool for end users, not an npm package for publication, and not a template to fork into a production product without first replacing the governance layer entirely.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (version intentionally unpinned — no `.nvmrc`, no `"engines"` field) |
| Language | Plain JavaScript, ES5-compatible (`function` declarations, no arrow functions, no `const`/`let`) |
| Framework | None |
| Database | None |
| Module system | None — no `require`, no `import` anywhere (uncommitted one-way door) |
| Test runner | `node --test` (Node.js built-in — no external framework) |
| Lint | `node --check src/index.js` (syntax parse check only — NOT ESLint) |
| Type check | `node --check src/index.js` (intentionally identical to lint — this is deliberate scaffolding) |
| Build | None — no transpilation, no bundler, no `dist/` |
| Package manager | npm (no `package-lock.json` — intentionally absent while zero deps exist) |
| Dependencies | Zero — `package.json` has no `dependencies` or `devDependencies` keys |

---

## Repository Layout

    .
    ├── src/
    │   └── index.js          # Entire application — 4 lines. main() declared and invoked.
    ├── MISSION.md             # Governance: scope authority — wins on what-to-build disputes
    ├── GUARDRAILS.md          # Governance: process authority — wins on how-the-process-runs
    ├── CLAUDE.md              # Governance: style authority — wins on code conventions (this file)
    ├── AGENTS.md              # Governance: 4-line redirect shim pointing to CLAUDE.md
    ├── README.md              # Human-facing setup/usage/test/contributing documentation
    ├── package.json           # npm metadata + 4 frozen scripts + zero dependencies
    ├── .gitignore             # Excludes node_modules/, dist/, .env, *.log, __pycache__/, etc.
    └── graphify-out/          # Generated knowledge graph output (never hand-edit)
        └── cache/             # Gitignored — volatile tool cache

**Data flow:** `npm start` runs `node src/index.js`, which declares `main()`, immediately invokes it, and `main()` writes exactly `Hello, AI Coding Agent!\n` to stdout before the process exits with code 0. There are no inputs, no branches, no return values, and no I/O beyond that single stdout write.

---

## Build, Test & Lint

    # Install dependencies (no-op — zero dependencies exist)
    npm install

    # Run the application
    npm start

    # Run all tests (discovers *.test.js and *.spec.js — currently zero files)
    npm test

    # Type check (syntax parse only — identical to lint by design)
    npm run type-check

    # Lint (syntax parse only — NOT a real linter)
    npm run lint

    # Full pre-PR validation (run before every PR)
    npm run lint && npm test

    # After pre-PR validation, also manually verify both of the following:
    #   1. stdout of `npm start` is EXACTLY "Hello, AI Coding Agent!\n"
    #   2. `npm test` output shows ≥1 test file discovered (not just silent exit 0)

> ⚠️ **Critical gotcha:** `npm test` exiting 0 with zero output does NOT mean tests passed.
> With zero `*.test.js` files, `node --test` exits 0 silently. Always verify discovery count
> from stdout. A silent green `npm test` is explicitly **NOT** a passing quality gate.

> ⚠️ **Critical gotcha:** `npm run lint` and `npm run type-check` are **intentionally identical**.
> Both run `node --check src/index.js`. This catches parse errors only — not style, logic,
> or type correctness. Do not cite a green lint run as evidence of code quality.

---

## Architecture & Key Patterns

### Core Architecture

1. **The only runtime artefact is `src/index.js`.** The entire application is four lines in one file. There are no helper modules, no utilities, no secondary entry points, and no `src/` subdirectories. Multi-file refactors require a human-approved issue — never autonomous.

2. **`main()` contains all application logic — zero module-scope side effects.** The only top-level statements permitted are function/variable declarations and the single `main();` invocation call site. `console.log` appears only inside `main()`, never at top level.

3. **The stdout contract is byte-stable and frozen.** `Hello, AI Coding Agent!\n` is the exact, immutable output of `npm start`. Any change to this string — even capitalisation or punctuation — requires a human-approved issue explicitly authorising it. It may not be altered as a side effect of any other change.

4. **The governance layer has explicit, deterministic authority precedence.** MISSION.md wins on scope disputes; GUARDRAILS.md wins on process disputes; CLAUDE.md (this file) wins on style disputes. AGENTS.md has no authority of its own — it is a redirect shim. Never route around this hierarchy.

5. **Several architectural decisions are uncommitted one-way doors.** Introducing `require`/`import` (module system), adding the first dependency, committing `package-lock.json`, pinning the Node.js version, or creating `dist/` are decisions that permanently shape the project. Each must be deferred to a human and made deliberately — never as a side effect of another change.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **All logic inside `main()`.** Never place executable statements, side effects, or I/O at module scope. Only declarations and the `main();` call site are permitted at top level.
2. **Error handling pattern:** `try/catch` + `process.exit(1)` for any future async or I/O additions. Silent swallowing of errors is prohibited without exception.
3. **No module imports.** Do not add `require(...)` or `import ...` anywhere. This is a "Defer to Human" one-way door that permanently commits the module system (CommonJS vs ESM).
4. **Tests co-located at `src/*.test.js`** using Node.js built-in `assert` only. Never modify test files to force passing — fix the source code instead.
5. **Stay ES5-compatible.** No arrow functions, no `const`/`let`, no destructuring, no template literals (unless interpolation is genuinely needed). Every existing line sets the precedent.

### Key Conventions

1. **`camelCase` for all identifiers:** `main`, not `Main`, `runMain`, or `run_main`. No abbreviations.
2. **Lowercase filenames:** `index.js`, not `Index.js`. All source filenames are lowercase.
3. **Single-quoted strings always:** `'Hello, AI Coding Agent!'` — use double quotes only if the string itself contains a single quote; use template literals only when interpolation is needed.
4. **Semicolons on every statement:** No ASI reliance. Both `console.log(...);` and `main();` are semicolon-terminated. Every future statement must be too.
5. **Exactly one blank line between `main()` closing brace and `main();` call site:** The canonical spacing is `}\n\nmain();` — not zero lines, not two lines.
6. **No `console.log` outside `main()`:** The only permitted log call is inside the function body. This enforces the no-module-scope-side-effects rule at the logging level.
7. **`package.json` scripts are frozen to exactly four entries:** `start`, `test`, `lint`, `type-check`. No `build`, `format`, `watch`, `dev`, `deploy`, or `precommit` scripts. Adding any requires a human-approved issue.
8. **`dist/` must not be created speculatively:** It is gitignored and reserved for real future build output. Do not create it in anticipation of future needs.
9. **`__pycache__/` in `.gitignore` is intentional:** Python experimentation is an anticipated future addition per MISSION.md. Do not remove it as "unused" — that is a GUARDRAILS.md violation.
10. **Node.js version pinning is an atomic two-part change:** `.nvmrc` and `"engines"` in `package.json` must land in the **same commit**. Never add one without the other.
11. **`package-lock.json` stays absent until the first real dependency lands:** Committing it with zero dependencies is an explicit auto-reject trigger. Generate and commit it only alongside the first approved `package.json` dependency addition.
12. **All source files live under `src/`:** The project root contains no `.js` files — only markdown, JSON, and config. This must remain true.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md` via automated PR — these are human-only protected files
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add dependencies to `package.json` without an explicit human-approved issue authorising the specific package
- Never declare a task done without running `npm run lint && npm test` AND manually verifying `npm start` stdout
- Never expand scope beyond what the task explicitly requests — "while I'm here" improvements are unconditionally rejected
- Never modify test files to make tests pass — fix the source code instead
- Never introduce `require(...)` or `import ...` — this is a one-way-door decision reserved for humans
- Never commit `package-lock.json` while `package.json` has zero dependencies
- Never change `npm run lint` and `npm run type-check` to differ from each other — their identity is deliberate scaffolding, not a bug to fix
- Never create speculative directories (`dist/`, `lib/`, `bin/`, `config/`) not causally required by the current approved change
- Never alter the stdout contract (`Hello, AI Coding Agent!\n`) as a side effect of any other change
- Never add a web server, HTTP listener, cron job, or any long-running process — the app must start, print, and exit 0

---

## Important Files

| File / Directory | Purpose |
|-----------------|---------|
| `src/index.js` | Entire application — 4 lines. `main()` declared and invoked. Stdout contract frozen at `Hello, AI Coding Agent!\n`. |
| `package.json` | npm metadata + 4 frozen scripts + zero dependencies. `"scripts"` block is protected from automation. |
| `MISSION.md` | Governance (scope authority). Defines in-scope/out-of-scope, hard invariants, allowed evolutions, quality standards. Protected from automation. |
| `GUARDRAILS.md` | Governance (process authority). Triage rules, auto-reject triggers, quality gates, escalation paths. Protected from automation. |
| `CLAUDE.md` | Governance (style authority). Architecture reference, coding conventions, "what not to do". Protected from automation. This file. |
| `AGENTS.md` | Governance (compat shim). 4-line redirect to `CLAUDE.md` for tools that look for `AGENTS.md` by convention. Protected from automation. |
| `README.md` | Human-facing setup/usage/test/contributing guide. Must be updated if the observable CLI surface changes. |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/` (intentional — Python anticipated), `.DS_Store`, graphify cost/manifest files. Every entry is deliberate. |
| `graphify-out/` | Generated knowledge graph output from the graphify skill. Never hand-edit. `cache/`, `manifest.json`, `cost.json` are gitignored. |

---

## Development Notes

**`npm test` silent exit 0 is a known and documented trap.** With zero `*.test.js` files, `node --test` exits 0 and emits no output. This is structurally indistinguishable from "all tests passed" by exit code alone. Always check that the test output names at least one discovered test file. A silent green test run is explicitly **not** a passing quality gate — this is documented in GUARDRAILS.md and must not be cited as evidence of correctness.

**`npm run lint` and `npm run type-check` catch syntax errors only.** Both run `node --check src/index.js`. A green pass means the file is parseable JavaScript — nothing more. It does not validate style, logic, naming conventions, spacing, or any of the rules in this file. Do not treat it as a substitute for code review or style enforcement.

**The module system decision is permanently deferred to humans.** There is no `require` and no `import` anywhere in the codebase. Adding either permanently establishes whether this repo is CommonJS or ESM — a repo-wide, toolchain-affecting, irreversible decision with implications for test runners, future dependencies, and editor tooling. This is a "Defer to Human" one-way door, not an implementation detail to resolve opportunistically.

**Python is anticipated — `__pycache__/` is not dead weight.** It appears in `.gitignore` because Python experimentation is explicitly called out in MISSION.md as a future possibility. Removing it as "unused" is a GUARDRAILS.md violation.

**No environment setup is required beyond `git clone`.** There are zero dependencies, no build step, no env vars, no database, and no services. `node src/index.js` runs the entire application from a fresh clone. `npm install` is a no-op in the current state and does not need to be run before `npm start`.

**`graphify-out/` is tool-generated.** The knowledge graph files under this directory are produced by the graphify skill and should never be hand-edited. The `cache/` subdirectory, `manifest.json`, and `cost.json` are gitignored. Any remaining output files in `graphify-out/` are tracked but agent-generated — treat them as build artefacts, not source files.

**Node.js version is intentionally unpinned.** No `.nvmrc` and no `"engines"` field in `package.json` exist yet. The project targets "any modern Node.js" until a human decides on a specific version. When that decision is made, `.nvmrc` and `"engines"` must land in the **same commit** — adding one without the other is an explicit auto-reject trigger in GUARDRAILS.md.

**The prescribed first test, when written, must be a contract test.** It should capture stdout via child process spawn (or mock `process.stdout.write`) and assert the output is exactly `Hello, AI Coding Agent!\n` — byte for byte, including the trailing newline. It lives at `src/index.test.js` and uses only Node.js built-in `assert`. No external assertion libraries are permitted.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
