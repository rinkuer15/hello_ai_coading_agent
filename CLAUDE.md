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
| Type check | `node --check src/index.js` (intentionally identical to lint — deliberate scaffolding) |
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
    ├── .graphifyignore        # Excludes paths from knowledge graph extraction tool
    └── graphify-out/          # Generated knowledge graph output — never hand-edit
        └── cache/             # Gitignored — volatile tool cache

**Data flow:** `npm start` runs `node src/index.js`, which declares `main()`, immediately invokes it, and `main()` writes exactly `Hello, AI Coding Agent!\n` to stdout before the process exits with code 0. There are no inputs, no environment variable reads, no file I/O, no network calls, no branches, and no return values used.

---

## Build, Test & Lint

    # Install dependencies (currently a no-op — zero dependencies exist)
    npm install

    # Run the application — stdout MUST be exactly: Hello, AI Coding Agent!
    npm start

    # Run all tests (VERIFY stdout names ≥1 test file — silent exit 0 is NOT sufficient)
    npm test

    # Syntax check (parse errors only — not a quality gate)
    npm run lint

    # Type check (intentionally identical to lint — do NOT "fix" this)
    npm run type-check

    # Full pre-PR validation sequence (run before every PR)
    npm run lint && npm run type-check && npm test
    # Then also run manually:
    npm start
    # Confirm stdout is EXACTLY: Hello, AI Coding Agent!
    # Confirm npm test output names at least one discovered test file

No build step. No `dist/`. No transpilation. No bundler. No format command.

---

## Architecture & Key Patterns

### Core Architecture

1. **The runtime is a single 4-line file.** `src/index.js` is the entire application. There is no routing, no middleware, no services, no handlers — just `main()` declared and invoked. Any change that introduces structural layers must be explicitly justified in a linked issue.

2. **The stdout output is a frozen regression contract.** `Hello, AI Coding Agent!\n` — exact bytes including capitalisation, punctuation, and trailing newline — is the only observable behaviour of this program. It must not change as a side effect of any refactor, dependency add, or tooling change. Only a human-approved issue explicitly authorising a stdout change may alter it.

3. **The module system is an uncommitted one-way door.** No `require` and no `import` exist anywhere. Adding either permanently establishes CommonJS vs ESM for the entire repository. Any agent that introduces a module system keyword without an explicit human-approved issue triggers an immediate auto-reject.

4. **The governance files are the real product.** `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, and `AGENTS.md` encode the operating rules for AI agents. They are not documentation to be kept in sync — they are the system. Treat modifications to them as constitutional amendments, not routine edits.

5. **`npm test` exiting 0 does not mean tests passed.** With zero `*.test.js` files present, `node --test` exits 0 silently and discovers nothing. Always verify that the test run output names at least one discovered test file. This is the single most dangerous operational trap in the repository.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights:

1. **All source files must live under `src/` — never at the project root.** Only markdown, JSON, and dotfiles belong at the root. No `.js` files at the project root, ever.
2. **Error handling must use `try/catch` + `process.exit(1)`.** Silent catch blocks are prohibited. No error handling exists yet because there is no I/O to fail — the pattern applies when I/O is first introduced.
3. **No module keywords without explicit approval.** No `require`, no `import`, no `export`. Introducing either CommonJS or ESM is a one-way, toolchain-affecting decision that requires a human-approved issue.
4. **Tests must be co-located at `src/*.test.js` using `node:assert` built-in only.** No external assertion libraries. The first test must be a contract test: spawn `node src/index.js` as a child process, capture stdout, assert exact bytes `Hello, AI Coding Agent!\n`.
5. **Never modify test files to make tests pass.** Fix the source code instead.

### Key Conventions

1. **ES5 syntax only:** Use `function` declarations, not arrow functions. No `const`/`let` — use `var`-compatible thinking. No destructuring, no template literals, no spread operators. Every line of `src/index.js` sets this precedent.
2. **Single-quoted strings:** Always use `'single quotes'`. Exception: strings that contain a single quote (use double quotes then), or genuine interpolation needs (use template literals only in that case).
3. **Semicolons on every statement:** No ASI reliance anywhere. Both `console.log(...);` and `main();` are semicolon-terminated.
4. **Exactly one blank line after `main()`:** The canonical form is `}\n\nmain();` — one blank line separating the closing `}` from the call site. Not zero lines, not two.
5. **`camelCase` identifiers only:** No `snake_case`, no `PascalCase` for functions or variables, no abbreviations. `main` not `Main`, `runMain`, or `run_main`.
6. **Lowercase filenames only:** `index.js` not `Index.js`. No uppercase anywhere in filenames.
7. **`lint` and `type-check` scripts are intentionally identical:** Both run `node --check src/index.js`. Making them differ is an explicit auto-reject trigger in GUARDRAILS.md. This is documented scaffolding, not a bug — do not "fix" it.
8. **`package-lock.json` must not be committed while zero dependencies exist:** Its absence is intentional. It must arrive in the same commit as the first approved real dependency — never before.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md` via any automated workflow
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add dependencies without an explicit human-approved issue and justification (see GUARDRAILS.md)
- Never declare a task done without running the full pre-PR validation sequence
- Never expand scope beyond what the linked issue explicitly requests — "while I'm here" changes are unconditionally rejected
- Never modify test files to make tests pass — fix the source code instead
- Never commit `package-lock.json` before the first approved real dependency is also committed in the same PR
- Never introduce `require` or `import` without an explicit human-approved issue establishing the module system
- Never remove `__pycache__/` from `.gitignore` — Python experimentation is explicitly anticipated and that entry is intentional
- Never add a `.nvmrc` or `"engines"` field to `package.json` without also including the other in the same atomic commit
- Never treat `npm test` exiting 0 as evidence of passing tests — verify that at least one test file was discovered in stdout

---

## Important Files

| File / Directory | Purpose |
|-----------------|---------|
| `src/index.js` | **Entire application** — 4 lines. Declares `main()` and invokes it. The stdout output is the frozen regression contract. |
| `package.json` | npm metadata + 4 frozen scripts + zero dependencies. The scripts block is protected from automation. |
| `MISSION.md` | Governance (scope authority). Defines in-scope/out-of-scope, hard invariants, and allowed evolutions. Wins on scope disputes. Immutable by automation. |
| `GUARDRAILS.md` | Governance (process authority). Full triage decision tree: accept/reject/defer/escalate rules, quality gates, auto-reject triggers. Wins on process disputes. Immutable by automation. |
| `CLAUDE.md` | Governance (style authority). Architecture reference, tech stack, coding conventions, what-not-to-do list. Wins on style/convention disputes. Immutable by automation. |
| `AGENTS.md` | Governance (compatibility shim). 4-line redirect to `CLAUDE.md` for tools that look for `AGENTS.md` by convention. No independent authority. Immutable by automation. |
| `README.md` | Human-facing documentation. Must be updated if the observable CLI surface (commands, stdout, exit codes) changes. |
| `.gitignore` | Every entry is semantically deliberate. `__pycache__/` = Python anticipated. `dist/` = build output reserved. `.env` = no-secrets pattern. Do not modify without justification. |
| `.graphifyignore` | Excludes `node_modules/`, `dist/`, `build/`, `.git/`, `.devox/`, `graphify-out/`, `*.lock`, `*.lockb` from knowledge graph extraction. Tool configuration — do not hand-edit output. |
| `graphify-out/` | Knowledge graph output (JSON, HTML, report). Tool-generated — never hand-edit any file inside it. Treat as a build artefact like `dist/`. |

---

## Development Notes

**No environment setup required.** `node src/index.js` works from a fresh `git clone` with zero install steps. `npm install` is currently a no-op. There are no environment variables, no services, no databases, and nothing to configure.

**`npm test` silent exit 0 is a known trap.** With no `*.test.js` files present, `node --test` exits 0 and prints nothing. A passing `npm test` in this repository currently means nothing. Always check stdout for evidence of test file discovery. This trap is documented in every governance file because it is the most dangerous operational assumption an agent can make.

**Node.js version pinning is an atomic two-file operation.** Adding `.nvmrc` without simultaneously adding `"engines"` to `package.json` (or vice versa) is an auto-reject trigger. Neither file currently exists — do not add one without the other.

**`graphify-out/` is a generated artefact directory.** Treat it exactly like `dist/`. The `cache/` subdirectory is gitignored. Never manually edit any file inside `graphify-out/`.

**The blank line in `src/index.js` is a hard convention.** The file must end as `}\n\nmain();\n` — exactly one blank line between the closing brace of `main()` and its call site. Automated formatters that collapse or expand this spacing are producing incorrect output for this repository.

**Scope creep is unconditionally rejected.** Every file modified in a PR must be causally required by the linked issue. Any incidental improvement, cleanup, or pre-emptive refactor that is not explicitly in scope is rejected without negotiation and without a fix attempt. Reframing an out-of-scope request into an in-scope version is the requester's responsibility, not the agent's.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
