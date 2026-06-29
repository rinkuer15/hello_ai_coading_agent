# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal, zero-dependency Node.js scaffold purpose-built for experimenting with AI-assisted coding agents in a zero-blast-radius environment. The entire runtime is a single JavaScript file (`src/index.js`) — a `main()` function that prints `Hello, AI Coding Agent!` to stdout and exits with code 0. This deliberate simplicity is not a limitation; it is the design. The frozen, byte-stable stdout output serves as a measurable regression contract that requires no domain knowledge to verify, making it an ideal baseline for testing and calibrating agentic workflows.

The real product is the governance layer: four protected markdown files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that together encode a complete, conflict-resolving rule system governing how AI agents may interact with this repository. These documents define authority hierarchies, coding conventions, triage decision trees, and hard invariants — everything needed to safely introduce automated tooling into a codebase without chaos. The project runs entirely on Node.js built-ins with no transpiler, no bundler, and no external dependencies of any kind.

Hello AI Coding Agent is deployed and invoked as a CLI tool via `npm start`. It targets researchers, platform engineers, and tooling teams who need a reproducible, low-risk sandbox to test agent behaviours, governance models, and automated PR pipelines — without risking real application code or causing real-world harm.

## Who It's For

- **AI tooling researchers and DevEx engineers** who need a controlled, reproducible sandbox to benchmark AI coding agents (Claude, Copilot, Codex, Cursor, or custom agents) against governance rules, measuring compliance, correctness, and escalation behaviour across different agentic workflows.
- **Platform architects and AI safety red-teamers** who need a zero-blast-radius environment to calibrate how AI agents respond to scope constraints, auto-reject triggers, and irreversible one-way-door decisions — before deploying similar governance patterns to production repositories.
- **Not for application developers or end users** — this project delivers no application features, solves no business domain problem, and is not a starter kit or template for production software. Anyone expecting a general-purpose project scaffold will find nothing here of use.

## Core Capabilities (In Scope)

**Runtime Contract**
- Executes `src/index.js` via `npm start`, printing exactly `Hello, AI Coding Agent!\n` to stdout
- Exits with code 0 on every successful run — no branches, no conditionals, no environment dependencies
- Byte-stable stdout output is the sole regression contract for all test and validation pipelines

**Governance Authority Hierarchy**
- `MISSION.md` as the scope authority — wins all disputes about what to build
- `GUARDRAILS.md` as the process authority — wins all disputes about how the process runs
- `CLAUDE.md` as the style and convention authority — wins all disputes about how code is written
- `AGENTS.md` as a compatibility shim — redirects tools that discover agent instructions via the `AGENTS.md` filename convention; holds no independent authority

**Automated Quality Gates**
- Syntax validation via `npm run lint` (`node --check src/index.js` — parse-only, not ESLint)
- Identical type-check gate via `npm run type-check` (intentionally identical to lint — documented scaffolding, not a bug)
- Test execution via `npm test` (`node --test` built-in runner) with co-located `src/*.test.js` discovery

**Coding Convention Enforcement**
- ES5-compatible JavaScript only: `function` declarations, no arrow functions, no `const`/`let`, no destructuring, no template literals, no spread
- Single-quoted strings, semicolons on every statement, `camelCase` identifiers, lowercase filenames
- All source files under `src/` — no `.js` files at project root
- Exactly one blank line between the closing `}` of `main()` and the `main();` call site

**Test Scaffolding (Prescribed, Not Yet Instantiated)**
- Co-located test files at `src/*.test.js` using `node:assert` built-in only — no external assertion libraries
- First required test: a contract test at `src/index.test.js` that spawns `node src/index.js` as a child process, captures stdout, and asserts exact bytes `Hello, AI Coding Agent!\n`
- Validation rule: `npm test` must exit 0 AND its stdout must name at least one discovered test file — silent exit 0 is not evidence of passing tests

**Knowledge Graph Integration**
- `graphify-out/` directory holds generated knowledge graph artefacts (graph.json, graph.html, GRAPH_REPORT.md)
- `.graphifyignore` controls what paths are excluded from extraction — treated as tool configuration, never hand-edited

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Runtime Complexity**
- Adding application logic, business domain features, or any branching behaviour to `src/index.js` or any source file
- Introducing environment variable reads, file I/O beyond stdout, network calls, stdin consumption, or database access
- Adding a build step, transpiler, bundler, or `dist/` output pipeline of any kind

**Dependency Introduction**
- Adding any `dependencies` or `devDependencies` to `package.json` without explicit human authorisation
- Generating or committing `package-lock.json` before the first approved real dependency (must arrive atomically in the same commit)
- Installing test frameworks (Jest, Vitest, Mocha), assertion libraries (Chai, Expect), linters (ESLint), or formatters (Prettier) — Node.js built-ins cover the entire permitted surface

**Module System Changes**
- Introducing `require(...)`, `import ... from ...`, `module.exports`, or `export` anywhere in the codebase — this is an uncommitted one-way door affecting the entire toolchain
- Autonomously choosing between CommonJS and ESM — this decision requires explicit human approval and issue authorisation

**Language Modernisation**
- Upgrading `src/index.js` syntax from ES5 to ES6+ features (arrow functions, `const`/`let`, destructuring, template literals, spread, optional chaining, `async`/`await`, `class`) without a human-approved issue explicitly authorising it
- Pinning a Node.js version via `.nvmrc` or `"engines"` in `package.json` unless both files arrive in the same atomic commit

**Governance File Modification**
- Any automated PR, commit, or change that touches `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` — including "minor" clarifications, cross-reference updates, formatting fixes, or documentation syncs

**Production Application Infrastructure**
- CI/CD pipelines, containerisation (Docker, Kubernetes), deployment configuration, environment staging, monitoring, logging infrastructure, secret management, or any production operations tooling

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **The stdout contract is byte-stable and frozen.** `Hello, AI Coding Agent!\n` — exact string, exact capitalisation, exact punctuation, exact trailing newline — cannot change as a side effect of any refactor, formatting pass, or tooling change. Only a human-approved issue explicitly authorising a stdout change may modify it.
2. **Zero dependencies is the baseline until explicitly broken by human decision.** No `dependencies` or `devDependencies` may be added without human authorisation. `package-lock.json` must not be generated or committed while the dependency list is empty; it must arrive atomically with the first approved real dependency.
3. **The module system is an uncommitted one-way door.** No `require` and no `import` may be introduced autonomously. Any agent that adds either triggers an immediate auto-reject — this is a permanent, toolchain-affecting, irreversible decision reserved for human review.
4. **Governance files are immutable by automated workflows.** `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human PR review. Any automated PR touching any of these files is immediately and unconditionally rejected with no fix attempt.
5. **`npm test` exiting 0 is not evidence of passing tests.** With zero `*.test.js` files, `node --test` exits 0 silently and discovers nothing. Pipelines must verify that stdout names at least one discovered test file — exit code alone is never sufficient proof of test passage.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Writing the first contract test at `src/index.test.js` that spawns `node src/index.js` as a child process and asserts exact stdout bytes `Hello, AI Coding Agent!\n`
- Adding additional co-located test files under `src/` using `node:assert` built-in only — no external frameworks
- Updating `README.md` if and only if the observable CLI surface changes (stdout string, exit code, or npm script names) — no other README edits are in scope
- Pinning a Node.js version by adding `.nvmrc` and `"engines"` to `package.json` in a single atomic commit, once explicitly authorised by a human-approved issue
- Adding Python experimentation files (Python is explicitly anticipated — `__pycache__/` in `.gitignore` is deliberate scaffolding) once explicitly scoped via a human issue
- Expanding `.gitignore` or `.graphifyignore` when new tool outputs or generated artefacts are introduced
- Introducing the first real dependency when explicitly authorised by a human-approved issue, provided `package-lock.json` arrives in the same atomic commit

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: `npm run type-check` exits 0 with zero errors (`node --check src/index.js`)
- Lint: `npm run lint` exits 0 with zero warnings (intentionally identical to type-check — these two commands must never diverge)
- No build step required — there is no transpiler, bundler, or `dist/` pipeline
- All tests pass: `npm test` exits 0 AND stdout explicitly names at least one discovered test file (silent exit 0 is not a passing state)

**Gate 2 — Feature is discoverable without docs**
- Any new user-facing behaviour must be exercisable by a first-time user via `npm start`, `npm test`, or a documented npm script alone
- No undocumented CLI flags, hidden environment variables, or "you need to know about this" prerequisites
- `README.md` must accurately reflect the current observable CLI surface at all times

**Gate 3 — End-to-end regression**
Run the full pre-PR validation sequence:
```bash
npm run lint && npm run type-check && npm test
```
Then manually verify:
1. `npm start` prints exactly `Hello, AI Coding Agent!` followed by a newline and exits with code 0
2. `npm test` stdout explicitly names at least one test file — not just a silent exit 0
3. No new `.js` files exist outside `src/`
4. No `require` or `import` has been introduced anywhere in the codebase
5. Governance files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) are byte-for-byte unchanged from their pre-PR state

## Non-Goals

- Not a production application — delivers no business domain features and solves no end-user problem directly
- Not a general-purpose Node.js starter kit, project template, or boilerplate for real software
- Not a multi-file, multi-module, or multi-layer architecture — the entire runtime is intentionally a single, minimal source file
- Not a SaaS product, web application, REST API, or any kind of server-side service
- Not a library or package intended for publication to npm or consumption by other projects as a dependency
- Not a demonstration of modern JavaScript best practices — ES5 compatibility is a deliberate, frozen constraint, not a gap to fill
- Not a testing framework or CI/CD pipeline product — this project is the subject of such pipelines, not their implementation
- Not a documentation site, knowledge base, or content management system — governance files are machine-readable rule sets, not human-facing product documentation

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
