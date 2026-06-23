# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal Node.js scaffold designed as a controlled, observable
substrate for experimenting with AI-assisted coding agents. The project's source code is
intentionally trivial — a single `main()` function that prints one line to stdout — so that
all complexity lives in the governance layer rather than the application layer.

The project is a CLI tool: `node src/index.js` (or `npm start`) runs the program and exits.
There is no server, no build step, and no external dependencies. The absence of complexity
is a deliberate design constraint, not a limitation to be worked around.

The governance files — `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` — are
architecturally co-equal with the source code. They define the rules under which AI agents
are permitted to operate, making this project a living testbed for AI coding agent
governance patterns.

## Who It's For

- **AI coding agent researchers and developers:** Engineers who want a safe, low-stakes
  repository to test how AI agents handle pull request workflows, code changes, governance
  constraints, and auto-reject triggers without risk of breaking production systems.
- **Developers learning AI-assisted workflows:** Individuals experimenting with tools like
  Copilot, Devox, or Claude-based agents who need a controlled environment where mistakes
  have no real consequences.
- **Not for end users expecting a functional application.** This project does not build a
  product, implement a business feature, or solve a real-world problem beyond its role as
  an experimental substrate.

## Core Capabilities (In Scope)

**Executable Entry Point**
- Defines and invokes `main()` as the sole execution path
- Prints `Hello, AI Coding Agent!` to stdout and exits with code 0
- Runnable via `npm start` or `node src/index.js`

**Governance Layer**
- `MISSION.md` defines scope, invariants, and allowed evolutions
- `GUARDRAILS.md` enforces process rules, auto-reject triggers, and quality gates
- `AGENTS.md` provides AI agent instructions covering tech stack and coding rules
- `CLAUDE.md` acts as the code-style authority for naming and conventions

**npm Script Interface**
- `npm start` — runs the application
- `npm test` — runs Node.js built-in test runner (discovers `*.test.js` / `*.spec.js`)
- `npm run lint` — syntax-checks source via `node --check`
- `npm run type-check` — identical to lint; scaffolded for future type tooling

**Test Infrastructure**
- Built-in `node --test` runner; no external test dependencies required
- Test co-location convention: `src/*.test.js` alongside source files
- Zero external assertion libraries; uses Node.js built-in `assert` module

**Future Language Extension Points**
- `.gitignore` explicitly anticipates Python experimentation (`__pycache__/`)
- `dist/` gitignored and reserved for future build output

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Application feature development**
- Adding business logic, data persistence, or real user-facing functionality
- Introducing a web server, REST API, GraphQL endpoint, or database connection
- Building anything that would make this a "real" application rather than a scaffold

**Dependency introduction**
- Adding `dependencies` or `devDependencies` to `package.json` without a human-approved
  issue explicitly requesting a named package for a named purpose
- Committing `package-lock.json` before the first dependency is formally added

**Module system commitment**
- Adding any `require()` or `import` statement without explicit human approval — this is
  a one-way door that permanently establishes the module system for the repo

**Platform and runtime expansion**
- Pinning a Node.js version without simultaneously adding both `.nvmrc` and an `"engines"`
  field in `package.json`
- Adding Docker, CI/CD pipelines, cloud deployment configuration, or container tooling
  without a human-approved scope change

**Governance file modification by automation**
- Any automated workflow modifying `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or
  `CLAUDE.md` — these files are permanently write-protected from automated PRs

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **`main()` is the only valid execution entry point.** The only permitted top-level
   statements in any source file are function declarations and the single `main()`
   invocation. No side-effects at module load time — ever.
2. **Governance files are immutable by automated workflows.** `MISSION.md`,
   `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human PR review.
   Any automated PR touching these files is auto-rejected without a fix attempt.
3. **The `package.json` `"scripts"` block is protected.** Automated workflows may not
   modify, rename, or remove any existing npm script. New scripts require human approval.
4. **No speculative file creation.** `dist/` must not be created until a real build step
   exists. No empty placeholder commits, no pre-emptive directories.
5. **Scope creep is a hard auto-reject.** Changes must be causally linked to a specific
   open issue. "While I'm here" modifications — however benign — cause immediate PR
   rejection per GUARDRAILS.md §5.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding `src/*.test.js` test files to cover the existing `main()` function
- Introducing JSDoc type annotations on existing functions (no new tooling required)
- Adding a `.nvmrc` file and `"engines"` field in `package.json` together in one PR
- Expanding `src/index.js` with additional functions called from `main()`, provided the
  module-level structure (declaration + single `main()` call) is preserved
- Adding Python source files under `src/` if a Python experiment is explicitly scoped
  (`.gitignore` already anticipates this)
- Adding a real linter (e.g., ESLint) once a human approves the specific package and
  config in an issue

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: `npm run type-check` exits 0 with no errors
- Lint: `npm run lint` exits 0 with no errors
- Format: single-quoted strings, consistent semicolons, blank line between function
  declaration and invocation
- Build succeeds: `npm start` runs and exits 0
- All discovered tests pass: `npm test` exits 0 AND at least one `.test.js` file exists
  if the PR adds or modifies logic

**Gate 2 — Feature is discoverable without docs**
- Any new capability must be invokable via an existing or new npm script listed in
  `package.json`
- No hidden parameters, undocumented flags, or "you need to know about this" entry points
- The `README.md` must accurately reflect all runnable commands after the change

**Gate 3 — End-to-end regression**
Run the full validation sequence and verify each step:
```bash
npm run lint          # exits 0
npm test              # exits 0, at least one test discovered if logic changed
npm start             # prints exactly: Hello, AI Coding Agent!
```
The stdout of `npm start` must remain `Hello, AI Coding Agent!\n` unless a human-approved
issue explicitly changes the output string.

## Non-Goals

- Not a production application or deployable service of any kind
- Not a framework, library, or reusable package for other projects
- Not a demonstration of advanced Node.js patterns (async, streams, worker threads)
- Not a multi-file, multi-module architecture — complexity is deliberately avoided
- Not a general-purpose CLI tool; it prints one string and exits
- Not a TypeScript project unless a human explicitly approves migration in a scoped issue
- Not a multi-tenant or SaaS platform — there are no users, sessions, or accounts
- Not a showcase of test coverage, design patterns, or software engineering best practices
  beyond the governance model itself

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
