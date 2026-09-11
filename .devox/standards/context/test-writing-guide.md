# Test Writing Guide

**When to load this:** Load this before creating, modifying, or reviewing `src/index.test.js` — the project's sole test file.

## Overview

`src/index.test.js` is the only authorised test file in the repository (CLAUDE.md, "Single-file production architecture is permanent"). It carries constraints beyond ordinary ES5 style: it must exercise the oracle via subprocess isolation rather than module import, use callback-style async rather than Promises, and assert byte-exact output. These constraints only matter when this specific file is being written or reviewed.

## Key Files

- `src/index.test.js` — the sole test file; one integration test, spawns `src/index.js` as a child process
- `src/index.js` — the oracle under test (never imported directly into test scope)

## Patterns & Rules

- **Tests must spawn the oracle as a child process, never `require()` it into test scope.** `src/index.test.js:10` uses `childProcess.spawn('node', [indexPath])`. This preserves byte-level isolation and confirms real process semantics, not module semantics (CLAUDE.md rule 7; GUARDRAILS.md §2 rule 14).
- **Use Node's built-in test runner only**: `require('node:test')` and `require('node:assert')` (`src/index.test.js:1-2`) — no Jest, Mocha, Vitest, or any other dependency (MISSION.md "Dependencies and Tooling Expansion" out-of-scope list).
- **Callback (`done`) async pattern only — no Promises, no `async`/`await`, no arrow functions.** The test signature is `function (t, done)` (`src/index.test.js:8`), with `done()` invoked inside the `proc.on('close', ...)` callback (`src/index.test.js:15,18`). This preserves ES5 compliance in a file the automated `es5-check` gate does not cover (GUARDRAILS.md §2 rule 15).
- **Assertions must be byte-exact.** `assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', ...)` (`src/index.test.js:17`) and `assert.strictEqual(code, 0, ...)` (`src/index.test.js:16`) — do not loosen these to substring/regex matches.
- **Use `path.join(__dirname, ...)` for all path construction** — never hardcoded relative strings (`src/index.test.js:6`; CLAUDE.md rule 4).
- **Never modify this file to make a failing test pass.** If the oracle changed and a test fails, fix `src/index.js`, not the assertion — unless there's an explicit, scrutinised reason the test itself was wrong (GUARDRAILS.md §2 rule 1).
- **`npm test` output must name ≥1 discovered test file.** A silent `exit 0` with zero files discovered is a false pass, not a real pass (GUARDRAILS.md §6 item 2; §3 gate 4).

## Gotchas

- There is no unit-level test coverage in this project by design — there's no importable logic to unit test. Don't add unit tests around internals; the single subprocess integration test is the intended full extent of coverage (CLAUDE.md "Test suite" section).
- `scripts/es5-check.js` does NOT scan `src/index.test.js`. Any ES6+ syntax accidentally introduced here (e.g., an arrow function or `const`) will not be caught by any automated gate — manual line-by-line inspection is mandatory (GUARDRAILS.md §6 item 7).
- Adding a second test file under `src/` is an auto-reject trigger — `src/index.test.js` is the sole authorised exception to the single-source-file rule (MISSION.md Hard Invariant 6; GUARDRAILS.md §5 trigger 5).
