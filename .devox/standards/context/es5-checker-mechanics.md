# ES5 Checker Strip-and-Scan Pipeline

**When to load this:** Modifying `scripts/es5-check.js` itself, or diagnosing why the ES5 gate passed/failed unexpectedly.

## Overview

`scripts/es5-check.js` is a zero-dependency, regex-based static scanner that is the sole automated enforcement of ES5-only syntax in this repo. It works by stripping comments and string literals from the source, then testing the remainder against 8 forbidden-token patterns. It scans only `src/index.js` and has a known, documented gap around regex literals.

## Key Files

- `scripts/es5-check.js` — the entire checker, ~45 lines, CommonJS, ES5-style itself (`var`, `function`-free top-level script)

## Patterns & Rules

- Target file resolution: `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:11`) — this hardcodes the scan to `src/index.js` only; no other file is ever scanned by this script.
- Strip order (`scripts/es5-check.js:16-23`):
  1. Block comments: `/\/\*[\s\S]*?\*\//g`
  2. Line comments: `/\/\/[^\n]*/g`
  3. Single-quoted strings: `/'(?:[^'\\]|\\.)*'/g`
  4. Double-quoted strings: `/"(?:[^"\\]|\\.)*"/g`
  5. Template literals (backtick strings): `/\`(?:[^\`\\]|\\.)*\`/g` — stripped to avoid false positives on their *contents*, but the mere presence of a backtick is itself checked separately and is a violation
- Forbidden-token list, tested against the stripped source (`scripts/es5-check.js:25-33`): `const`, `let`, `=>`, backtick (`` ` ``), `class`, `async`, `await`, `...` (spread/rest).
- Exit behavior: any match → `console.error(...)` + `process.exit(1)`; zero matches → `console.log('ES5 check passed.')` + `process.exit(0)` (`scripts/es5-check.js:39-44`). Both paths exit explicitly — no implicit fall-through.
- Known limitation, stated in the file's own header comment: "Regex literals are not stripped before scanning. A regex containing a forbidden keyword could produce a false positive." (`scripts/es5-check.js:3-5`). In practice this doesn't matter today because `src/index.js` has no regex literals — but it means the checker's soundness is conditional, not absolute.
- Loop variable declared before the `for` statement — `var i; for (i = 0; ...)` (`scripts/es5-check.js:35-36`) — is itself an example of the ES5 style this script's own code follows.

## Gotchas

- Because only `src/index.js` is scanned, adding ES6+ syntax to `scripts/es5-check.js` itself or to `src/index.test.js` will NOT be caught by `npm run es5-check`. Manual review is mandatory for those two files.
- The strip pipeline processes comments before strings; a comment containing what looks like a string delimiter, or a string containing what looks like a comment delimiter, could interact in surprising ways. No known bug has been observed, but this is a place to look first if the checker's pass/fail output seems wrong for the current content of `src/index.js`.
- Do not "fix" the regex-literal gap by adding regex-literal handling unless explicitly asked — `scripts/es5-check.js` is a small, deliberately minimal tool, and unrequested feature additions are out of scope per repo governance (MISSION.md).
