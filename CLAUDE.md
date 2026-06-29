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

`hello_ai_coading_agent` is a deliberately minimal Node.js sandbox designed as a
governance-complete, zero-blast-radius environment for studying, evaluating, and
benchmarking AI coding agents. The runtime application is a 5-line placeholder that
prints a single line to stdout and exits. The **actual product** is the governance
layer: four constitutional markdown files that encode a complete, conflict-resolving
rule system for safe AI-agent interaction with a repository.

The project targets AI tooling researchers, DevEx engineers, platform architects,
agent calibration engineers, and security/compliance engineers who need a reproducible
environment where agent behaviour can be measured and constrained without risk to real
production code. There is no deployment model in the traditional sense — the tool is
meant to be run against, not run in an environment.

The technology stack is intentionally locked: Node.js (unpinned LTS), plain ES5
JavaScript, zero external dependencies, and the built-in `node --test` runner. Every
constraint is deliberate and governance-enforced. The frozen stdout string
`Hello, AI Coding Agent!\n` is the complete test oracle — any tool that can read
stdout can verify correctness without domain knowledge.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (unpinned — `.nvmrc` and `"engines"` intentionally absent) |
| Language | ES5-compatible JavaScript (`function` declarations, single-quoted strings, semicolons, no ES6+) |
| Framework | None |
| Database | None |
| Test runner | `node --test` (Node.js built-in, ≥18 required) |
| Lint | `node --check src/index.js` (syntax parse only) |
| Type check | `node --check src/index.js` (intentionally identical to lint — never change this) |
| Package manager | npm (no `package-lock.json` — zero deps, lockfile intentionally absent) |
| Dependencies | **Zero** — no `dependencies` or `devDependencies` in `package.json` |
| Knowledge graph | `graphify` (external tool, not a project dependency) |

---

## Repository Layout

    hello_ai_coading_agent/
    ├── src/
    │   └── index.js          # Entire runtime — 5 lines, one function, one call site
    ├── graphify-out/
    │   ├── graph.json         # Generated knowledge graph — never hand-edit
    │   ├── graph.html         # Generated visualisation — never hand-edit
    │   ├── GRAPH_REPORT.md    # Generated report — never hand-edit
    │   └── cache/             # Gitignored tool cache
    ├── MISSION.md             # Scope authority — immutable by automation
    ├── GUARDRAILS.md          # Process authority — immutable by automation
    ├── CLAUDE.md              # Style/convention authority — immutable by automation
    ├── AGENTS.md              # 4-line redirect shim → CLAUDE.md
    ├── ReadMe.md              # Human-facing docs (CLI surface only)
    ├── package.json           # npm metadata + 4 frozen scripts + zero deps
    ├── .gitignore             # 8 deliberate entries — each semantically intentional
    └── .graphifyignore        # graphify tool config — never hand-edit

**Data flow:** `npm start` → `node src/index.js` → `main()` → `console.log('Hello, AI Coding Agent!')` → stdout → implicit exit 0. No input consumed, no files read, no network touched, no environment variables read.

---

## Build, Test & Lint

    # Install dependencies (no-op — zero deps, exits immediately)
    npm install

    # Run the application — prints exactly: Hello, AI Coding Agent!
    npm start

    # Run all tests (node --test discovers src/*.test.js)
    npm test

    # Type check (syntax parse only via node --check)
    npm run type-check

    # Lint (identical to type-check by design — never change this)
    npm run lint

    # Full pre-PR validation (run before every PR)
    npm run lint && npm run type-check && npm test
    # Then manually: npm start → confirm exact stdout: Hello, AI Coding Agent!

**No build step. No `dist/`. No format command. No `lint:fix`.**

> ⚠️ **Silent-pass trap:** With zero `*.test.js` files, `npm test` exits 0 and produces
> no output. This is NOT a passing state — it is an empty test suite. Always verify that
> `npm test` stdout names ≥1 discovered test file. Exit code alone is never sufficient.

---

## Architecture & Key Patterns

### Core Architecture

1. **The governance layer is the product, not the runtime.** `src/index.js` is a
   deliberate placeholder. The four constitutional `.md` files are the deliverable.
   Never treat the governance files as documentation to be updated — they are
   authoritative constraints to be obeyed.

2. **One layer, no abstraction.** There are no controllers, services, repositories,
   adapters, or domain layers. The architecture is intentionally flat. Any agent that
   introduces layering or abstraction is acting outside scope.

3. **ES5 only — `node --check` will not catch violations.** The lint script is a
   syntax parser, not a style enforcer. ES6 constructs (`const`, `let`, arrow
   functions, template literals, destructuring, `class`, `async`/`await`) pass
   `node --check` without error but violate the frozen ES5 constraint. Manual review
   is required.

4. **Module system is an unopened one-way door.** No `require`, `import`, `export`,
   or `module.exports` exists in `src/index.js`. Adding any of these autonomously is
   an immediate auto-reject. The CommonJS vs ESM decision is reserved for a human.

5. **`src/index.js` canonical form is governance-enforced.** The file must be exactly:
   `function main() { ... }\n\nmain();\n` — one blank line between `}` and `main();`,
   trailing newline, no other content at module scope. Automated formatters that alter
   this produce invalid output.

### Coding Rules

See GUARDRAILS.md for the complete rule set. Key highlights for this stack:

1. **ES5 syntax only** — use `function` declarations, `var`, single-quoted strings,
   and semicolons. Never use `const`, `let`, arrow functions, template literals,
   destructuring, `class`, `async`/`await`, or any other ES6+ feature.
2. **Error handling** — always use `try/catch` + `process.exit(1)`. Silent catch
   blocks are prohibited. Errors must be surfaced; never swallowed.
3. **No module imports in `src/index.js`** — `require` and `import` are both
   prohibited until a human explicitly authorises the module system decision via an
   approved issue.
4. **Test files** — co-locate as `src/*.test.js`. Use `node:assert` and
   `node:child_process` only. Never add external test libraries. Always verify
   `npm test` names ≥1 discovered file in stdout — never rely on exit code alone.
5. **Synchronous only** — no Promises, no callbacks, no `async`/`await`. The entire
   codebase is synchronous by design.

### Key Conventions

1. **`function` declaration syntax:** Always use `function foo() {}`, never arrow
   functions (`() => {}`) or function expressions (`var foo = function() {}`).
2. **Single-quoted strings:** Always use `'single quotes'`, never `"double quotes"`
   or template literals.
3. **Semicolons everywhere:** Every statement ends with `;` — no exceptions.
4. **camelCase identifiers:** All function and variable names use camelCase (e.g.,
   `main`, `myHelper`). Never PascalCase for functions, never snake_case.
5. **Lowercase filenames:** All source files use lowercase (e.g., `index.js`,
   `index.test.js`). Never PascalCase or kebab-case filenames.
6. **All JS under `src/` only:** Never place `.js` files at the project root.
7. **Blank-line convention in `src/index.js`:** One blank line between the closing
   `}` of `main()` and the `main();` call site — this is governance-enforced.
8. **No module scope side effects:** Module scope contains exactly one function
   declaration and one call site. No conditional logic, I/O, or variable assignments
   at module scope.
9. **`lint` and `type-check` are intentionally identical:** Both run
   `node --check src/index.js`. Never make them differ — this is an auto-reject trigger.
10. **`package-lock.json` must not exist:** With zero deps it carries no information.
    Never generate or commit it. It arrives atomically with the first approved dependency.
11. **Node.js version pinning is atomic:** `.nvmrc` and `"engines"` must arrive in the
    same commit or neither may be added. Partial pinning is an auto-reject trigger.
12. **`graphify-out/` is generated output:** Treat it as `dist/`. Never hand-edit any
    file inside it.

---

## What NOT to Do

- Never modify `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md`
- Never commit secrets, API keys, tokens, or `.env` files to the repository
- Never add dependencies without explicit human authorisation via an approved issue
- Never declare a task done without running the full pre-PR validation sequence
- Never expand scope beyond what the task explicitly requests
- Never modify test files to make tests pass (fix the source code instead)
- Never introduce ES6+ syntax (`const`, `let`, arrow functions, template literals,
  destructuring, `class`, `async`/`await`) into `src/index.js`
- Never add `require`, `import`, `export`, or `module.exports` to `src/index.js`
  without explicit human authorisation
- Never add a `.nvmrc` without simultaneously adding `"engines"` to `package.json`
  (and vice versa)
- Never generate or commit `package-lock.json` before a first real dependency is approved
- Never remove any entry from `.gitignore` — all 8 entries are intentional
- Never hand-edit any file inside `graphify-out/` or `.graphifyignore`
- Never add Docker, CI/CD pipelines, Kubernetes, or any production infrastructure
- Never add TypeScript, Babel, Bun, Deno, or any transpiler/alternative runtime
- Never add external test libraries (Jest, Mocha, Chai, Vitest, etc.)
- Never declare "`npm test` passes" based solely on exit code 0 with no test files

---

## Important Files

| File / Directory | Purpose |
|-----------------|---------|
| `src/index.js` | Entire runtime — 5 lines. Sole source of the byte-stable stdout regression contract. Canonical form is governance-enforced. |
| `package.json` | npm metadata + 4 frozen scripts + zero deps. Scripts block is governance-protected; never alter the 4 scripts. |
| `MISSION.md` | Scope authority — wins all scope disputes. Lists explicit non-goals and out-of-scope exclusions. **Immutable by automation.** |
| `GUARDRAILS.md` | Process authority — wins all process disputes. Contains triage rules, ≥14 auto-reject triggers, and 9 quality gates. **Immutable by automation.** |
| `CLAUDE.md` | Style/convention authority — wins all code style disputes. This file. **Immutable by automation.** |
| `AGENTS.md` | 4-line compatibility shim that redirects all agents to `CLAUDE.md`. No independent authority. **Immutable by automation.** |
| `ReadMe.md` | Human-facing docs. Contains only observable CLI surface (`npm install`, `npm start`, `npm test`) and contributing steps. |
| `.gitignore` | 8 deliberate entries: `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`. Each is intentional — never remove any. |
| `.graphifyignore` | Configuration for the external `graphify` tool. Excludes generated/tool directories from knowledge graph extraction. Never hand-edit. |
| `graphify-out/` | Generated knowledge graph artefacts (`graph.json`, `graph.html`, `GRAPH_REPORT.md`). Tool-owned. Treat as `dist/`. Never hand-edit. |

---

## Development Notes

**`npm install` is a no-op.** With zero dependencies it exits 0 immediately and does
nothing. Do not treat its success as environment validation or dependency resolution.

**`node --test` silent-exit-0 trap.** With no `*.test.js` files present, `node --test`
exits 0 silently. This is an empty test suite, not a passing one. The quality gate
rule: `npm test` must exit 0 **and** name ≥1 discovered test file in stdout.

**Prescribed first test (`src/index.test.js`) when authorised:**
```js
var assert = require('node:assert');
var cp = require('node:child_process');

var result = cp.spawnSync('node', ['src/index.js']);
assert.strictEqual(result.stdout.toString(), 'Hello, AI Coding Agent!\n');
assert.strictEqual(result.status, 0);
```
Note: `require` is permissible in test files — test files are the natural forcing
function for the module system decision.

**`node --check` does not enforce ES5.** ES6 constructs silently pass the lint/type-check
commands. ES5 compliance requires manual inspection. An ESLint config with
`ecmaVersion: 5` would catch violations but adding ESLint is a dependency introduction
requiring explicit human authorisation.

**`__pycache__/` in `.gitignore` is intentional.** Python experimentation is explicitly
anticipated in `MISSION.md`. Removing it is an auto-reject trigger.

**The four governance files are constitutional documents, not living docs.** They must
not be touched "to stay in sync" after code changes. Their authority derives from their
immutability. Any automated PR that modifies them is unconditionally rejected.

**No environment variables are read.** `src/index.js` has no `process.env` references.
No `.env` file is needed or should be created.

**Node.js ≥18 is the practical floor.** `node --test` was introduced as experimental in
Node 18 and became stable in Node 20. The absence of `.nvmrc` / `"engines"` means this
is undocumented — keep it in mind when setting up local environments.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
