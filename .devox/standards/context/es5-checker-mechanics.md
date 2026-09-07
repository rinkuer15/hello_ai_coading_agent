# ES5 Checker Internals and Known Gaps

**When to load this:** Modifying `scripts/es5-check.js` itself, or needing to understand exactly what the automated ES5 gate does and does not verify.

## Overview

`scripts/es5-check.js` is the single automated ES5 compliance gate in this project: a zero-dependency, regex-based scanner that strips comments and strings before checking for a fixed list of 8 forbidden ES6+ tokens. It is deliberately simple and has documented scope limits — it only scans one file, and it has a known blind spot for regex literals. Understanding its internal pipeline is necessary before making any change to it, since a broken checker would silently stop protecting the oracle.

## Key Files

- `scripts/es5-check.js` — the entire ES5 gate implementation; itself written in ES5-style CommonJS

## Patterns & Rules

- The script requires only Node built-ins: `var fs = require('fs');` (`scripts/es5-check.js:8`) — no third-party dependencies, consistent with the project's zero-dependency invariant.
- Path to the scanned file is built via `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`) — this hardcodes the scan target to **only** `src/index.js`. It does not scan `src/index.test.js` or itself.
- The pipeline is strip-then-scan: block comments, line comments, and string literals are stripped from the source text first, and only then is the remaining text regex-scanned for the 8 forbidden tokens (`const`, `let`, `=>`, backtick, `class`, `...`, destructuring, `async`/`await` — `scripts/es5-check.js:28-37`).
- The strip step does **not** remove regex literals before scanning (documented limitation at the top of the file, lines 3-5). A regex literal like `/const|let/` embedded in source would still contain the literal substrings and could trigger a false positive.
- On failure, the script writes to `console.error` and calls `process.exit(1)`; on success it calls `process.exit(0)` (`scripts/es5-check.js:44-47`) — both paths exit explicitly, per the project's tooling error-handling convention (`CLAUDE.md` Core Code Pattern 3).
- The script itself follows the ES5 conventions it enforces: `var i; for (i = 0; ...)` loop with pre-declared index (`scripts/es5-check.js:39`), `var` declarations throughout, `function` declarations.

## Gotchas

- Because the scan target path is hardcoded to `src/index.js` only, adding a second source file anywhere under `src/` (which is itself prohibited by `MISSION.md` Hard Invariant 6) would not be caught by this checker even if it were ES6+ — the checker's scope is a single hardcoded path, not a glob over `src/`.
- If `scripts/es5-check.js` is ever edited to add its own regex literals for pattern matching, be aware that self-scanning is not performed (it only scans `src/index.js`), so this particular gap only matters if the checker's scan target or logic changes to include itself or other files.
- Any change to the 8-token forbidden list or the strip pipeline directly changes what "ES5 compliant" means for this project — treat such changes as security/process-critical, not routine refactors.
