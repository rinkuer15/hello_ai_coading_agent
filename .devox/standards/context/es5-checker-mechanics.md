# ES5 Checker Mechanics

**When to load this:** Before modifying `scripts/es5-check.js` itself.

## Overview

`scripts/es5-check.js` is the project's only real ES5 enforcement gate — a zero-dependency, regex-based scanner that strips comments/strings and then scans for forbidden ES6+ tokens. Because it's hand-rolled rather than backed by a proper parser (e.g., an ESLint ES5 parser config), it has known mechanical gaps that any change to the script must not worsen.

## Key Files

- `scripts/es5-check.js` — the entire gate: reads `src/index.js` via `fs.readFileSync` (`scripts/es5-check.js:11`), strips comments/strings, then regex-scans for forbidden tokens (`scripts/es5-check.js:28-37`), and exits via `console.error` + `process.exit(1)` on failure or `process.exit(0)` on success (`scripts/es5-check.js:44-47`).

## Patterns & Rules

- The script is itself ES5-style: `var` declarations, `function` declarations, single-quoted strings, `path.join(__dirname, ...)` for path construction (`scripts/es5-check.js:8-9,12`).
- Loop style follows `var i; for (i = 0; ...)` — the loop variable is declared before the `for` statement, not inline (`scripts/es5-check.js:39`).
- The pipeline is strip-then-scan: comments and string literals are stripped first, then the remaining code is regex-matched against the forbidden-token list: `const`, `let`, `=>`, backticks, `class`, `...`, destructuring, `async`/`await` (`scripts/es5-check.js:28-37`).
- Error handling follows the tooling convention: `console.error` with a descriptive message, then explicit `process.exit(1)` on failure; explicit `process.exit(0)` (or equivalent) on success — never an uncaught throw (`scripts/es5-check.js:44-47`).
- The script hardcodes its target to `src/index.js` only (`scripts/es5-check.js:11`) — it deliberately does not scan `src/index.test.js` or itself.

## Gotchas

- The strip-then-scan pipeline does **not** strip regex literals — a forbidden token pattern appearing inside a regex literal (e.g. `/const|let/`) can produce a false positive or, worse, mask a true negative if the stripping logic misinterprets literal boundaries. Any change to the stripping logic must be manually tested against this edge case.
- Because the target path is hardcoded to `src/index.js`, extending the check to cover additional files (e.g. `src/index.test.js`) requires a deliberate scope change — do not assume "the ES5 gate" already covers all `.js` files in the repo.
- This script is a protected part of the public tooling surface (referenced by the frozen `es5-check` npm script in `package.json`) — changes to its CLI behavior (exit codes, output format) could break the "Full pre-PR validation gate" workflow documented in CLAUDE.md.
- Since there's no unit test suite for `es5-check.js` itself, any modification should be manually verified against both a compliant and a non-compliant version of `src/index.js` to confirm pass/fail behavior still works correctly.
