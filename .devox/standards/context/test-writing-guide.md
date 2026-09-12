# Subprocess-Isolation Test Pattern

**When to load this:** When writing, modifying, or reviewing `src/index.test.js`, or when asked to add test coverage for anything in this repo.

## Overview

This repo has exactly one test file, `src/index.test.js`, and it follows a strict, non-negotiable pattern: spawn the oracle as a real child process and assert on its external behavior (stdout bytes, exit code), never `require()` it into test scope. This module documents that pattern plus the ES5/callback-style constraints that apply specifically to test code.

## Key Files

- `src/index.test.js` — the only test file that exists or may exist beyond it being extended; uses Node's built-in `node:test` + `node:assert` (`src/index.test.js:1-2`).
- `src/index.js` — the oracle under test; test script spawns this via `node:child_process`, never imports it.

## Patterns & Rules

1. **Tests must spawn the oracle as a subprocess, never `require()` it** — this is a hard rule, not a convention (GUARDRAILS.md §2 rule 14). Confirmed in current code: `var proc = childProcess.spawn('node', [indexPath]);` (`src/index.test.js:8`), using `node:child_process`. In-process module loading of `src/index.js` is prohibited because it would test module semantics instead of real process/stdout semantics.
2. **Assertions are byte-exact, not approximate.** `assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', 'stdout must be byte-exact');` (`src/index.test.js:16`) alongside `assert.strictEqual(code, 0, 'exit code must be 0');` (`src/index.test.js:15`). Any new test must preserve this byte-exact standard — no `.includes()`, no trimming, no regex-based partial matches on the oracle's primary output.
3. **Callback (`done`) async pattern only — no Promises, no async/await, no arrow functions** (GUARDRAILS.md §2 rule 15). Current signature: `function (t, done) { ... }` (`src/index.test.js:8`), with `done()` invoked inside the `proc.on('close', ...)` handler (`src/index.test.js:18`). This preserves ES5 compliance in a file the automated `es5-check` gate does **not** cover (see `es5-compliance-traps.md`).
4. **Path construction always via `path.join(__dirname, ...)`**, never a hardcoded relative string (`src/index.test.js:6`): `var indexPath = path.join(__dirname, 'index.js');`.
5. **Module loading is CommonJS `require`, ES5 `var` style**, matching the rest of the repo: `var test = require('node:test'); var assert = require('node:assert'); var childProcess = require('node:child_process'); var path = require('node:path');` (`src/index.test.js:1-4`). Note the `node:` protocol prefix is used consistently for built-ins.
6. **Never modify this test file to make a failing test pass** — fix the source (`src/index.js`) instead (GUARDRAILS.md §2 rule 1). If a test genuinely seems wrong, the PR description must explicitly justify the change, and that claim will be scrutinized.
7. **A PR that adds new behavior or fixes a bug must include a corresponding test in `src/index.test.js`** (GUARDRAILS.md "Requirements for Every PR").
8. **This is the repo's only test file by design** — there is no unit-level coverage and none should be added, because there is no importable logic to unit test (CLAUDE.md "Test suite" note). Do not propose splitting this into multiple test files; a second `.js` file is a hard reject unless it is this sole authorized test file (MISSION.md/GUARDRAILS.md §4/§5).

## Gotchas

- `npm test` (`node --test`) will silently exit 0 with zero test files if `src/index.test.js` were ever deleted — this is a documented false-pass trap (GUARDRAILS.md §6.2). Always verify `npm test` stdout explicitly names ≥1 discovered test file before treating a green run as meaningful.
- ES5 compliance in this file is **manual-only** — `scripts/es5-check.js` never scans `src/index.test.js`. Don't assume a passing `es5-check` run says anything about this file.
- Because the test spawns a real `node` process per run, test execution has real subprocess overhead (fork + stdout streaming) compared to an in-process `require()` — this is intentional and should not be "optimized away" by switching to direct require.
