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

Hello AI Coding Agent is a minimal, zero-dependency Node.js scaffold purpose-built for experimenting with AI-assisted coding agents in a zero-blast-radius environment. The entire runtime is a single 5-line JavaScript file (`src/index.js`) that prints `Hello, AI Coding Agent!` to stdout and exits with code 0. This deliberate simplicity is not a limitation — it is the design. The frozen, byte-stable stdout output serves as a measurable regression contract that requires no domain knowledge to verify, making it an ideal baseline for testing and calibrating agentic workflows.

The actual product is the governance layer: four protected markdown files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that together encode a complete, conflict-resolving rule system governing how AI agents may interact with this repository. These documents define authority hierarchies, coding conventions, triage decision trees, and hard invariants — everything needed to safely introduce automated tooling into a codebase without chaos. The project runs entirely on Node.js built-ins: no transpiler, no bundler, no external dependencies of any kind.

The project targets AI tooling researchers, DevEx engineers, and platform architects who need a reproducible, low-risk sandbox to test agent behaviours, governance models, and automated PR pipelines without risking real application code. It is deployed as a CLI tool invoked via `npm start` — no server, no database, no network.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (version intentionally unpinned — no `.nvmrc`, no `"engines"`) |
| Language | Plain JavaScript, ES5-compatible (no transpilation) |
| Framework | None |
| Database | None |
| Module system | None — no `require`, no `import` anywhere (uncommitted one-way door) |
| Test runner | `node --test` (Node.js built-in) |
| Lint | `node --check src/index.js` (syntax parse only — NOT ESLint) |
| Type check | `node --check src/index.js` (intentionally identical to lint — do NOT change this) |
| Build | None — no transpiler, no bundler, no `dist/` |
| Package manager | npm — `package-lock.json` intentionally absent while zero deps exist |
| Dependencies | **Zero** — `package.json` has no `dependencies` or `devDependencies` keys |
| Knowledge graph | `graphify` (external tool, not a project dependency) |

---

## Repository Layout

    hello_ai_coading_agent/
    ├── src/
    │   └── index.js          # Entire application — 5 lines, sole runtime
    ├── graphify-out/
    │   ├── cache/            # Gitignored — tool-generated cache, never hand-edit
    │   ├── graph.json        # Generated knowledge graph (JSON) — never hand-edit
    │   ├── graph.html        # Generated knowledge graph (HTML) — never hand-edit
    │   └── GRAPH_REPORT.md   # Generated report — never hand-edit
    ├── MISSION.md            # Governance: scope authority
    ├── GUARDRAILS.md         # Governance: process authority
    ├── CLAUDE.md             # Governance: style/convention authority (this file)
    ├── AGENTS.md             # Governance: 4-line compatibility shim → CLAUDE.md
    ├── ReadMe.md             # Human-facing documentation
    ├── package.json          # npm metadata + 4 frozen scripts + zero deps
    ├── .gitignore            # 8 deliberate, semantically intentional entries
    └── .graphifyignore       # Excludes tool-generated paths from knowledge graph

**Data flow:** A user invokes `npm start`, which runs `node src/index.js`; the JS engine calls `main()`, which writes exactly `Hello, AI Coding Agent!\n` to stdout, then the process exits with code 0. No input is read, no network is touched, no files are written.

---

## Build, Test & Lint

    # Install dependencies (currently a no-op — zero deps)
    npm install

    # Run all tests — MUST verify stdout names ≥1 test file (silent exit 0 is meaningless)
    npm test

    # Type check (intentionally identical to lint — do NOT fix this)
    npm run type-check

    # Lint (syntax parse only — not ESLint)
    npm run lint

    # Run application — verify exact stdout bytes
    npm start

    # Full pre-PR validation (run before every PR)
    npm run lint && npm run type-check && npm test
    # Then manually: npm start → confirm stdout is exactly: Hello, AI Coding Agent!

**No build step. No `dist/`. No transpilation. No format command. No lint:fix command.**

> ⚠️ `npm test` exiting 0 is NOT evidence of passing tests. With zero `*.test.js` files,
> `node --test` exits 0 silently. Always confirm that test output names at least one
> discovered test file — exit code alone is never sufficient proof.

---

## Architecture & Key Patterns

### Core Architecture

1. **The governance layer is the product.** `src/index.js` exists only to give agents something concrete to interact with. The four governance files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) are the actual value — they are constitutional documents, not living documentation to sync or clean up.
2. **The stdout string is a byte-stable regression contract.** `Hello, AI Coding Agent!\n` — exact characters, exact capitalisation, exact trailing newline — is a frozen invariant. It cannot change as a side effect of any refactor, formatting pass, or tooling change. Only an explicitly authorised human issue may change it.
3. **No module system — an uncommitted one-way door.** No `require`, no `import`, no `export` exists anywhere. Introducing any of these is a permanent, toolchain-affecting, irreversible decision (CommonJS vs ESM) that requires explicit human approval. Any autonomous introduction is an immediate auto-reject.
4. **Authority hierarchy for conflict resolution:** `MISSION.md` wins on scope disputes → `GUARDRAILS.md` wins on process disputes → `CLAUDE.md` (this file) wins on style/convention disputes → `AGENTS.md` has no independent authority (redirect shim only).
5. **The silent-pass trap.** `npm test` (`node --test`) exits 0 when zero `*.test.js` files exist. This is the most dangerous operational trap in the repo — always verify test file names appear in output, never rely on exit code alone.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **ES5 syntax only in all source files.** Use `function` declarations, no `const`/`let`, no arrow functions, no destructuring, no template literals, no spread operators, no `class`, no `async`/`await`. This is a deliberate frozen constraint, not a gap to modernise.
2. **Error handling: `try/catch` + `process.exit(1)`.** Silent `catch` blocks are prohibited. Errors must be surfaced. This pattern is prescribed for any future error-handling code, even though it has no current instantiation.
3. **No module scope side effects.** Only declarations and the single `main();` invocation at module scope — no conditional logic, no I/O, no network calls outside a function body.
4. **Test files co-located under `src/`.** All `*.test.js` files live at `src/*.test.js`. Use `node:assert` built-in only — no external assertion libraries permitted. The first required test is a contract test that spawns `node src/index.js` as a child process and asserts exact stdout bytes.
5. **Never modify test files to make tests pass.** Fix the source code instead. If a test is wrong, the PR must explicitly explain why — and that claim will be scrutinised.

### Key Conventions

1. **ES5 syntax — always:** Use `function` declarations over arrow functions; `var`-style thinking (no `const`/`let`); no destructuring, template literals, or spread.
2. **Single-quoted strings:** `'Hello, AI Coding Agent!'` — use double quotes only if the string itself contains a single quote.
3. **Semicolons on every statement:** Both `console.log(...);` and `main();` are terminated. No ASI reliance anywhere.
4. **camelCase identifiers only:** `main`, `myFunction`, `myVariable` — no `snake_case`, no `PascalCase` for functions or variables.
5. **Lowercase filenames:** `index.js`, not `Index.js` or `INDEX.js`.
6. **All `.js` source files under `src/` exclusively:** Never place a `.js` file at project root.
7. **Exactly one blank line between `}` and `main();`:** The file must end as `}\n\nmain();\n` — one blank line between the closing brace of `main()` and its call site. Automated formatters that collapse or expand this are producing incorrect output.
8. **`lint` and `type-check` scripts are intentionally identical:** Both run `node --check src/index.js`. This is documented scaffolding. Making them differ is an explicit auto-reject trigger, not an improvement.
9. **`package-lock.json` must stay absent while zero deps exist:** Do not generate or commit it. It must arrive atomically with the first approved real dependency.
10. **Node.js version pinning is an atomic two-file operation:** `.nvmrc` and `"engines"` in `package.json` must arrive in the same commit or neither may be added. Adding one without the other is an auto-reject trigger.
11. **`__pycache__/` in `.gitignore` is intentional:** Python experimentation is explicitly anticipated. Removing it is a rule violation, not a cleanup.
12. **Never hand-edit `graphify-out/`:** Treat it as a build artefact like `dist/` — tool-owned, generated, never manually modified.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md`
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add `dependencies` or `devDependencies` without explicit human authorisation (see GUARDRAILS.md §2)
- Never declare a task done without running the full validation sequence AND verifying test file names in output
- Never expand scope beyond what the task explicitly requests — "while I'm here" changes are unconditionally rejected
- Never modify test files to make tests pass — fix the source code instead
- Never introduce `require`, `import`, `module.exports`, or `export` anywhere without explicit human approval
- Never alter the stdout string `Hello, AI Coding Agent!\n` as a side effect of any change
- Never commit `package-lock.json` while the dependency list is empty
- Never place a `.js` file at project root — all source files live under `src/`
- Never upgrade `src/index.js` syntax from ES5 to ES6+ without a human-approved issue explicitly authorising it
- Never make `npm run lint` and `npm run type-check` run different commands — their identity is governance-enforced scaffolding
- Never add production infrastructure: Docker, CI/CD pipelines, environment staging, monitoring, or deployment configuration
- Never treat `npm test` exit 0 as proof of passing tests — always verify test file names appear in stdout

---

## Important Files

| File / Directory | Purpose |
|-----------------|---------|
| `src/index.js` | Entire application — 5 lines. Stdout output is the frozen byte-stable regression contract. Canonical form: `function main()` → blank line → `main();`. The only valid form of this file. |
| `package.json` | npm metadata + 4 frozen scripts + zero deps. `lint` and `type-check` are intentionally identical (`node --check src/index.js`). Scripts block is governance-protected — do not diverge. |
| `MISSION.md` | Scope authority. Defines in-scope/out-of-scope, hard invariants, allowed evolutions, non-goals. Wins all scope disputes. Immutable by automation. |
| `GUARDRAILS.md` | Process authority. Triage rules, quality gates, auto-reject triggers (12 enumerated), protected file list, escalation conditions. Wins all process disputes. Immutable by automation. |
| `CLAUDE.md` | Style and convention authority (this file). Tech stack, repo layout, build commands, coding rules, what-not-to-do. Wins all style/convention disputes. Immutable by automation. |
| `AGENTS.md` | Compatibility shim — 4-line redirect to `CLAUDE.md` for tools that discover agent instructions via the `AGENTS.md` naming convention. No independent authority. Immutable by automation. |
| `ReadMe.md` | Human-facing documentation. Must be kept in sync with observable CLI surface (commands, stdout string, exit codes) — and only then. |
| `.gitignore` | 8 deliberate, semantically intentional entries. `__pycache__/` = Python experimentation anticipated. `dist/` = build output slot reserved. `.env` = no-secrets pattern. Every entry has a documented reason; none may be removed as "cleanup". |
| `.graphifyignore` | Excludes `node_modules/`, `dist/`, `build/`, `.git/`, `.devox/`, `graphify-out/`, `*.lock`, `*.lockb` from knowledge graph extraction. Tool configuration — do not hand-edit. |
| `graphify-out/` | Generated knowledge graph artefacts (graph.json, graph.html, GRAPH_REPORT.md + cache/). Treat as a build artefact like `dist/`. Never hand-edit. `cache/` is gitignored. |

---

## Development Notes

**The silent-pass trap — most critical gotcha:**
`npm test` (`node --test`) exits 0 silently when zero `*.test.js` files exist. The repo currently has no test files. Exit code 0 from `npm test` means nothing until `src/index.test.js` (or another `src/*.test.js`) exists. Always confirm test file names appear in `npm test` stdout before declaring the test suite green.

**`npm install` is a no-op:** There are zero dependencies. Running `npm install` produces no output and changes nothing. Do not interpret its successful exit as environment validation.

**The first contract test to write (when authorised):**
`src/index.test.js` — spawn `node src/index.js` as a child process, capture stdout, assert exact bytes `Hello, AI Coding Agent!\n`. Use `node:assert` and `node:child_process` built-ins only. No external libraries.

**ES5 is a frozen constraint, not a legacy gap:** Do not "modernise" `src/index.js` to use `const`, `let`, arrow functions, template literals, or any ES6+ feature. The constraint enables zero-transpilation direct execution and is enforced by governance.

**Module system is an uncommitted one-way door:** No `require` or `import` exists anywhere. Adding either is an irreversible toolchain decision (CommonJS vs ESM) that affects how Node.js resolves all future files, whether `__dirname` is available, and how tests import modules. This door must stay closed until a human explicitly and deliberately opens it via an authorised issue.

**Node.js version is intentionally unpinned:** No `.nvmrc`, no `"engines"` field in `package.json`. If pinning is ever authorised, both files must arrive in the same atomic commit — adding one without the other is an auto-reject trigger.

**Governance files are constitutional, not living docs:** `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, and `AGENTS.md` are immutable by any automated workflow. Their authority depends on their immutability. Do not update them to "keep docs in sync" after a code change — any such PR is immediately rejected.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
