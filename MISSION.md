# Mission

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.

---

## What hello-ai-coding-agent Is

**hello-ai-coding-agent** is a minimal Node.js scaffold designed as a clean, zero-dependency
starting point for experimenting with AI-assisted coding agents. Its entire runtime behavior is
intentionally trivial — a single `main()` function that prints `"Hello, AI Coding Agent!"` to
stdout — so that AI agents can focus on extending, transforming, or replacing it without fighting
pre-existing complexity.

The project exists to validate AI agent workflows: onboarding flows, code-generation loops,
automated PR pipelines, and governance tooling. Because the codebase begins as a five-line
JavaScript file with no frameworks, no build step, and no dependencies, every scaffold decision
made by an AI agent is immediately visible and attributable.

The repository is intentionally kept in a "day zero" state. Its value lies not in what it does
today but in what it makes possible: a safe, reproducible environment where AI coding agents can
be tested against real Git history, real npm scripts, and real CI constraints without risking any
production system.

---

## Who It's For

- **AI agent developers** building or evaluating autonomous coding agents (e.g. dark-factory
  workflows, GitHub Copilot agents, code-gen loops).
- **Platform engineers** who need a throwaway target repository for testing automated PR
  pipelines, branch-protection rules, or CI integrations.
- **Researchers** studying how AI agents handle greenfield projects, dependency introduction, or
  incremental feature growth from a known baseline.
- **Educators and workshop facilitators** who want a simple, fully-understandable Node.js project
  that participants can modify without accidental side-effects.

---

## Core Capabilities (In Scope)

### Runnable Entry Point
- `npm start` executes `node src/index.js`, which calls `main()` and exits 0.
- The `main()` wrapper pattern is the established convention for all executable logic.

### Syntax Validation
- `npm run lint` and `npm run type-check` both run `node --check src/index.js` to validate
  JavaScript syntax before any commit or CI run.

### Test Harness (Scaffolded)
- `npm test` invokes the Node.js built-in test runner (`node --test`).
- No test files exist yet; this is intentional. The harness is ready for test files matching
  `*.test.js` or a `test/` directory layout per Node's conventions.

### Zero-Dependency Baseline
- `package.json` declares zero `dependencies` and zero `devDependencies`.
- This guarantees a clean, auditable dependency graph as the starting state.

---

## Out of Scope (Factory Must Never Build)

The following changes are **forbidden** from automated factory issues or AI-driven PRs without
explicit human approval in a new PR that also updates this file:

- **Framework introduction** — Do not add Express, Fastify, Koa, or any HTTP/web framework unless
  the project mission is explicitly updated to describe a web service.
- **TypeScript migration** — Do not add `tsconfig.json`, rename `.js` files to `.ts`, or install
  `typescript` / `ts-node` without a deliberate human decision and updated tooling docs.
- **Database integration** — No ORM, query builder, or database driver (pg, mysql2, mongoose,
  prisma, etc.) may be added speculatively.
- **Authentication or user management** — No auth libraries, session handling, or user data
  storage without a clear product requirement.
- **Monetization or telemetry** — No analytics SDKs, error-tracking services (e.g. Sentry), or
  payment integrations.
- **CI provider lock-in** — Do not commit a full CI pipeline for a specific provider
  (GitHub Actions, CircleCI, etc.) without human review.
- **Python or polyglot expansion** — Despite `.gitignore` including `__pycache__/`, this is a
  Node.js project. Do not add Python source files or mixed-language tooling without updating the
  mission.
- **Global npm scripts with side-effects** — Do not add `postinstall` or `prepare` scripts that
  execute arbitrary commands on `npm install`.

---

## Hard Invariants (Not Tunable by Factory Issues)

1. **No secrets in source code.** API keys, tokens, passwords, and credentials must never be
   committed. Use environment variables and document them in README; never hard-code them.
2. **All PRs must pass CI** (lint + syntax check + test runner) before merge. A PR that breaks
   `npm run lint`, `npm run type-check`, or `npm test` must not be merged.
3. **`src/index.js` must always be syntactically valid JavaScript.** The `node --check` gate must
   always pass on the default branch.
4. **`npm start` must exit 0** on the default branch at all times. The entry point must never be
   left in a broken state between commits.
5. **MIT license must be preserved.** All code, dependencies, and contributions must be compatible
   with the MIT license declared in `package.json`.
6. **No breaking changes to `npm start` behaviour without a major version bump** in
   `package.json`.
7. **No `node_modules/` in version control.** The `.gitignore` exclusion is non-negotiable.
8. **Minimum Node.js version is effectively ≥ 18** due to `node --test`. Do not introduce APIs
   or syntax that require Node < 18 without pinning a version in `package.json#engines`.
9. **The `main()` wrapper pattern must be preserved** in `src/index.js`. Top-level side-effect
   code outside a named function is not permitted.
10. **This file (`MISSION.md`) is read-only to automated workflows.** Any modification requires
    a human-authored PR with explicit review.

---

## Allowed Evolutions

The following are explicitly in scope for future factory or AI-agent work:

- Adding test files (`*.test.js` or `test/*.js`) using the Node.js built-in test runner.
- Extending `main()` or adding additional modules under `src/` in plain JavaScript.
- Installing well-justified `devDependencies` (e.g. a linter like ESLint, a formatter like
  Prettier) with accompanying config files and updated npm scripts.
- Adding a `.nvmrc` or `engines` field to `package.json` to pin the Node.js version.
- Adding a `CONTRIBUTING.md` or expanding `README.md` with setup and workflow documentation.
- Adding example AI-agent configuration files (e.g. `.github/copilot-instructions.md`,
  dark-factory `ISSUES/` templates) that support the project's primary purpose.
- Introducing a `dist/` output directory and a build/bundle step if a compiled artifact becomes
  necessary, provided the source-runs-directly default is preserved for development.
- Adding CommonJS `require`/`module.exports` or ESM `import`/`export` once a second source file
  is introduced and a deliberate module-system choice is documented.

---

## Quality Standards (Definition of Done)

**Gate 1 — Static checks pass**
- `npm run lint` exits 0 (Node.js syntax check on all source files).
- `npm run type-check` exits 0 (identical syntax check; no TypeScript errors introduced).
- No uncommitted changes to tracked files after the change set is applied.

**Gate 2 — Runtime integrity**
- `npm start` exits 0 and produces expected stdout output without throwing or crashing.
- No new top-level side-effect code exists outside a named function in `src/index.js`.
- Zero new runtime dependencies added without documented justification in the PR description.

**Gate 3 — Test suite green**
- `npm test` exits 0.
- Any new logic introduced has at least one corresponding test file using `node --test`.
- No pre-existing passing tests are broken by the change.

---

## Non-Goals

- This project is **not** a production application. It is not intended to serve real users, handle
  real data, or run in a production environment.
- This project is **not** a framework, library, or reusable npm package. It will not be published
  to the npm registry.
- This project is **not** a polyglot monorepo. It is a single-language (JavaScript/Node.js)
  codebase.
- This project is **not** a demonstration of advanced Node.js patterns (streams, workers, native
  addons, cluster). Simplicity is a feature.
- This project is **not** a benchmark or performance-testing harness.
- This project is **not** a substitute for a real project when evaluating AI agents against
  domain-specific requirements — it is intentionally domain-free.

---

*Generated by GitHub Copilot CLI following the dark-factory governance pattern.*
*Source: https://github.com/coleam00/dark-factory-experiment*
