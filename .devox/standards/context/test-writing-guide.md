# Test Writing Guide

**When to load this:** Writing or modifying `src/index.test.js`, or reasoning about what the test suite does and does not verify.

## Overview

`src/index.test.js` is the sole authorized test file in this repository. It follows a distinct pattern from typical Node test files: ES5-only syntax, callback-style async (not Promises/async-await), and subprocess-spawn isolation rather than in-process `require()`. This module documents that pattern in detail since it isn't covered by the automated `es5-check` gate and must be manually verified.

## Key Files

- `src/index.test.js` — the only test file; spawns the oracle (`src/index.js`) as a child process and asserts byte-exact stdout plus exit code 0.
- `scripts/es5-check.js` — the ES5 gate; does **not** scan this test file (`scripts/es5-check.js:12`).

## Patterns & Rules

- The test uses Node's built-in `node:test` and `node:assert` modules, run via `"test": "node --test"` (`package.json:7`; `src/index.test.js:1-4`).
- The oracle must be spawned as a subprocess via `childProcess.spawn('node', [indexPath])` — never `require()`d into the test's module scope (`src/index.test.js:10-11`). This preserves byte-level isolation between the test process and the oracle's own stdout stream.
- Async flow uses the `node:test` callback-style `done` pattern: `test('...', function (t, done) { ... })` (`src/index.test.js:8`) — no Promises, no `async`/`await`, no arrow functions.
- `path.join(__dirname, ...)` is used to construct the path to the oracle (`src/index.test.js:6`), consistent with the path-construction convention used elsewhere in the repo.
- The single test case asserts two things on the subprocess's `close` event: stdout is byte-exact `'Hello, AI Coding Agent!\n'` and exit code is exactly `0` (`src/index.test.js:16-19`).
- This is an integration/black-box test, not a unit test — there is no importable logic in `src/index.js` to unit test directly.

## Gotchas

- Because `scripts/es5-check.js` hardcodes its scan target to `src/index.js` only (`scripts/es5-check.js:12`), any ES6+ syntax introduced into `src/index.test.js` (e.g. `const`, arrow functions, template literals) will pass `npm run es5-check` silently. Always manually inspect this file line-by-line after edits.
- Do not "modernize" the test with Promises or `async`/`await` even though `node:test` supports it — the callback `done` style is the established convention here (`src/index.test.js:8`) and mixing styles would violate consistency, not just ES5 rules.
- Resist the temptation to `require('../src/index.js')` directly for a faster/simpler test — this repo's test strategy intentionally uses subprocess spawning to validate the oracle exactly as an external caller (like `npm start`) would observe it, including process exit codes.
