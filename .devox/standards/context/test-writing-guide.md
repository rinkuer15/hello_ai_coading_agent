# Test Writing Guide

**When to load this:** Any task that involves writing, modifying, or evaluating the test suite (`src/index.test.js`), or diagnosing `npm test` behaviour.

## Overview

`src/index.test.js` exists and is the sole authorised test file. It must satisfy a strict, non-obvious set of constraints: ES5 syntax only, Node.js built-in imports only, subprocess-spawn isolation, and byte-exact oracle assertions via a callback-style `done` pattern. Every modern test-writing instinct (`async`/`await`, arrow functions, `spawnSync`, Jest matchers) conflicts with at least one of these constraints. Manual ES5 verification is required after any change because `scripts/es5-check.js` does not cover test files.

## Key Files

- `src/index.js` — The oracle under test; its stdout must be verified byte-exact (`Hello, AI Coding Agent!\n`).
- `src/index.test.js` — The only authorised test file; spawns oracle as a child process; ES5 CommonJS.
- `scripts/es5-check.js` — Automated ES5 gate for `src/index.js` only; does **not** scan `src/index.test.js`.
- `package.json` — `npm test` runs `node --test`; a real pass requires ≥1 file named in stdout.

## Patterns & Rules

**One authorised test file, one location** — The only permitted test file is `src/index.test.js`. No additional test files may be created under `src/` or anywhere else. (`CLAUDE.md §Hard Rules`, item 2; `GUARDRAILS.md §5`, trigger 5.)

**Node.js built-ins only** — Test files must import only from `node:assert`, `node:child_process`, `node:test`, and `node:path`. No npm packages. No third-party test frameworks. Confirmed by `src/index.test.js:1-4` which uses exactly these four modules.

**ES5 compliance in test files** — `src/index.test.js` must use `var`, `function` declarations, CommonJS `require`, single quotes, and semicolons. No `const`, `let`, arrow functions, template literals, or destructuring. Confirmed by actual file at `src/index.test.js:1-22`.

**CommonJS `require` for imports** — Use `var assert = require('node:assert');` style. Do not use `import` statements. (`src/index.test.js:1-4`)

**Callback-style async with `done`** — The test function signature is `function(t, done)`. The `done()` call is made inside `proc.on('close', ...)`. Never use `async function` or `Promise`. (`src/index.test.js:8`, `src/index.test.js:18`.)

**Spawn pattern, not `spawnSync`** — `src/index.test.js:10` uses `childProcess.spawn('node', [indexPath])`, not `spawnSync`. Stdout is accumulated via `proc.stdout.on('data', ...)` and assertions are made in `proc.on('close', ...)`. This is the established pattern — do not refactor to `spawnSync` without understanding the callback-style requirement.

**What the test must verify** — `src/index.test.js:14-15` asserts: (1) exit code is exactly `0`, (2) stdout is byte-exact `'Hello, AI Coding Agent!\n'`. These two assertions constitute the oracle test. (The current test does not assert stderr; adding a stderr assertion is permitted but not required.)

**Path construction via `path.join`** — `src/index.test.js:6` constructs the oracle path as `path.join(__dirname, 'index.js')`. Never use hardcoded relative strings. (`CLAUDE.md §Core Code Patterns`, item 4.)

**A real pass requires ≥1 file named in stdout** — After any change, run `npm test` and verify that stdout names `src/index.test.js` as a discovered file. Silent exit 0 was the former false-pass state (0 test files); it no longer applies now that `src/index.test.js` exists.

**Manual ES5 verification is required** — `scripts/es5-check.js:12` hardcodes `src/index.js` as its only target. After modifying `src/index.test.js`, manually inspect every line for `const`, `let`, `=>`, `` ` ``, `class`, `async`, `await`, `...`, and destructuring patterns. (`CLAUDE.md §Architecture Deep-Dive`, item 4.)

**`var i` declared before `for` loops** — Following the implicit convention in `scripts/es5-check.js:39`, declare loop variables on their own line before the loop body. (Architecture Assessment §Implicit Rules.)

## Gotchas

**`scripts/es5-check.js` will not catch ES6+ in the test file.** The checker hardcodes `src/index.js` as its target (`scripts/es5-check.js:12`). A passing `npm run es5-check` after modifying `src/index.test.js` proves nothing about the test file's ES5 compliance. Manual line-by-line inspection is the only gate.

**`node:test` API differs between Node 18 (experimental) and Node 20 LTS (stable).** The callback `done` pattern used in `src/index.test.js:8` works on both, but output format and some diagnostic details differ. If output looks unusual, check `node --version`.

**Do not `require()` the oracle into test scope.** `src/index.test.js:10` spawns `node [indexPath]` as a separate child process. Never `require('./index')` — the oracle has no exports, and in-process execution would bypass the byte-exact subprocess isolation the test is designed to provide. (Architecture Assessment §Implicit Rules, "Tests spawn oracle as a child process.")

**The test file itself is subject to all `.js` file rules.** Single quotes, semicolons, no formatters, no build tools. Do not run `prettier --write` or equivalent on it — formatters may introduce ES6+ syntax or disrupt style compliance.

**`npm test` silence after a change is a discovery failure.** If `npm test` exits silently with no named files, the test file may have a syntax error that prevents parsing, or was accidentally moved/renamed. The file must be exactly `src/index.test.js`.
