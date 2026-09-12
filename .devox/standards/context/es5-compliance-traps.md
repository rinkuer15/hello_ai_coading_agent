# ES5 Compliance Traps and Verification Gaps

**When to load this:** Before or after editing any `.js` file in this repo (`src/index.js`, `src/index.test.js`, or `scripts/es5-check.js`), or when asked to verify/prove ES5 compliance.

## Overview

This repo enforces an ES5-only JavaScript surface as a hard invariant (MISSION.md "Hard Invariants" #3), but the available automated tooling only partially verifies it. Two independent gaps mean automated tool output can look clean while ES6+ syntax is actually present. This module exists to keep those gaps out of CLAUDE.md's top-level summary while ensuring they are never missed in practice.

## Key Files

- `src/index.js` — the only file the automated ES5 gate (`scripts/es5-check.js`) actually scans.
- `scripts/es5-check.js` — regex-based forbidden-token scanner; itself has a known blind spot (see below).
- `src/index.test.js` — ES5 compliance here is **never** checked by any automated tool; manual-only.
- `package.json` — defines `lint` and `type-check` as the identical command `node --check src/index.js` (`package.json:8-9`).

## Patterns & Rules

1. **`node --check` is not an ES5 gate.** It is V8's parser and happily accepts ES2022+ syntax (`const`, `let`, arrow functions, classes, etc.). `npm run lint` and `npm run type-check` both resolve to `node --check src/index.js` (`package.json:8-9`) and passing them proves nothing about ES5 compliance (GUARDRAILS.md §6.1, §2 rule 8).
2. **Only two things together provide the ES5 guarantee:** running `npm run es5-check` (`scripts/es5-check.js`) AND manually inspecting every line of every touched `.js` file. Neither alone is sufficient (GUARDRAILS.md §3 gate 8).
3. **`scripts/es5-check.js` only scans `src/index.js`** (`scripts/es5-check.js:11` — `target` is hardcoded to `path.join(__dirname, '..', 'src', 'index.js')`). It does not scan `src/index.test.js` or itself. ES5 compliance for those two files must be verified by manual read-through only (GUARDRAILS.md §6.7).
4. **The regex-strip pipeline does not strip regex literals** (`scripts/es5-check.js:1-5` header comment, confirmed in code at lines 15-24 which strip block comments, line comments, single/double-quoted strings, and template literals — but never `/.../ ` regex literals). A forbidden keyword embedded inside a regex literal (e.g. `/const|let/`) could produce a false positive, or in theory mask a true negative if a forbidden token were disguised inside a regex pattern that itself gets treated as inert text (GUARDRAILS.md §6.5).
5. **Forbidden token list is exactly 8 patterns:** `const`, `let`, `=>`, backtick, `class`, `async`, `await`, `...` (`scripts/es5-check.js:28-37`). There is no explicit destructuring-pattern check — destructuring performed without the `const`/`let` keyword (e.g. plain assignment-style array/object destructuring) would not be caught by this list. This is a real gap between the tool's actual coverage and what CLAUDE.md/MISSION.md describe in prose.
6. **The mandatory blank line in `src/index.js` is a separate but related trap.** Exactly one blank line must exist between `main()`'s closing `}` (line 3) and `main();` (line 5) (`src/index.js:3-5`). Prettier, ESLint `--fix`, Biome, and VS Code "format on save" silently delete this line (GUARDRAILS.md §6.3). Verify with `xxd` or `cat -A` after every edit, not just visual inspection.

## Gotchas

- Seeing `npm run lint` and `npm run type-check` both pass can create false confidence — they are literally the same command run twice, and neither is an ES5 gate.
- Adding a regex literal to `src/index.js` (unlikely given its 5-line scope, but relevant if ever extended) would go unverified by the automated tool — this is an accepted, documented gap, not something to "fix" by modifying `scripts/es5-check.js` without going through GUARDRAILS.md's process (it's listed as an allowed enhancement, but only if zero-dependency and ES5 style are preserved — see GUARDRAILS.md §1 "Accept").
- Never assume `src/index.test.js` is ES5-compliant just because `npm run es5-check` exited 0 — that command never touches the test file.
