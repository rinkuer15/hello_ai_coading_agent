# Test Writing Guide for src/index.test.js

**When to load this:** When writing, modifying, or reviewing `src/index.test.js`, or when asked to add test coverage to this repo.

## Overview

`src/index.test.js` is the sole test file in the repo and contains exactly one integration/black-box test. There is no unit-level coverage and none is possible, because `src/index.js` exposes no importable logic — it is a synchronous script, not a module. This guide explains the non-obvious rules governing how that single test must be written and why "just add more unit tests" is not an available option here.

## Key Files

- `src/index.test.js` — the only test file; spawns the oracle as a subprocess and asserts byte-exact stdout plus exit code 0.
- `src/index.js` — the thing under test; has no `module.exports`, so it cannot be `require()`d meaningfully as a module.

## Patterns & Rules

- Tests must spawn the oracle as a child process — never `require()` it into test scope (`src/index.test.js:8`, using `childProcess.spawn('node', [indexPath])` per the enriched assessment at line 9). This preserves byte-level isolation and confirms stdout behavior under real process semantics, not module semantics.
- The test uses the Node built-in `node:test`/`node:assert` framework (`src/index.test.js:1-4`), invoked via `npm test` → `node --test` (`package.json:8`). No external test framework (Jest, Mocha, Vitest) may be added — that would violate the zero-dependency constraint.
- Tests use a callback (`done`) async pattern, not Promises or `async`/`await` (`src/index.test.js:8,15,18`) — this is consistent with the ES5-only surface constraint extending to test code. Test signature is `function (t, done)`; `done()` is called inside the `proc.on('close', ...)` handler (`src/index.test.js:18`).
- `src/index.test.js` must construct the path to the oracle using `path.join(__dirname, ...)` (`src/index.test.js:6`), never a hardcoded relative string.
- The single assertion checks byte-exact stdout (`'Hello, AI Coding Agent!\n'`) and exit code 0, captured via `data` events on the child process and asserted in the `close` handler (`src/index.test.js:9-19`).
- ES5 constraints (`var`, `function` declarations, single quotes) apply to `src/index.test.js` just as they do to `src/index.js`, per CLAUDE.md's naming/pattern rules — but `scripts/es5-check.js` does not scan this file, so compliance must be verified manually.

## Gotchas

- Do not attempt to add unit tests "for coverage" — there is no unit-testable surface. Adding a second exported function or a module system to `src/index.js` purely to make it more testable is itself a governance violation (see MISSION.md's single-file/no-module-system rule).
- Do not `require('../src/index.js')` inside the test file even though it would technically work in Node — this bypasses the subprocess isolation the test suite is specifically designed to enforce, and defeats the purpose of testing the oracle as a real, spawned CLI process.
- Do not introduce Promises, `async function`, or `await` in the test file to "modernize" the callback pattern — that would break the ES5-only convention that applies repo-wide, including to test code.
