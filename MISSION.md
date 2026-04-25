# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal Node.js scaffold designed as a launchpad for AI-assisted software development experimentation. It provides the smallest possible working project structure — a single entry-point file (`src/index.js`) with a `main()` function — so that AI coding agents have a clean, unambiguous surface to write code against without fighting pre-existing complexity or conventions.

The project runs directly with Node.js (no build step, no transpilation, no bundler). It is a CLI-style program: `npm start` executes `node src/index.js`. Tests are discovered and run via the Node.js built-in test runner (`node --test`). There are zero runtime dependencies, which means every dependency added by an AI agent is explicit and intentional.

The problem it solves is bootstrapping: when you want to test what an AI coding agent will do with a greenfield codebase, you need a repo that is real enough to have conventions but minimal enough to not bias the agent. This scaffold provides exactly that — a real npm project with real scripts and a real Git history, but no domain logic to get in the way.

## Who It's For

- **AI/LLM researchers and developers**: People who are evaluating, benchmarking, or developing AI coding agents and need a controlled, minimal target repository to observe agent behaviour against.
- **Developers onboarding to AI-assisted workflows**: Engineers learning to integrate AI coding tools (GitHub Copilot, Claude, Codex, etc.) into their daily work, who want a safe sandbox with no production risk.
- **Not for end users building production software**: This scaffold is not a foundation for shipping a real application. It has no authentication, no data layer, no HTTP server, and no production-readiness features — and intentionally so.

## Core Capabilities (In Scope)

**Entry-Point Execution**
- A `main()` function in `src/index.js` that serves as the single top-level orchestrator for all runtime logic
- Direct execution via `npm start` (`node src/index.js`) with no compilation step required

**Testing Infrastructure**
- Test discovery via Node.js built-in test runner (`node --test`), matching `**/*.test.js`, `**/*.spec.js`, and files under `test/`
- Zero-dependency test execution — no Jest, Mocha, or other framework required to run tests

**Static Validation**
- Syntax checking via `npm run lint` and `npm run type-check` (`node --check src/index.js`)
- A consistently green lint gate that AI agents must not break

**Scaffolding Conventions**
- Established file layout: all source files under `src/`, build artefacts (if any) under `dist/`
- camelCase function/variable naming and lowercase filenames as baseline style conventions
- `.gitignore` pre-configured to exclude `node_modules/`, `dist/`, `.env`, and common OS/tooling noise

**Dependency Management**
- npm as the package manager with a clean baseline (`package.json` with no `dependencies` or `devDependencies`)
- A ready-to-use `package.json` with defined npm scripts (`start`, `test`, `lint`, `type-check`)

**Git Workflow**
- A `main` branch as the integration target
- Standard fork-and-pull-request contributing model documented in the README

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Production Application Features**
- Adding an HTTP server, REST API, or WebSocket layer to this scaffold
- Implementing authentication, session management, or user accounts
- Adding a database, ORM, or any form of data persistence

**Platform and Runtime Expansion**
- Converting the project to a multi-language monorepo (e.g., adding a Python or Go service alongside the Node.js code)
- Adding Docker, Kubernetes, or container-orchestration configuration
- Publishing this package to npm or any package registry

**Toolchain Complexity**
- Adding a bundler (Webpack, Rollup, Vite, esbuild) when no build step is needed
- Adding TypeScript compilation unless the entire project is being migrated deliberately
- Adding a CI/CD pipeline that gates on metrics beyond the defined three quality gates

**Monetization and Distribution**
- Adding licensing enforcement, feature flags, or paywalled functionality
- Creating a hosted/SaaS version of this scaffold

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **Zero secrets in source.** No API keys, tokens, passwords, or credentials may appear in any committed file. `.env` is gitignored for a reason; environment configuration lives there and only there.
2. **`npm run lint` must always pass.** Even though `node --check` is only a syntax validator today, the lint gate must remain green after every change. An agent that breaks the lint script has broken the baseline contract.
3. **The `main()` entry-point pattern is inviolable.** All runtime logic must be routed through or called from `main()` in `src/index.js`. Top-level side-effecting code outside of the `main()` call is forbidden.
4. **Governance files are immutable by automated workflows.** `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human PR review. Automated agents must not open pull requests that modify these files.
5. **No lock file without a dependency.** `package-lock.json` must not be committed until at least one real dependency exists. Committing a lock file for a zero-dependency project creates noise with no reproducibility benefit.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding real unit and integration test files under `src/` or `test/` using the built-in test runner
- Expanding `src/index.js` with meaningful domain logic routed through `main()`
- Adding new source modules under `src/` using either CJS (`require`) or ESM (`import`) — but only one module system per project
- Pinning a Node.js version via `.nvmrc` or an `engines` field in `package.json` for reproducibility
- Adding ESLint and/or Prettier once a real linting strategy is needed, replacing the `node --check` placeholder
- Adding a `package-lock.json` once the first real dependency is introduced
- Expanding the README with usage examples as the project gains real features

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: zero errors (`npm run type-check` exits 0)
- Lint: zero warnings (`npm run lint` exits 0)
- Format: consistent with camelCase functions, lowercase filenames, and no top-level side effects outside `main()`
- Build succeeds: not applicable (no build step); `node src/index.js` must execute without throwing
- All unit and integration tests pass (`npm test` exits 0 with no failing assertions)

**Gate 2 — Feature is discoverable without docs**
- Any new behaviour added to `src/index.js` or new modules must be self-evident from reading the source
- No undocumented parameters, hidden environment variables, or "you need to know about this" invocation patterns
- If a new npm script is added, it must be described in the README

**Gate 3 — End-to-end regression**
Run the canonical happy-path sequence and verify each step exits cleanly:
```
npm install          # exits 0, no unexpected packages installed
npm run lint         # exits 0, no syntax errors
npm run type-check   # exits 0, no parse failures
npm test             # exits 0, no failing test cases
npm start            # exits 0, produces expected console output
```
Every change must leave all five commands green before the pull request is merged.

## Non-Goals

- Not a production-ready application framework or starter kit for shipping real software
- Not a multi-language polyglot monorepo; it is a Node.js project first and foremost
- Not a benchmarking harness or evaluation platform for comparing AI models — it is a target, not a harness
- Not a tutorial or step-by-step coding course; documentation is intentionally minimal
- Not a general-purpose CLI tool; `npm start` is an experiment runner, not a user-facing product
- Not a SaaS or hosted service; there is no server, no deployment, and no infrastructure
- Not a demonstration of best practices for large-scale Node.js architecture — simplicity is the point
- Not a permanent home for any feature that belongs in a real application; code added here is experimental by definition

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
