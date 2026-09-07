# Test Writing Guide for the Oracle Suite

**When to load this:** Writing or modifying `src/index.test.js`, or adding any new test case to this project.

## Overview

This project has exactly one test file and one test case, and it follows a non-obvious but deliberate isolation pattern: spawning the oracle as a real child process instead of `require`-ing it, combined with ES5-only, callback-style async (no Promises/async-await). Any future test additions must replicate this pattern exactly rather than reaching for more idiomatic modern Node test patterns, which would violate both the ES5 constraint and the isolation guarantee.

## Key Files

- `src/index.test.js` — the only test file; spawns `src/index.js` as a subprocess and asserts byte-exact stdout plus exit code 0

## Patterns & Rules

- The test is an integration/black-box test, not a unit test: it uses `childProcess.spawn('node', [indexPath])` (`src/index.test.js:10`) to run the oracle as a real external process rather than `require()`-ing it into test scope. This preserves byte-level isolation between the test runner and the oracle (`CLAUDE.md` Core Code Pattern 7; `GUARDRAILS.md` §2 rule 14).
- Never `require()` the oracle (`src/index.js`) into the test file. Doing so would collapse the process boundary this test is designed to enforce.
- The test imports only Node built-ins: `node:test`, `node:assert`, `node:child_process`, `node:path` (`src/index.test.js:1-4`) — no third-party test framework (e.g., Jest, Mocha) may be introduced; the zero-dependency invariant applies to devDependencies too.
- Test uses ES5 CommonJS style: `var test = require(...)` (`src/index.test.js:1`), `function (t, done) { ... }` (`src/index.test.js:9`) — `function` declarations/expressions with `var`, never `const`/`let`/arrow functions.
- Async completion uses callback-style with an explicit `done` parameter, not Promises or `async`/`await`: `proc.on('close', function (code) { ...; done(); })` (`src/index.test.js:9-19`).
- The single assertion checks byte-exact stdout: `assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', ...)` (`src/index.test.js:15-16`) plus (per the test's design intent) the process exit code.
- Path construction uses `path.join(__dirname, ...)` (`src/index.test.js:6`), never a hardcoded relative string.

## Gotchas

- `scripts/es5-check.js` does **not** scan `src/index.test.js` (it only targets `src/index.js`, `scripts/es5-check.js:12`) — so any ES5 violation introduced in the test file will not be caught by `npm run es5-check`. You must manually inspect the test file for ES5 compliance after every edit.
- Do not "modernize" the test by switching to `require(indexPath)` and calling `main()` directly — this looks like a harmless refactor but destroys the subprocess isolation that is core to this test's purpose.
- Do not convert the callback-style `done` pattern to `async`/`await` even though Node's test runner supports it — this would violate the ES5-only constraint that applies uniformly across `.js` files.
