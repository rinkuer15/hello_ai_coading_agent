# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal Node.js scaffold designed as a controlled, clean
starting point for AI-assisted coding agent experimentation. At runtime, it does exactly
one thing: invoke a `main()` function that prints `'Hello, AI Coding Agent!'` to stdout.
The deliberate emptiness of the codebase is the feature — it gives AI agents a blank
canvas to build on without fighting pre-existing complexity, patterns, or dependencies.

The project runs as a CLI tool invoked directly with `node src/index.js` (or `npm start`).
There is no HTTP layer, no database, no framework, and no build step. The technology stack
is plain JavaScript running on Node.js with zero runtime or development dependencies. Tests
are executed via the Node.js built-in `node --test` runner.

The true substance of the project lives in its governance files (MISSION.md, GUARDRAILS.md,
AGENTS.md, CLAUDE.md), which define the rules under which AI agents may extend the codebase.
The code is the experiment surface; the governance files are the laboratory controls.

## Who It's For

- **AI/ML researchers and developers** who want a clean, minimal, well-governed repository
  to benchmark, test, or observe the behaviour of AI coding agents without noise from
  existing application complexity.
- **AI agent tooling authors** who need a reproducible, zero-dependency target project
  to validate agent workflows, automated PR pipelines, or code generation systems.
- **Not for end users seeking a production application.** This project is not a deployable
  product, a reusable library, or a feature-complete tool. Anyone expecting runtime
  business value from the application output is in the wrong repository.

## Core Capabilities (In Scope)

**Entry Point & Orchestration**
- A single `main()` function in `src/index.js` that serves as the top-level orchestrator
  for all runtime logic, current and future.
- A guaranteed safe starting state: the program runs, emits output, and exits 0 — agents
  always have a known-good baseline to work from.

**Build, Test & Lint Infrastructure**
- `npm start` — runs the application directly via `node src/index.js`, no compilation required.
- `npm test` — discovers and runs `*.test.js` / `*.spec.js` files via `node --test`.
- `npm run lint` and `npm run type-check` — syntax validation via `node --check src/index.js`.
- A pre-PR validation sequence: `npm run lint && npm test`.

**Governance & Agent Guardrails**
- Four protected governance files (MISSION.md, GUARDRAILS.md, AGENTS.md, CLAUDE.md) that
  define immutable rules for automated workflows.
- Explicit auto-reject triggers documented in GUARDRAILS.md to prevent scope creep, module
  system inconsistency, and top-level side effects.
- Clear architectural decision points left open (module system, Node.js version pinning)
  so agents must make deliberate, documented choices when crossing those thresholds.

**Extensibility Surface**
- A `src/` directory as the designated home for all future source files.
- A gitignored `dist/` path reserved for any future build output.
- A `.gitignore` that pre-emptively excludes `node_modules/`, `.env`, `*.log`, and
  `__pycache__/` so common agent mistakes don't produce unintended commits.

**Experiment Repeatability**
- Zero runtime and development dependencies — `npm install` is a no-op, ensuring the
  project state is fully reproducible from the repository alone.
- No pinned Node.js version, leaving the runtime environment variable and explicit,
  with rules requiring both `.nvmrc` and `"engines"` to be set together if pinning occurs.

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Production deployment and hosting**
- Adding Docker, container orchestration, CI/CD deployment pipelines, or hosting configuration.
- Converting this project into a web application, API server, or any HTTP-serving component.

**Framework and dependency bloat**
- Adding frontend frameworks (React, Vue, Angular, etc.) or backend frameworks (Express,
  Fastify, NestJS, etc.) without an explicit, human-approved architectural decision.
- Introducing a package manager lock file (`package-lock.json`) before the first real
  dependency is added.

**Authentication, authorisation, and user management**
- Adding user accounts, login flows, session management, or access control systems.
  This project has no users in the runtime sense.

**Data persistence**
- Adding databases, file-based storage, cloud storage integrations, or caching layers
  as foundational infrastructure. Any persistence introduced must be scoped to a specific,
  issue-linked feature, not added speculatively.

**Governance file modification**
- Any automated workflow change to MISSION.md, GUARDRAILS.md, AGENTS.md, or CLAUDE.md.
  These files are human-review-only.

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **All runtime logic must flow through `main()`.** No business logic or side-effecting
   code may execute at the top level of any module outside of the single `main()` call.
   This prevents accidental side effects and keeps the entry point predictable.
2. **No secrets or credentials may be committed to source.** `.env` is gitignored and must
   stay that way. API keys, tokens, passwords, and connection strings belong in environment
   variables only, never hardcoded in `.js` files or any committed file.
3. **No silent failures.** Any error-prone code (I/O, network, parsing, async operations)
   must be wrapped in `try/catch` and surface errors explicitly via `console.error` and
   `process.exit` with a non-zero code. Swallowing exceptions is prohibited.
4. **Governance files are immutable by automated workflows.** MISSION.md, GUARDRAILS.md,
   AGENTS.md, and CLAUDE.md can only be changed via human PR review. Any automated PR
   touching these files is auto-rejected without a fix attempt.
5. **The `package.json` scripts block is protected.** The existing script names (`start`,
   `test`, `lint`, `type-check`) cannot be renamed, removed, or have their current
   semantics changed by automated workflows. New scripts may be added; existing ones are
   frozen.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding application logic inside `main()` or in new `src/` modules called from `main()`.
- Introducing a module system (ESM or CJS) for the first time, provided the choice is
  consistent across all files and documented in AGENTS.md and CLAUDE.md.
- Adding `src/*.test.js` test files to cover any new or existing logic.
- Adding a first runtime or development dependency, provided `package-lock.json` is
  committed simultaneously and the dependency is justified in the PR description.
- Adding an `.nvmrc` and `"engines"` field to `package.json` together to pin the
  Node.js version, as a human-approved decision.
- Adding JSDoc comments to non-trivial functions introduced by agents.
- Adding a `.env.example` file (committed) alongside a gitignored `.env` if environment
  variables are introduced.
- Improving or expanding `ReadMe.md` to reflect new capabilities added by agents.

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Lint: `npm run lint` (`node --check src/index.js`) exits 0 — no syntax errors.
- Type-check: `npm run type-check` exits 0.
- All test files discovered by `node --test` pass — exit code 0.
- At least one `*.test.js` file must exist and be discovered if new logic was added.
  A green `npm test` with zero test files does NOT satisfy this gate.

**Gate 2 — Feature is discoverable without docs**
- Any new behaviour added to the CLI must be observable by running `npm start` or
  `npm test` without reading external documentation.
- No undocumented flags, hidden environment variables, or "you need to know about this"
  preconditions may be introduced without corresponding `--help` output or README update.

**Gate 3 — End-to-end regression**
Run the full validation sequence and verify the application still produces expected output:
```bash
npm run lint && npm test && npm start
```
`npm start` must complete with exit code 0 and emit at least one line to stdout.
`npm test` must discover and pass all test files (confirm file count > 0 if logic was added).
`npm run lint` must exit 0 with no errors reported.

## Non-Goals

- Not a production application or deployable service.
- Not a reusable npm library intended for publication to a package registry.
- Not a multi-tenant or user-facing SaaS platform.
- Not a general-purpose CLI framework or scaffolding tool for other projects.
- Not a demonstration of any specific architectural pattern, design system, or framework.
- Not a performance-optimised or production-hardened codebase.
- Not a teaching resource for JavaScript fundamentals — the governance layer is the
  learning surface, not the runtime code.
- Not a permanent home for any specific feature; features added by agents are experiments,
  not product commitments.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
