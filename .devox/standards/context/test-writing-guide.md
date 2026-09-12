# Test Writing Guide for index.test.js

**When to load this:** Load before writing or modifying `src/index.test.js`, or when asked to add test coverage anywhere in this repo.

## Overview

`src/index.test.js` is the project's sole test file, and it follows conventions distinct from general ES5 style rules: subprocess-spawn isolation (never `require()` the oracle), callback-based async (no Promises/async-await), and byte-exact stdout assertions. This module exists because these test-specific conventions are more detailed than CLAUDE.md's top-level rules should carry.

## Key Files

- `src/index.test.js` — the only test file in the project; a single integration/black-box test

## Patterns & Rules

- Tests spawn the oracle as a child process — never `require()` the oracle into test scope. This preserves byte-level isolation and confirms the oracle's stdout under real process semantics, not module semantics (CLAUDE.md "Core Code Patterns" #7; src/index.test.js:8-9 uses `child_process.spawn`).
- Callback (`done`) async pattern in tests, no Promises/async-await — consistent with the ES5-only surface constraint extending to test code (CLAUDE.md "Core Code Patterns" #8; src/index.test.js:8,15,18, the `(t, done)` signature with `done()` called at the end).
- `path.join(__dirname, ...)` must be used for constructing the path to the oracle file being spawned, never a hardcoded relative string (CLAUDE.md "Core Code Patterns" #4; src/index.test.js:6).
- Uses Node's built-in `node:test` and `node:assert` — no external test framework (package.json:8, `"test": "node --test"`).
- Assertions must be byte-exact: stdout must equal `'Hello, AI Coding Agent!\n'` exactly, and exit code must be 0 (src/index.test.js:15-16).
- This is the project's only test — there is no unit-level coverage, and none should be added, because there is no importable logic in `src/index.js` to unit test (see CLAUDE.md "Build, Test & Lint" note on test suite).
- ES5 compliance (`var`, `function` declarations, single quotes) applies to this file too, but it is NOT covered by the automated `scripts/es5-check.js` gate (which only scans `src/index.js`) — verify manually.

## Gotchas

- Don't "upgrade" this test to use `require('../src/index')` for convenience — that would defeat the subprocess-isolation design and is a deliberate architectural choice, not an oversight.
- Don't introduce a test framework (Jest, Mocha, Vitest) — the zero-dependency policy and single-test-file architecture are permanent constraints (see MISSION.md scope).
- Don't convert the callback `done` pattern to async/await for "modernization" — this would violate the ES5-only surface rule that extends to test code.
