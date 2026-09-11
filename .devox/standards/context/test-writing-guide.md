# Test Writing & Subprocess Isolation Pattern

**When to load this:** Writing or modifying `src/index.test.js`, or considering adding any new test file to this repo.

## Overview

This repo has exactly one test file, `src/index.test.js`, which asserts the oracle's byte-exact stdout and exit code by spawning it as a child process rather than importing it. This is a deliberate isolation pattern, not incidental style — it proves the oracle's real-world (process) behavior instead of its in-module behavior, and it must be preserved in any future edits to this file.

## Key Files

- `src/index.test.js` — the only test file permitted in this repo (per MISSION.md's single-file-architecture invariant); uses Node's built-in `node:test` + `node:assert`, no third-party runner

## Patterns & Rules

- The oracle is spawned as a subprocess via `childProcess.spawn('node', [indexPath])` (`src/index.test.js:8`) — it is never `require()`'d into the test's module scope. This preserves byte-level isolation and confirms stdout under real process semantics, not module semantics.
- `indexPath` is built with `path.join(__dirname, 'index.js')` (`src/index.test.js:6`) — never a hardcoded relative string like `'./index.js'`.
- Async control flow uses the callback (`done`) pattern from `node:test` (`src/index.test.js:8,15,18`) — no Promises, no `async`/`await`, consistent with the ES5-only constraint extending to test code even though `es5-check.js` does not scan this file.
- Assertions (`src/index.test.js:15-16`):
  - `assert.strictEqual(code, 0, 'exit code must be 0')`
  - `assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', 'stdout must be byte-exact')` — note the trailing `\n` is part of the expected value; do not trim it when writing similar assertions.
- All requires use the `node:` protocol prefix (`node:test`, `node:assert`, `node:child_process`, `node:path` — `src/index.test.js:1-4`), not the bare module names. Follow this convention for any new built-in imports in this file.
- There is no unit-level test coverage in this repo, and there should not be — `src/index.js` has no importable logic (`main()` is called eagerly at module scope, not exported), so unit testing it would require breaking the single-file, no-module-system architecture. Do not add `module.exports` to `src/index.js` to make it more "testable" — that is an explicit violation of the frozen 5-line structure.

## Gotchas

- It is tempting to simplify the test by `require('./index.js')` directly — resist this. It would change the test from a black-box, real-process verification into a module-load side-effect check, which is a weaker and different guarantee, and it would violate the repo's stated isolation pattern.
- `es5-check.js` does not scan `src/index.test.js` (`scripts/es5-check.js:11` targets only `src/index.js`), so any ES6+ syntax accidentally introduced here (e.g. `const`, arrow functions) will not be caught by the automated gate — review this file manually for ES5 compliance on every edit.
- Adding a second test file is not itself forbidden by MISSION.md's single-*production*-file rule, but no second test file currently exists — if one is proposed, confirm it doesn't duplicate `src/index.test.js`'s scope before adding it, since there is no importable logic in `src/index.js` to justify additional test surface.
