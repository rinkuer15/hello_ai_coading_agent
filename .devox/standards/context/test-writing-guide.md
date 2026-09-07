# Test Writing Guide

**When to load this:** Writing or modifying `src/index.test.js`, or evaluating whether a proposed test change is compliant.

## Overview

`src/index.test.js` is the single authorised test file in this repository, and it carries constraints that are easy to violate by habit: it must stay ES5 CommonJS, it must never `require()` the oracle directly, and its own ES5 compliance is not covered by any automated gate. This module documents those constraints so edits don't quietly reintroduce ES6+ syntax or break the subprocess-isolation design.

## Key Files

- `src/index.test.js` — the only test file permitted under `src/` (alongside `src/index.js` itself); uses Node's built-in `node:test` and `node:assert`.
- `src/index.js` — the oracle under test; must be spawned as a subprocess, never imported.
- `package.json` — `"test": "node --test"` (`package.json:9`), the only test runner invocation, zero third-party test framework.

## Patterns & Rules

1. **Tests must spawn the oracle as a subprocess — never `require()` it.** Confirmed at `src/index.test.js:8` (`childProcess.spawn('node', [indexPath])`). This preserves byte-level isolation between the test process and the oracle process (GUARDRAILS.md §2 rule 14). In-process module loading of `src/index.js` is prohibited.
2. **Use the callback (`done`) pattern — no Promises, no `async`/`await`, no arrow functions.** The existing test uses `function (t, done) { ... }` with `done()` called inside `proc.on('close', ...)` (`src/index.test.js:8-18`). GUARDRAILS.md §2 rule 15 makes this explicit and names it as required specifically because the automated ES5 gate does not scan this file.
3. **Assertions must be byte-exact.** The current test asserts `stdout === 'Hello, AI Coding Agent!\n'` and `code === 0` (`src/index.test.js:15-16`). Any new test assertions covering oracle behavior must preserve this byte-exact standard, not a loose/trimmed comparison.
4. **Only `node:test`, `node:assert`, `node:child_process`, and `node:path` may be used.** These are the exact built-ins already imported (`src/index.test.js:1-4`). No third-party test framework (Jest, Vitest, Mocha) may be introduced (MISSION.md "Out of Scope").
5. **`path.join(__dirname, ...)` for locating the oracle.** `src/index.test.js:6` builds `indexPath` this way — follow the same pattern for any new path construction rather than hardcoding relative strings.
6. **This is the only test file allowed to exist.** No second test file may be added under `src/` for any reason — helpers, fixtures, or test doubles included (MISSION.md hard invariant #6, GUARDRAILS.md §5 trigger 5).
7. **Never modify this file merely to make a failing test pass.** GUARDRAILS.md §2 rule 1 is explicit: if a test seems wrong, the fix belongs in the source, and any claim that the test itself is wrong will be scrutinised in the PR description.

## Gotchas

- `scripts/es5-check.js` never scans this file (`scripts/es5-check.js:12` targets `src/index.js` only) — so an ES6+ regression here (e.g., swapping in an arrow function callback) will pass every automated gate and only be caught by manual inspection.
- `npm test` exiting 0 with **no** file named in stdout is a false-pass state (GUARDRAILS.md §6 trap 2). Today `src/index.test.js` exists and is discovered, so this isn't currently an issue — but always confirm stdout names the file after any change, especially if a rename or move is ever proposed (which would itself violate the single-test-file invariant).
- Adding `t.skip`, `describe`/`it` blocks, or any structure beyond the flat `test(...)` call is unnecessary complexity for a one-test suite — keep it minimal per YAGNI.
