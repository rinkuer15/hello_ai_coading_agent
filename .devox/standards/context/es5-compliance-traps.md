# ES5 Compliance Traps

**When to load this:** Editing any `.js` file in this repository (`src/index.js` or `scripts/es5-check.js`) — before making the edit and again before considering it done.

## Overview

ES5 compliance in this repo cannot be verified by any single automated command. `node --check` only checks parse-validity, not language-version, and the custom `scripts/es5-check.js` gate has a known blind spot for regex literals. This module exists so agents don't rely on a false sense of security from a passing `npm run lint`.

## Key Files

- `src/index.js` — the only runtime file; must remain pure ES5 (`var`, `function` declarations, single-quoted strings).
- `scripts/es5-check.js` — the automated forbidden-token scanner; strips comments/strings before scanning but not regex literals.

## Patterns & Rules

- `node --check src/index.js` (used for both `npm run lint` and `npm run type-check`) accepts ES2022+ syntax without error — it is parse-only, not an ES5 gate (`package.json:8-9`, confirmed by direct comparison showing both scripts are byte-identical).
- `scripts/es5-check.js` strips block comments, line comments, and string literals before regex-scanning for forbidden tokens (`const`, `let`, `=>`, backtick, `class`, `...`, destructuring, `async`/`await`) but does **not** strip regex literals (`scripts/es5-check.js:3-5, 16-26`). A regex literal like `/const|let/` inside source would produce a false positive from the scanner.
- The gate only scans `src/index.js` — it never scans `scripts/es5-check.js` itself or `src/index.test.js` (`scripts/es5-check.js:12`, hardcoded target path).
- Forbidden ES6+ tokens apply equally to `src/` and `scripts/` files: `const`, `let`, `=>`, template literals (`` ` ``), `class`, spread/rest (`...`), destructuring, `async`/`await` (`scripts/es5-check.js:28-37`).
- Required patterns: `var` for all declarations, `function` declarations (never expressions), single-quoted strings, `var i; for (i = 0; ...)` loop style (`scripts/es5-check.js:8-9, 39`).

## Gotchas

- **Blank-line deletion trap**: the mandatory single blank line between `main()`'s closing `}` and `main();` in `src/index.js:3-5` is silently deleted by Prettier, ESLint `--fix`, and VS Code "format on save." After any edit, verify byte-level structure with `node src/index.js | xxd` or by viewing raw file content — do not trust a formatter-processed diff.
- A passing `npm run es5-check` plus a passing `npm run lint` is still **not** sufficient proof of ES5 compliance — manual line-by-line inspection of every touched `.js` line is required because of the regex-literal gap above.
- Since the checker never scans `src/index.test.js`, any ES6+ syntax accidentally introduced there (e.g., via `let`, arrow functions, template literals) will not be caught by `npm run es5-check` — only manual review catches it.
