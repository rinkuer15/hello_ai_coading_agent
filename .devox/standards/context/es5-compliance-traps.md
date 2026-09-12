# ES5 Compliance Verification Traps

**When to load this:** Load before or after editing any `.js` file in this repo — especially `src/index.js` — or when asked to verify/confirm ES5 compliance.

## Overview

This repo mandates a strict ES5-only JavaScript surface, but the two automated tools that look like compliance gates (`node --check` and `scripts/es5-check.js`) each have real blind spots. Neither tool alone (nor both together) is a substitute for manual per-line inspection. This module documents exactly what each tool does and does not catch.

## Key Files

- `src/index.js` — the only file scanned by the automated ES5 gate; must be manually verified line-by-line
- `scripts/es5-check.js` — zero-dependency regex-based forbidden-token scanner; strips comments/strings then scans for 8 forbidden tokens (`scripts/es5-check.js:28-37`)

## Patterns & Rules

- `node --check src/index.js` is aliased as both `npm run lint` and `npm run type-check` (package.json:9-10) — it is V8 parse-only and accepts all of ES2022+ without error. **It is NOT an ES5 gate** (GUARDRAILS.md §6.1).
- `scripts/es5-check.js` only scans `src/index.js` (scripts/es5-check.js:12) — it does not cover itself or `src/index.test.js`. ES5 compliance for those two files must be verified manually.
- The strip-then-scan pipeline in `scripts/es5-check.js` does not strip regex literals (scripts/es5-check.js:4-6). A forbidden token appearing inside a regex literal (e.g. a pattern like `/const|let/`) can produce a false positive, or conversely mask a true negative if the token is disguised inside a literal that itself gets misparsed.
- Forbidden tokens checked: `const`, `let`, `=>`, backtick, `class`, `async`, `await`, `...` (scripts/es5-check.js:28-37).
- Full pre-PR validation requires running all four commands (`lint`, `type-check`, `es5-check`, `test`) **plus** manual steps that no tool automates: run `node src/index.js` and byte-verify stdout, inspect every `.js` line for ES5 compliance by eye, and verify the mandatory blank line (see `blank-line-oracle-invariant` module).

## Gotchas

- Don't conclude "ES5-compliant" just because `npm run lint` and `npm run type-check` pass — they are the same parse-only command under two names and prove nothing about language-level restrictions.
- Don't assume `npm run es5-check` passing covers `scripts/es5-check.js` itself or `src/index.test.js` — it explicitly does not.
- If you edit `scripts/es5-check.js`'s regex patterns, remember it does not strip regex literals from the source it scans — verify manually that no forbidden-token regex is itself misinterpreted.
