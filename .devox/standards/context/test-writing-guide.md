# Test Writing Guide

**When to load this:** Any task that creates, edits, or reviews `src/index.test.js` — the project's only test file.

## Overview

`src/index.test.js` is a single integration test that spawns `src/index.js` as a real child process and asserts its stdout is byte-exact and its exit code is 0. It intentionally avoids `require()`-ing the oracle directly, avoids Promises/async-await, and stays ES5-only like the rest of the codebase. Because there is exactly one test file and no unit-level coverage, any change here has an outsized effect on the project's only safety net — worked examples matter more than an abstract rule list.

## Key Files

- `src/index.test.js` — the sole test file; 21 lines, uses Node's built-in `node:test` + `node:assert` (lines 1-2) and `node:child_process` (line 3).
- `src/index.js` — the subject under test; only ever invoked via subprocess spawn, never imported.
- `package.json` — `"test": "node --test"` (line 8) is the only way tests are run; there is no test framework dependency.

## Patterns & Rules

1. **Spawn, never `require()`.** `src/index.test.js:10` calls `childProcess.spawn('node', [indexPath])` to run the oracle as a real OS process. This preserves byte-level isolation and confirms real stdout/exit-code semantics rather than in-process module semantics — do not refactor this to `require(indexPath)` even though it would be simpler, per CLAUDE.md rule 7.
2. **`path.join(__dirname, ...)` for all path construction.** `src/index.test.js:6` builds `indexPath` this way rather than a hardcoded relative string like `'./index.js'` — always follow this pattern for any new path references in this file (CLAUDE.md rule 4).
3. **Callback (`done`) async style, no Promises/async-await.** The test function signature is `function (t, done)` (`src/index.test.js:8`), events are wired with `.on('data', function (chunk) {...})` (line 12) and `.on('close', function (code) {...})` (line 16), and completion is signaled via `done()` (line 19) — this mirrors the ES5-only constraint extending into test code (CLAUDE.md rule 8).
4. **Byte-exact stdout assertion.** `src/index.test.js:16` asserts `stdout === 'Hello, AI Coding Agent!\n'` exactly, including the trailing newline from `console.log`. Any new assertion added to this file should preserve this level of precision rather than using substring/regex matching, since the whole point of the oracle is byte-exact verifiability.
5. **Exit code assertion is separate from stdout assertion.** `src/index.test.js:15` (`assert.strictEqual(code, 0, ...)`) is checked independently of the stdout content — both are needed because a process could produce correct stdout but still fail on exit.
6. **`var` declarations only**, no `const`/`let` (`src/index.test.js:1-4,9-10` all use `var`), consistent with CLAUDE.md rule 4 extending to test files even though `es5-check.js` does not scan this file (see `es5-checker-mechanics` module).

## Gotchas

- `src/index.test.js` is **not** covered by `npm run es5-check` — that script only scans `src/index.js` (`scripts/es5-check.js:12`). If you add new syntax to the test file, you must manually verify ES5 compliance; there is no automated backstop.
- There is deliberately **no unit-level test coverage** — do not add one "for completeness." There is no importable logic to unit test (the oracle has no exports, no module system per CLAUDE.md rule 6), so any unit test would just be re-testing subprocess behavior with more ceremony.
- Adding a second test file is not explicitly forbidden by MISSION/GUARDRAILS text reviewed here, but CLAUDE.md describes `src/index.test.js` as "the only test file" — treat introducing a second test file as a scope question to raise with a human rather than doing unilaterally.
