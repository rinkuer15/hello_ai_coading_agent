# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a **governance scaffold for AI-assisted coding agent experimentation**. It is not a production application. The runtime component — a single Node.js file (`src/index.js`) that prints one line to stdout and exits — exists solely to give AI agents a structurally valid, zero-risk surface to read and modify. Its output (`Hello, AI Coding Agent!\n`) is frozen as a byte-stable behavioural contract against which every automated change can be regressed without any domain knowledge.

The real substance of the project is its governance layer: four protected markdown files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that encode a complete, conflict-resolving rule system governing how automated agents may read, write, and open pull requests against this repository. The project runs as a local CLI via `npm start` with zero external dependencies and requires no installation beyond `git clone`. It is not published to npm and not intended for end-user consumption.

The project is used by AI tooling researchers, developer-experience engineers, platform architects, and AI safety red-teamers who need a reproducible, auditable, zero-blast-radius environment in which to test, benchmark, calibrate, and probe agentic coding workflows.

## Who It's For

- **AI Tooling Researcher / Engineer** — Tests agentic coding pipelines (automated issue triage, branch creation, PR generation, merge loops) in a fully controlled environment where a misbehaving agent cannot damage real business logic.
- **Developer Experience (DevEx) / Platform Engineer** — Benchmarks and evaluates AI coding assistants against a consistent, documented baseline; uses the governance layer as a reference pattern when designing agent rules for production repositories.
- **AI Safety / Red-Team Engineer** — Probes the governance layer for gaps (prompt injection, scope-creep evasion, protected-file modification) in a sandbox where a failed probe is observable and costless.
- **Not for end users who need a CLI that does something at runtime.** This project intentionally produces no useful output beyond a single diagnostic string. Anyone seeking a real application, a forkable production starter, or an npm-installable package should look elsewhere.

## Core Capabilities (In Scope)

**Zero-Risk Agent Execution Surface**
- Provides a structurally valid Node.js project (runnable entry point, npm scripts, built-in test runner) that AI agents can read and modify without risking production logic.
- Every agent action that touches `src/index.js` or `package.json` is fully recoverable in seconds.

**Deterministic Behavioural Contract**
- `npm start` always prints exactly `Hello, AI Coding Agent!\n` and exits with code 0.
- This byte-stable stdout contract is the canonical regression check: a deviation is unambiguous and measurable without domain knowledge.

**Layered, Conflict-Resolving Governance**
- A four-file authority hierarchy (MISSION.md → GUARDRAILS.md → CLAUDE.md → AGENTS.md) that resolves every foreseeable agent conflict without human intervention.
- Scope disputes are resolved by MISSION.md; process disputes by GUARDRAILS.md; style disputes by CLAUDE.md.

**Automated Triage and Rejection Pipeline**
- GUARDRAILS.md encodes a complete decision tree: accept, reject, defer-to-human, or escalate.
- Agents can self-triage incoming issues and PRs without ambiguity, serving as a reference implementation of governed agentic triage.

**Auditable Quality Gate Suite**
- Four deterministic gates: syntax check, type check, test execution with file-discovery verification, and behavioural regression.
- Gates are intentionally conservative, documented including their known limitations (e.g. `npm test` exiting 0 silently with zero test files is explicitly NOT a passing gate).

**One-Way-Door Decision Catalogue**
- Documents and freezes uncommitted architectural decisions (module system: CommonJS vs ESM; Node.js version pinning; first dependency; `package-lock.json` generation) that are irreversible once made, so agents never accidentally cross them.

**Cross-Tool Agent Compatibility**
- Supports agents that look for `CLAUDE.md` (Claude-native tooling) and agents that look for `AGENTS.md` (Copilot, Codex, and other tools following that convention) from a single canonical instruction set via a redirect shim.

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Runtime I/O and External Communication**
- Adding network requests, HTTP servers, database access, file system reads/writes, or stdin consumption.
- Reading environment variables (`process.env`) or parsing command-line arguments (`process.argv`).
- Any process that does not start, print, and exit 0 immediately.

**Dependency and Module System Introduction**
- Adding any entry to `dependencies` or `devDependencies` in `package.json` without explicit human approval.
- Introducing `require(...)` or `import ...` anywhere in the project — this permanently establishes CommonJS vs ESM, a one-way door that must be a deliberate human decision.
- Committing `package-lock.json` while zero dependencies exist.

**Tooling Infrastructure Upgrades**
- Installing or configuring ESLint, Prettier, TypeScript, Babel, Webpack, Vite, Rollup, or any equivalent.
- Making `npm run lint` and `npm run type-check` differ from each other — they are intentionally identical scaffolding.
- Adding `build`, `format`, `watch`, `dev`, `deploy`, or `precommit` npm scripts.

**Speculative Scaffolding and Structural Expansion**
- Creating `dist/`, `lib/`, `bin/`, `config/`, or any new directory without a causally required reason in an approved issue.
- Adding additional source files under `src/` without human approval — `src/index.js` is the entire application and must remain so unless explicitly authorised.
- Pinning the Node.js version via `.nvmrc` or `"engines"` unless both land in the same atomic commit with human sign-off.

**Governance File Modification by Automation**
- Any automated PR that touches `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` is immediately and unconditionally rejected — no fix attempt, no negotiation.

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **The stdout contract is byte-stable.** `npm start` must print exactly `Hello, AI Coding Agent!\n` and exit 0. This output cannot be altered as a side effect of any other change — only a human-approved issue that explicitly authorises a stdout change may modify it.
2. **Zero external dependencies at all times.** `package.json` must have no `dependencies` or `devDependencies` keys until a human explicitly approves the first addition. The project must remain fully usable from `git clone` + `node src/index.js` with no install step.
3. **The module system is undecided and must stay that way until a human decides.** No `require` and no `import` may be introduced autonomously. Introducing either permanently and irreversibly establishes the module system for the entire repository.
4. **Governance files are immutable by automated workflows.** `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human-authored PR with human review. Any automated PR touching these files is rejected with no fix attempt.
5. **`npm run lint` and `npm run type-check` must remain identical.** Both run `node --check src/index.js`. Making them differ is an explicit auto-reject trigger, not a quality improvement.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Adding the first `src/*.test.js` file that captures stdout via child-process spawn and asserts the exact output contract (`Hello, AI Coding Agent!\n`).
- Writing additional co-located test files at `src/*.test.js` using only Node.js built-in `assert` — no external assertion libraries.
- Updating `README.md` to reflect any human-approved change to the observable CLI surface.
- Pinning the Node.js version via `.nvmrc` + `"engines"` in a single atomic commit, once the version is agreed by humans.
- Adding a first real dependency to `package.json` — with human approval — and committing `package-lock.json` in the same commit.
- Expanding `src/index.js` with additional logic inside `main()` — using `try/catch` + `process.exit(1)` for any I/O — once a human-approved issue explicitly authorises the change.
- Introducing a real linter (ESLint) or formatter (Prettier) if both `lint` and `type-check` scripts are updated together in a single human-approved PR.

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Syntax check: `npm run lint` exits 0 (`node --check src/index.js` — parse errors only)
- Type check: `npm run type-check` exits 0 (intentionally identical to lint)
- No build step exists; absence of a build step is not a failure
- All test files discovered by `node --test` pass — **critically: `npm test` exiting 0 with zero discovered test files is NOT a passing gate; verify stdout shows ≥1 test file was discovered and executed**

**Gate 2 — Feature is discoverable without docs**
- Any new user-facing behaviour must be self-evident from `npm start`, `npm test`, and `README.md` without consulting external documentation.
- No undocumented scripts, hidden flags, or "you need to know about this" behaviours.
- `README.md` must accurately reflect the current observable CLI surface after every change.

**Gate 3 — End-to-end regression**
Run `npm start` and capture stdout. Assert that the output is exactly `Hello, AI Coding Agent!\n` (including the trailing newline) and that the process exits with code 0. This check must pass after every change to any file in the repository, regardless of whether that file appears related to the output. If this check fails for any reason, the change is rejected.

## Non-Goals

- Not a production application, CLI tool, or library that end users install or run for a useful purpose.
- Not an npm-published package — this project is not on the npm registry and is not intended to be.
- Not a forkable production starter template — the governance layer must be entirely replaced before this scaffold can serve as the foundation of a real project.
- Not a benchmark of raw Node.js performance, throughput, or scalability.
- Not a demonstration of advanced JavaScript patterns, modern ESM syntax, TypeScript types, or framework idioms.
- Not a multi-file, multi-module application — the entire runtime is one four-line file and must remain so without human approval.
- Not a platform for Python, Go, Rust, or any non-JavaScript runtime — though Python experimentation is an anticipated future addition (hence `__pycache__/` in `.gitignore`), it is not currently in scope.
- Not a CI/CD pipeline host — no GitHub Actions, no automated deploy targets, no environment-specific configuration.

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
