# ES5 Checker Mechanics

**When to load this:** Any task that modifies `scripts/es5-check.js`, interprets a failed `npm run es5-check` result, or needs to understand why a particular source pattern does or does not trigger the checker.

## Overview

`scripts/es5-check.js` is a zero-dependency ES5 compliance scanner for `src/index.js`. It uses a strip-then-scan pipeline: first it removes constructs that legitimately contain ES6 keywords (comments, string literals, template literals), then it regex-scans the stripped source for 8 forbidden tokens. It is written in ES5-compatible CommonJS JavaScript. Its scope is hardcoded to `src/index.js` — it does not scan test files or any other source file.

## Key Files

- `scripts/es5-check.js` — The scanner implementation; CommonJS; zero dependencies; ES5 itself.
- `src/index.js` — The only file scanned; path resolved via `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`).

## Patterns & Rules

**Strip-then-scan pipeline** — Before scanning for forbidden tokens, the source is stripped in this exact order (`scripts/es5-check.js:15-26`):
1. Block comments (`/* ... */`) → empty string
2. Line comments (`// ...` to end of line) → empty string
3. Single-quoted strings (`'...'`) → `""`
4. Double-quoted strings (`"..."`) → `""`
5. Template literals (`` `...` ``) → `""`

This prevents false positives from comments or string content that happens to contain ES6 keywords (e.g., a comment saying `// no const allowed`).

**8 forbidden token patterns** — After stripping, the source is scanned for these patterns (`scripts/es5-check.js:28-37`):
1. `\bconst\b` — block-scoped variable declaration
2. `\blet\b` — block-scoped variable declaration
3. `=>` — arrow function syntax
4. `` ` `` — template literal delimiter (also stripped above; any surviving backtick is flagged)
5. `\bclass\b` — ES6 class declaration
6. `\basync\b` — async function keyword
7. `\bawait\b` — await expression keyword
8. `\.\.\.` — spread/rest operator

All patterns are tested; all failures are collected before exit. If any fail, `console.error` lists them and `process.exit(1)` is called (`scripts/es5-check.js:43-45`).

**Hardcoded target file** — `scripts/es5-check.js:12` constructs the path as `path.join(__dirname, '..', 'src', 'index.js')`. The checker does not accept command-line arguments. (`CLAUDE.md §Architecture Deep-Dive`, item 4.)

**`path.join` + `__dirname` for path construction** — `scripts/es5-check.js:12` uses `path.join(__dirname, '..', 'src', 'index.js')` — never a hardcoded relative string. (`CLAUDE.md §Core Code Patterns`, item 4.)

**CommonJS `require` is intentional** — `scripts/es5-check.js:8-9` uses `var fs = require('fs'); var path = require('path');`. This is a tooling file under `scripts/`, not oracle source. The prohibition on `require` applies only to `src/index.js`. (`CLAUDE.md §Core Code Patterns`, item 6.)

**Exit codes** — `scripts/es5-check.js:43-47`: failure path calls `console.error(msg)` then `process.exit(1)`; success path calls `console.log(msg)` then `process.exit(0)`. Both paths call `process.exit` explicitly. (Architecture Assessment §Implicit Rules, "Both success and failure paths call `process.exit` explicitly.")

**`fs.readFileSync` — synchronous I/O** — `scripts/es5-check.js:13` reads the source file synchronously. No async I/O anywhere in the checker.

**`var i` loop pattern** — `scripts/es5-check.js:39` declares `var i;` on its own line before the `for` loop. (`CLAUDE.md §Core Code Patterns`, item 5.)

**The checker must itself remain ES5-compliant** — Any modification to `scripts/es5-check.js` must use `var`, `function` declarations, `require`, single quotes, and semicolons — none of the 8 forbidden tokens. The checker is not in its own scan scope; compliance is verified only by manual inspection.

## Gotchas

**Regex literals are NOT stripped before scanning.** `scripts/es5-check.js:3-6` documents this known limitation: a regex literal whose body includes a forbidden keyword (e.g., `/const|let/g`) would produce a false positive. Conversely, this gap does not create false negatives — the tokens still appear verbatim in stripped source. Manual inspection remains mandatory.

**Test files are outside the checker's scope.** `npm run es5-check` will exit 0 regardless of whether `src/index.test.js` uses ES6+ syntax. ES5 compliance in `src/index.test.js` must be verified by manual line-by-line inspection. (`CLAUDE.md §Architecture Deep-Dive`, item 4.)

**A passing `npm run es5-check` does not substitute for `npm run lint`.** The checker does regex matching, not JS parsing. `node --check src/index.js` is still required to verify the file parses correctly.

**Adding new source files does not extend coverage.** The checker hardcodes `src/index.js`. If a second `.js` file were added under `src/` (itself an auto-reject action), the checker would still only scan `src/index.js`. Extending coverage would require modifying `scripts/es5-check.js:12`.

**Destructuring is not in the forbidden token list.** A destructuring assignment using `var` (e.g., `var {a} = obj`) would not be caught. Manual inspection is the only gate for this pattern.
