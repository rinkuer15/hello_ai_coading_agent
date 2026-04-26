# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal Node.js CLI scaffold whose sole purpose is to provide a
controlled, zero-complexity baseline for experimenting with AI-assisted coding agents. The
entire runtime behaviour today is a single `console.log('Hello, AI Coding Agent!')` call
wrapped in a `main()` function inside `src/index.js`. There are no dependencies, no build
step, no database, and no HTTP layer — the project runs directly with `node src/index.js`.

The project's value is not in what it does at runtime; it is in what it represents as an
experimental substrate. It gives AI coding agents a known-good, minimal repository — with a
fully documented tech stack, coding conventions, and governance layer — so that agents can
extend it iteratively under strict, observable rules. Every addition to this repo is, by
definition, a net-new capability introduced from scratch.

The deployment model is a local CLI tool. It is not hosted, not packaged for distribution,
and not deployed to any cloud environment. Running it means executing `node src/index.js`
in a terminal. The governance files (MISSION.md, GUARDRAILS.md, AGENTS.md, CLAUDE.md) are
as important as the source code — they are the rules of the experiment.

## Who It's For

- **AI coding agent developers and researchers:** People running automated coding agents
  (e.g., GitHub Copilot, Claude Code, or custom LLM pipelines) who need a safe, observable
  target repository where agent behaviour can be studied, validated, and compared without
  risk to production systems.
- **Platform engineers evaluating AI code tooling:** Engineers who want to benchmark how
  well a given AI agent follows documented conventions, respects governance constraints, and
  produces incrementally correct changes to a real (if tiny) Node.js codebase.
- **Not for end users seeking a finished product:** This is NOT a tool anyone would install
  to solve a real-world problem. It is explicitly not for users who want a CLI utility,
  application framework, or any deliverable beyond "a place to run agent experiments".

## Core Capabilities (In Scope)

**Minimal CLI Runtime**
- A single `main()` function in `src/index.js` that serves as the top-level orchestrator
- A working `npm start` invocation that runs `node src/index.js` with exit code 0
- Stdout output confirming the process ran (`Hello, AI Coding Agent!`)

**Test Infrastructure**
- `npm test` discovery via Node.js built-in `node --test` runner
- Support for co-located test files following the `src/*.test.js` convention
- Ability to add unit tests for any new logic introduced into `src/`

**Syntax Validation and Lint**
- `npm run lint` and `npm run type-check` both execute `node --check src/index.js`
- A consistently green syntax-check baseline that all future changes must preserve
- A defined pre-PR validation sequence: `npm run lint && npm test`

**Governance and Agent Guardrails**
- Four immutable governance files (MISSION.md, GUARDRAILS.md, AGENTS.md, CLAUDE.md)
  that define scope, process rules, coding conventions, and auto-reject triggers
- Explicit rules for module system adoption, dependency introduction, and error handling
- Documented conventions (camelCase, lowercase filenames, single-quoted strings,
  no top-level side-effects) that agents must follow when extending the codebase

**Incremental Extensibility**
- A deliberately open module system (neither CJS nor ESM is established) so the first
  agent to introduce a cross-file dependency sets the precedent intentionally
- `dist/` gitignored and reserved for any future build step output
- `.gitignore` includes `__pycache__/` to allow Python experimentation as a first-class
  addition should future agents introduce Python files

**Dependency Management Baseline**
- Zero runtime and development dependencies — `npm install` is a no-op today
- `package-lock.json` intentionally absent until the first real dependency is added
- A clear protocol: add dependency → `npm install --save` → commit `package-lock.json`

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Platform expansion and hosting**
- Adding an HTTP server, REST API, GraphQL endpoint, or WebSocket layer
- Deploying the project to any cloud provider, container platform, or managed service
- Introducing environment-specific configuration for staging, production, or CI targets

**Framework and runtime lock-in**
- Adding a web framework (Express, Fastify, Hapi, Koa, etc.) without an explicit
  architectural decision recorded in AGENTS.md or CLAUDE.md
- Pinning a specific Node.js version without simultaneously adding both `.nvmrc` and
  an `engines` field in `package.json`
- Introducing TypeScript, Babel, or any transpilation toolchain

**Monetization and distribution**
- Publishing the package to npm or any package registry
- Adding a `bin` field to `package.json` for global CLI installation
- Introducing licensing, pricing tiers, or usage telemetry

**Governance file modification by automation**
- Any automated PR that modifies MISSION.md, GUARDRAILS.md, AGENTS.md, or CLAUDE.md
- Any change to the `package.json` scripts block that renames, removes, or rewrites the
  existing `start`, `test`, `lint`, or `type-check` script commands

**Scope-creep additions**
- "While I'm here" changes to files not causally related to the linked issue
- Adding a `package-lock.json` before the first real dependency is introduced
- Creating source or build output files outside of `src/` and `dist/` respectively

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **`main()` is the sole valid orchestration point.** All business logic must be invoked
   from `main()`. No logic may execute at the module top level. The only permitted
   top-level statements are `function` declarations and the single `main()` call at the
   bottom of `src/index.js`. This ensures traceability and prevents hidden side-effects.
2. **The module system must be chosen once and applied consistently.** No `require` or
   `import` exists today. The first agent to introduce one commits the entire repo to that
   convention. Mixing ESM and CJS in any form is an immediate auto-reject trigger.
3. **No secrets or credentials may ever be committed to source.** `.env` is gitignored and
   must never be tracked. No API keys, tokens, passwords, or environment-specific values
   may appear in any committed file — not even in comments or test fixtures.
4. **Governance files are immutable by automated workflows.** MISSION.md, GUARDRAILS.md,
   AGENTS.md, and CLAUDE.md can only be changed via human PR review. Any automated PR
   touching these files is rejected immediately with no fix loop attempted.
5. **`package-lock.json` must not exist until the first real dependency is added.**
   Committing a lock file before any dependency exists is an explicit auto-reject trigger.
   Once the first dependency is added, the lock file must be committed in the same PR.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding new functions to `src/index.js` that are called from `main()`, provided they
  include JSDoc annotations if non-trivial and are covered by `src/*.test.js` test files
- Introducing the first cross-file module (under `src/`) once the CJS vs ESM choice is
  made deliberately and documented in AGENTS.md and CLAUDE.md
- Adding the first `devDependency` (e.g., a test assertion library) when `node --test`
  alone proves insufficient, provided `package-lock.json` is committed in the same PR
- Adding a `.nvmrc` and `engines` field to `package.json` simultaneously when a
  version-sensitive Node.js API or dependency makes a minimum version necessary
- Adding Python source files under `src/` (or a `src/py/` sub-directory) with their own
  lint and test commands documented and added to `package.json` scripts
- Expanding `npm run lint` to invoke a real linter (e.g., ESLint) in addition to
  `node --check`, provided the existing script name is preserved and the change is
  recorded as an explicit architectural decision
- Adding a build step that outputs to `dist/` (already gitignored) if transpilation or
  bundling becomes necessary

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: `npm run type-check` exits 0 (zero syntax errors)
- Lint: `npm run lint` exits 0 (zero syntax errors)
- Format: no formatter is configured today; code must manually follow the conventions
  in CLAUDE.md (camelCase, lowercase filenames, single-quoted strings)
- Build succeeds: `npm start` runs without error and exits 0
- All unit tests pass: `npm test` exits 0 AND at least one `*.test.js` file was
  discovered and executed (a green run with zero test files does NOT count)

**Gate 2 — Feature is discoverable without docs**
- Any new user-facing behaviour must be observable by running `npm start` or `npm test`
  without reading external documentation
- No undocumented flags, hidden environment variables, or "you need to know about this"
  entry points; if a new parameter or mode is added, it must surface in `--help` output
  or equivalent stdout guidance
- New source files must be placed under `src/` and follow established naming conventions
  so future agents can locate them without a directory listing

**Gate 3 — End-to-end regression**
Run the full validation sequence and confirm the expected output:

```bash
npm run lint && npm test && npm start
```

Expected: lint exits 0, all discovered `*.test.js` files pass, and `npm start` prints
`Hello, AI Coding Agent!` to stdout with exit code 0. Any deviation from this baseline
is a regression and must be fixed before the PR is considered done.

## Non-Goals

- Not a web application, API server, or any networked service
- Not a reusable npm library intended for installation by third parties
- Not a production-grade CLI tool solving a real-world user problem
- Not a demonstration of advanced Node.js patterns (async/await, streams, workers)
- Not a multi-language polyglot project by default — Python is allowed but only as an
  explicit, deliberate addition, not assumed
- Not a framework or boilerplate for general Node.js projects — the scaffold is purpose-
  built for AI agent experimentation and should not be repurposed as a generic starter
- Not a benchmarking or observability platform — agent behaviour is observed through Git
  history and PR reviews, not through instrumented metrics or dashboards
- Not a long-lived product with a roadmap — it exists as an experiment surface; features
  are added only when an agent task explicitly requires them

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
