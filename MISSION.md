# Mission

## What Hello AI Coding Agent Is

Hello AI Coding Agent is a minimal, zero-dependency Node.js scaffold purpose-built for experimenting with AI-assisted coding agents in a zero-blast-radius environment. The entire runtime is a single 4-line JavaScript file (`src/index.js`) that prints `Hello, AI Coding Agent!` to stdout and exits with code 0. This deliberate simplicity is not a limitation — it is the design. The frozen, byte-stable stdout output serves as a measurable regression contract that requires no domain knowledge to verify, making it an ideal baseline for testing and calibrating agentic workflows.

The real product is the governance layer: a set of protected markdown files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) that encode a complete, conflict-resolving rule system governing how AI agents may interact with this repository. These documents define authority hierarchies, coding conventions, triage decision trees, and hard invariants — everything needed to safely introduce automated tooling into a codebase without chaos. The project runs entirely on Node.js built-ins: no transpiler, no bundler, no external dependencies of any kind.

Hello AI Coding Agent is deployed as a CLI tool invoked via `npm start`. It targets researchers, platform engineers, and tooling teams who need a reproducible, low-risk sandbox to test agent behaviours, governance models, and automated PR pipelines without risking real application code.

## Who It's For

- **AI tooling researchers and DevEx engineers** who need a controlled, reproducible sandbox to test agentic coding workflows, PR automation, and governance enforcement without touching production systems.
- **Platform architects and AI safety red-teamers** who need a zero-blast-radius environment to calibrate how AI agents respond to scope constraints, auto-reject triggers, and escalation rules before deploying those patterns to real repositories.
- **Not for end users or application developers** — this project does not deliver application features, solve business domain problems, or serve as a template for production software. Anyone expecting a general-purpose starter kit or a real application will find nothing here of use.

## Core Capabilities (In Scope)

**Runtime Contract**
- Executes `src/index.js` via `npm start`, printing exactly `Hello, AI Coding Agent!\n` to stdout
- Exits with code 0 on every successful run — no branches, no conditionals, no environment dependencies
- Byte-stable output serves as the sole regression contract for all test and validation pipelines

**Governance Layer**
- `MISSION.md` as the scope authority — wins all disputes about what to build
- `GUARDRAILS.md` as the process authority — wins all disputes about how the process runs
- `CLAUDE.md` as the style and convention authority — wins all disputes about how code is written
- `AGENTS.md` as a compatibility shim — redirects tools that look for `AGENTS.md` by convention

**Automated Quality Gates**
- Syntax validation via `npm run lint` (`node --check src/index.js`)
- Identical type-check gate via `npm run type-check` (intentionally identical to lint — documented scaffolding)
- Test execution via `npm test` (`node --test`) with built-in test runner and co-located `*.test.js` discovery

**Coding Convention Enforcement**
- ES5-compatible JavaScript only: `function` declarations, `var`-style thinking, no arrow functions, no `const`/`let`
- Single-quoted strings, semicolons on every statement, `camelCase` identifiers, lowercase filenames
- All source files under `src/` — no `.js` at project root
- Exactly one blank line between the closing `}` of `main()` and the `main();` call site

**Test Scaffolding (Prescribed)**
- Co-located test files at `src/*.test.js` using `node:assert` built-in only
- First test must be a contract test: spawn child process, capture stdout, assert exact bytes `Hello, AI Coding Agent!\n`
- Zero external assertion libraries or test frameworks permitted

**Knowledge Graph Integration**
- `graphify-out/` directory holds generated knowledge graph artefacts (JSON, HTML, report)
- `.graphifyignore` controls what is excluded from extraction — never hand-edited

## Out of Scope (Must Never Build)

Automated workflows are forbidden from accepting issues in these areas:

**Runtime Complexity**
- Adding application logic, business domain features, or any branching behaviour to `src/index.js`
- Introducing environment variable reads, file I/O, network calls, or database access
- Adding a build step, transpiler, bundler, or `dist/` output pipeline

**Dependency Introduction**
- Adding any `dependencies` or `devDependencies` to `package.json` without explicit human authorisation
- Committing `package-lock.json` before the first approved real dependency arrives (must be atomic)
- Installing test frameworks, assertion libraries, linters, or formatters beyond Node.js built-ins

**Module System Changes**
- Introducing `require` or `import` anywhere in the codebase — this is an uncommitted one-way door affecting the entire toolchain
- Switching between CommonJS and ESM without a human-authorised, explicitly scoped issue

**Language Modernisation**
- Upgrading `src/index.js` syntax from ES5 to ES6+ (arrow functions, `const`/`let`, destructuring, template literals) without a human-approved issue explicitly authorising it
- Pinning a Node.js version via `.nvmrc` or `"engines"` without both files arriving in the same atomic commit

**Governance File Modification**
- Any automated workflow touching `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` for any reason, including "minor" clarifications, formatting fixes, or cross-referencing updates

## Hard Invariants (Not Tunable by Issues)

These are not features. They are constraints. Automated workflows cannot modify them.

1. **The stdout contract is byte-stable and frozen.** `Hello, AI Coding Agent!\n` — exact string, exact capitalisation, exact punctuation, exact trailing newline — cannot change as a side effect of any issue. Only a human-approved issue explicitly authorising a stdout change may modify it.
2. **Zero dependencies is the baseline until explicitly broken.** No `dependencies` or `devDependencies` may be added without human authorisation. `package-lock.json` must not be committed while zero dependencies exist; it must arrive atomically with the first approved dependency.
3. **The module system is an uncommitted one-way door.** No `require` and no `import` may be introduced autonomously. Any agent that adds either triggers an immediate auto-reject — this is a toolchain-affecting, irreversible decision reserved for human review.
4. **Governance files are immutable by automated workflows.** `MISSION.md`, `GUARDRAILS.md`, `AGENTS.md`, and `CLAUDE.md` can only be changed via human PR review. Any automated PR touching any of these files is immediately and unconditionally rejected with no fix attempt.
5. **`npm test` exiting 0 is not evidence of passing tests.** With zero `*.test.js` files, `node --test` exits 0 silently. Pipelines must verify that stdout names at least one discovered test file — exit code alone is never sufficient proof of test passage.

## Allowed Evolutions

These are explicitly in scope for future automated work:

- Writing the first contract test at `src/index.test.js` that spawns `node src/index.js` and asserts exact stdout bytes
- Adding additional co-located test files under `src/` using `node:assert` built-in only
- Updating `README.md` if and only if the observable CLI surface changes (stdout string, exit code, or npm script names)
- Pinning a Node.js version by adding `.nvmrc` and `"engines"` to `package.json` in a single atomic commit, once explicitly authorised
- Adding Python experimentation files (anticipated — `__pycache__/` in `.gitignore` is deliberate) once explicitly scoped
- Expanding `.gitignore` or `.graphifyignore` when new tool outputs or generated artefacts are introduced
- Introducing the first real dependency when explicitly authorised, provided `package-lock.json` arrives in the same commit

## Quality Standards (Definition of Done)

Every change must clear all three gates:

**Gate 1 — Static checks pass**
- Type-check: `npm run type-check` exits 0 with zero errors (`node --check src/index.js`)
- Lint: `npm run lint` exits 0 with zero warnings (intentionally identical to type-check — do not diverge)
- No build step required — there is no transpiler or bundler to run
- All unit and integration tests pass: `npm test` exits 0 AND stdout names at least one discovered test file

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
2. `npm test` stdout explicitly names at least one test file (not just silent exit 0)
3. No new `.js` files exist outside `src/`
4. No `require` or `import` has been introduced
5. Governance files (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`) are byte-for-byte unchanged

## Non-Goals

- Not a production application — delivers no business domain features and solves no end-user problem directly
- Not a general-purpose Node.js starter kit or project template for real software
- Not a multi-file, multi-module, or multi-layer architecture — the entire runtime is intentionally four lines
- Not a SaaS, web application, REST API, or any server-side service
- Not a library or package intended for publication to npm or consumption by other projects
- Not a demonstration of modern JavaScript best practices — ES5 compatibility is a deliberate, frozen constraint, not a gap
- Not a testing framework or CI/CD pipeline product — it is the subject of such pipelines, not their implementation
- Not a documentation site, knowledge base, or content management system — governance files are machine-readable rule sets, not human-facing product docs

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
