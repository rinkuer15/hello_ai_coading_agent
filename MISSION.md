# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal Node.js CLI scaffold designed as a controlled
experimentation environment for AI-assisted coding agents. The project's runtime
behaviour is intentionally trivial — a single `src/index.js` file that prints
`Hello, AI Coding Agent!` to stdout and exits 0 — so that the real complexity can
live in the governance layer rather than the application code.

The project runs with plain JavaScript (no transpilation, no bundler, no external
dependencies) using only Node.js built-ins. It is invoked directly via `node src/index.js`
or `npm start`. There is no server, no I/O beyond stdout, and no branching logic.

The core value of this project is its governance layer: four protected markdown files
(`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that define how AI agents
may operate on the repository. This makes it a reference scaffold for teams who want
to experiment with agentic workflows under strict, auditable constraints.

## Who It's For

- **AI tooling researchers and engineers** who need a safe, zero-risk codebase to test
  agentic coding workflows, automated PR pipelines, and governance enforcement without
  risking real application code.
- **Developer experience teams** evaluating AI coding agents (e.g. Copilot, Claude,
  Codex) and wanting a reproducible baseline with clear quality gates.
- **Not for end users or production deployments.** This is not a product. It is not
  intended for anyone who needs a CLI utility that does something meaningful at runtime.

## Core Capabilities (In Scope)

**CLI Entry Point**
- Executes `node src/index.js` to print `Hello, AI Coding Agent!` to stdout
- Exits with code 0 on success; fatal errors must exit with code 1 via `process.exit(1)`

**npm Script Surface**
- `npm start` — runs the application
- `npm test` — discovers and runs `*.test.js` / `*.spec.js` via `node --test` (built-in)
- `npm run lint` — validates syntax via `node --check src/index.js`
- `npm run type-check` — identical to lint; reserved for future type tooling

**Governance Layer**
- `MISSION.md` — scope authority: what to build, what to forbid, quality standards
- `GUARDRAILS.md` — process authority: triage rules, auto-reject triggers, escalation paths
- `CLAUDE.md` — style authority: naming, conventions, patterns
- `AGENTS.md` — redirect shim to `CLAUDE.md` for tool compatibility

**Test Infrastructure**
- Co-located test files at `src/*.test.js` alongside source
- Node.js built-in `assert` module for assertions (zero external test dependencies)
- Happy-path stdout contract test: verify `main()` emits exactly `Hello, AI Coding Agent!\n`

**Experimentation Scaffolding**
- `.gitignore` pre-configured for `node_modules/`, `dist/`, `.env`, Python artefacts,
  and graphify knowledge-graph output
- `graphify-out/` directory for knowledge graph exploration of the codebase

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Runtime Feature Expansion**
- Adding any network I/O, file I/O, database access, or external service calls
- Parsing `process.argv` or reading environment variables without a human-approved issue
- Adding a web server, REST API, or any long-running process

**Dependency Introduction**
- Adding any `dependencies` or `devDependencies` to `package.json` without human sign-off
- Committing `package-lock.json` before the first real dependency is added
- Introducing a module system (`require` or `import`) autonomously — this is a
  "Defer to Human" decision

**Tooling Infrastructure**
- Adding a real linter (ESLint, etc.), type-checker (TypeScript), or bundler
  without a human-approved issue
- Creating a `dist/` directory speculatively or with placeholder files
- Pinning the Node.js version via `.nvmrc` without simultaneously adding `"engines"`
  in `package.json` (and vice versa)

**Governance File Modification**
- Any automated PR touching `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, or `CLAUDE.md`
- Altering the `"scripts"` block of `package.json` via automated workflow

**Scope Creep**
- "While I'm here" improvements not causally linked to the open issue being addressed
- Removing `.gitignore` entries (e.g., `__pycache__/`) deemed "unused" — all entries
  are intentional

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **Zero external dependencies.** `package.json` must have no `dependencies` or
   `devDependencies` keys until a human explicitly approves adding one. This keeps
   the project fully reproducible and install-free.
2. **`npm start` stdout is a byte-stable contract.** The output `Hello, AI Coding Agent!\n`
   must remain identical unless a human-approved issue explicitly authorises a change.
   Automated agents may not alter this output as a side effect of any other change.
3. **`lint` and `type-check` scripts are intentionally identical.** Both run
   `node --check src/index.js`. This is deliberate scaffolding. Automated workflows
   must not "fix" them to differ — doing so is an auto-reject trigger.
4. **Governance files are immutable by automated workflows.** `MISSION.md`,
   `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human PR review.
5. **All source code lives under `src/`.** No source files may be placed at the repo
   root or in any directory other than `src/` (and its subdirectories). The `"main"`
   field in `package.json` enforces this contract.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding `src/index.test.js` to verify stdout output of `main()` using `node --test`
  and the built-in `assert` module
- Expanding `main()` to accept and handle additional behaviour when a human-approved
  issue defines the exact new output contract
- Adding additional helper functions inside `src/index.js` as long as they are called
  from `main()` and introduce no module-level side effects
- Adding `.nvmrc` and `"engines"` in `package.json` together in a single commit once
  the Node.js version is agreed by humans
- Extending `.gitignore` to cover new tool artefacts as the toolchain grows

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: `npm run type-check` exits 0 (zero syntax errors)
- Lint: `npm run lint` exits 0 (zero syntax errors)
- Format: code follows single-quote, semicolon, `camelCase` conventions from `CLAUDE.md`
- Build succeeds: `node src/index.js` executes without throwing
- All discovered tests pass: `npm test` exits 0 AND at least one `*.test.js` file
  was discovered and executed (a green run with zero test files is NOT a passing gate)

**Gate 2 — Feature is discoverable without docs**
- Any new user-facing behaviour must be observable by running `npm start` or
  `npm test` without reading external documentation
- No undocumented parameters, hidden flags, or "you need to know about this" gaps
- `README.md` must reflect any change to the observable CLI surface

**Gate 3 — End-to-end regression**
Run `node src/index.js` and assert that stdout is exactly `Hello, AI Coding Agent!\n`
and the process exits with code 0. This is the canonical happy-path regression check.
If a test file exists at `src/index.test.js`, `npm test` must discover it, execute it,
and report all assertions passing before the gate is considered cleared.

## Non-Goals

- Not a production CLI tool intended for daily developer use
- Not a library or package to be published to npm
- Not a web application, REST API, or any networked service
- Not a multi-file, multi-module project — single-file simplicity is a feature, not
  a limitation to be remedied
- Not a demonstration of advanced JavaScript patterns, async workflows, or OOP design
- Not a general-purpose AI agent framework or SDK
- Not a place to evaluate third-party AI libraries or npm packages
- Not a template to be forked into a real product without first removing the
  governance layer and replacing it with project-appropriate constraints

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
