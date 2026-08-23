# How scripts/es5-check.js Works (Scanner Internals)

**When to load this:** Any task that modifies `scripts/es5-check.js`, adds new source files that should be scanned, interprets a failed `npm run es5-check` result, or needs to understand why a particular pattern does or does not trigger the checker.

## Overview

`scripts/es5-check.js` is a zero-dependency ES5 compliance scanner for `src/index.js`. It uses a strip-then-scan pipeline: first it removes constructs that legitimately contain ES6 keywords (comments, string literals, template literals), then it regex-scans the stripped source for 8 forbidden tokens. It is itself written in ES5-compatible CommonJS JavaScript. Its scope is hardcoded to `src/index.js` — it does not scan test files or any other source file.

## Key Files

- `scripts/es5-check.js` — The scanner implementation; CommonJS; zero dependencies; ES5 itself.
- `src/index.js` — The only file scanned; path resolved via `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`).

## Patterns & Rules

**Strip-then-scan pipeline** — Before scanning for forbidden tokens, the source is stripped in this order (`scripts/es5-check.js:16-26`):
1. Block comments (`/* ... */`) replaced with empty string
2. Line comments (`// ...` to end of line) replaced with empty string
3. Single-quoted strings (`'...'`) replaced with `''`
4. Double-quoted strings (`"..."`) replaced with `""`
5. Template literals (`` `...` ``) replaced with empty string

This prevents false positives from string or comment content that happens to contain ES6 keywords (e.g., a comment saying `// no const allowed`).

**8 forbidden token patterns** — After stripping, the source is scanned for these patterns (`scripts/es5-check.js:28-37`):
1. `\bconst\b` — block-scoped variable declaration
2. `\blet\b` — block-scoped variable declaration
3. `=>` — arrow function syntax
4. `` ` `` — template literal delimiter (also a stripping target; if any survive stripping, flagged here)
5. `\bclass\b` — ES6 class declaration
6. `\basync\b` — async function keyword
7. `\bawait\b` — await expression keyword
8. `\.\.\.` — spread/rest operator

Each pattern is tested independently. The first match causes an exit 1 with a descriptive error message. (`scripts/es5-check.js:39-45`.)

**Hardcoded target file** — `scripts/es5-check.js:12` constructs the path as `path.join(__dirname, '..', 'src', 'index.js')`. The checker cannot be invoked with a different target without modifying this line. It does not accept command-line arguments. (`CLAUDE.md §Development Notes`: "scripts/es5-check.js scans only src/index.js.")

**`path.join` + `__dirname` for path construction** — `scripts/es5-check.js:12` uses `path.join(__dirname, '..', 'src', 'index.js')` — never a hardcoded relative string. This is the implicit convention for all path construction in tooling files. (Architecture Assessment §Implicit Rules, item 5.)

**CommonJS `require` is intentional** — `scripts/es5-check.js:8-9` uses `var path = require('path'); var fs = require('fs');`. This is a tooling file under `scripts/`, not oracle source. The prohibition on `require` applies only to `src/index.js`. (`CLAUDE.md §Coding Rules`, item 3; Architecture Assessment §Key Patterns, "No module system in oracle".)

**Exit codes** — `scripts/es5-check.js:44-47`: failure path calls `console.error(msg)` then `process.exit(1)`; success path calls `console.log(msg)` then `process.exit(0)`. Both paths call `process.exit` explicitly rather than letting the process drain. (Architecture Assessment §Implicit Rules, item 4.)

**`fs.readFileSync` — synchronous I/O** — `scripts/es5-check.js:14` reads the source file synchronously. There is no async I/O anywhere in the checker. This follows the project-wide convention of synchronous execution only. (`CLAUDE.md §Key Conventions`, item 10.)

**`var i` loop pattern** — `scripts/es5-check.js:39` declares `var i;` on its own line before the `for` loop. The loop body iterates over the forbidden-tokens array. (Architecture Assessment §Implicit Rules, item 2.)

## Gotchas

**Regex literals are NOT stripped before scanning.** `scripts/es5-check.js:5-6` documents this known limitation: if source code contains a regex literal whose body includes a forbidden keyword — for example `/const|let/g` — the scanner will report a false positive for `const` or `let` even though the source is ES5-compliant. Conversely, this gap does not create false negatives for the tokens in the forbidden list, since the tokens (`const`, `let`, `=>`, etc.) would still appear verbatim after stripping. Manual inspection remains mandatory.

**Test files are outside the checker's scope.** When `src/index.test.js` is written, `npm run es5-check` will still exit 0 regardless of whether the test file uses ES6+ syntax. ES5 compliance in `src/index.test.js` must be verified by manual line-by-line inspection. (`GUARDRAILS.md §6`, item 7.)

**A passing `npm run es5-check` does not substitute for `npm run lint`.** The checker reads the file with `fs.readFileSync` and does regex matching — it does not invoke the JS parser and will not catch syntax errors. `node --check src/index.js` is still required to verify the file parses correctly. (Architecture Assessment §Build & Lint Commands.)

**The checker itself must remain ES5-compliant.** `scripts/es5-check.js` is part of the governed codebase. Any modification to it must use `var`, `function` declarations, `require`, single quotes, semicolons, and must not introduce any of the 8 forbidden tokens. However, `scripts/es5-check.js` is not in its own scan scope — compliance is verified only by manual inspection.

**Adding new source files does not automatically extend coverage.** If a second file under `src/` were ever added (which is an auto-reject action), the checker would still only scan `src/index.js`. Extending coverage would require modifying `scripts/es5-check.js:12` to loop over multiple targets.
