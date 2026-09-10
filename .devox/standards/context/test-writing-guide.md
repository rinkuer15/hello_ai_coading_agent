# Test Writing Guide

**When to load this:** Before writing or modifying `src/index.test.js`.

## Overview

This project has exactly one test file, and it follows a specific isolation pattern (subprocess spawning rather than `require`) plus the same ES5 constraints as production code. Because `scripts/es5-check.js` does not scan test files, ES5 compliance here must be verified manually rather than relying on the automated gate.

## Key Files

- `src/index.test.js` — the only test file in the repo; spawns the oracle (`src/index.js`) as a child process and asserts byte-exact stdout plus exit code 0.

## Patterns & Rules

- Tests use the built-in `node:test` + `node:assert` modules — no external test framework or dependency (per Tech Stack: Test runner = `node --test`).
- The oracle is spawned as a subprocess via `childProcess.spawn`, never `require()`d into test scope — this preserves byte-level isolation and validates real process semantics (stdout, exit code) rather than in-process module semantics (`src/index.test.js:8`, referenced in CLAUDE.md "Core Code Patterns" #7).
- Tests must assert the exact stdout string `'Hello, AI Coding Agent!\n'` and exit code `0` — this is the only assertion surface since the oracle has no other observable behavior.
- Use the callback (`done`) async pattern for asynchronous test steps — no Promises or `async`/`await`, consistent with the ES5-only surface constraint extending to test code (`src/index.test.js:8,15,18`).
- Use `path.join(__dirname, ...)` to construct the path to the oracle rather than a hardcoded relative string (`src/index.test.js:6`).
- Apply the same ES5 rules as production code: `var` only, `function` declarations, single quotes — even though `es5-check.js` does not enforce this file (`src/index.test.js:1-4`).

## Gotchas

- Do not "simplify" the test by `require`-ing `src/index.js` directly — this would defeat the subprocess-isolation design and no longer prove the oracle's real stdout/exit-code behavior under process semantics.
- Because `es5-check.js` only scans `src/index.js`, any ES6+ syntax accidentally introduced into `src/index.test.js` (e.g. an arrow function in a callback) will pass every automated check silently — manual review is mandatory.
- There is intentionally no unit-level coverage — the oracle has no importable logic, so adding "unit tests" or refactoring `src/index.js` to be more testable would violate the single-file, structurally-frozen architecture.
