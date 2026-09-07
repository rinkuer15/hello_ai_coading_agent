# ES5 Compliance Traps and False-Pass Gaps

**When to load this:** Editing any `.js` file in this repo (`src/index.js`, `src/index.test.js`, or `scripts/es5-check.js`) — before assuming a passing `npm run lint`/`npm run type-check` means the code is ES5-safe.

## Overview

This project's core invariant is that all `.js` files are ES5-only, but the tooling that "checks" this is easy to mistake for a real gate. `node --check` only parses syntax and happily accepts ES2022+ code, and the dedicated `scripts/es5-check.js` regex gate has a documented blind spot around regex literals. There is also a structural, formatter-erasable invariant (a mandatory blank line) that automated tools do not protect. This module exists to make these traps explicit so an agent doesn't treat "the commands passed" as proof of correctness.

## Key Files

- `src/index.js` — the 5-line runtime oracle; the only file with a hard structural shape requirement (blank line between `main()`'s closing `}` and `main();`)
- `scripts/es5-check.js` — the only automated ES5 gate; scans **only** `src/index.js`

## Patterns & Rules

- `node --check src/index.js` is used for both `npm run lint` and `npm run type-check` (`package.json` scripts — byte-identical commands) and is parse-only — it accepts ES2022+ syntax without error. It is **not** an ES5 gate (documented at `scripts/es5-check.js` header, lines 3-5).
- `scripts/es5-check.js` only reads and scans `src/index.js` (`scripts/es5-check.js:12`, `path.join(__dirname, '..', 'src', 'index.js')`). `src/index.test.js` is completely outside its scope and must be verified manually for ES5 compliance.
- `scripts/es5-check.js` strips block comments, line comments, and string literals before regex-scanning for forbidden tokens (`const`, `let`, `=>`, backtick, `class`, `...`, destructuring, `async`/`await` — `scripts/es5-check.js:28-37`), but it does **not** strip regex literals first. A regex literal such as `/const|let/` would produce a false positive against the scanner (documented limitation, lines 3-5).
- `src/index.js:3-4` requires exactly one blank line between the closing `}` of `main()` and the `main();` invocation call (`src/index.js:3-5`). This is a structural invariant, not a style preference — see `CLAUDE.md` Core Code Pattern 2 and `GUARDRAILS.md` §2 rule 12.
- The blank line is silently removed by Prettier, `eslint --fix`, or VS Code "format on save" — none of these tools understand that the blank line is meaningful. No automated command in the pre-PR gate checks for its presence.

## Gotchas

- Passing `npm run lint && npm run type-check && npm run es5-check && npm test` does **not** prove ES5 compliance or structural correctness on its own — it proves syntax validity, absence of the 8 known forbidden tokens in `src/index.js` only, and behavioral correctness. Manual per-line inspection of every `.js` file, plus a blank-line check, is still required.
- Verify the blank line survived any edit by running `node src/index.js | xxd`-style byte inspection or directly viewing the file — do not trust that an editor or formatter left it intact.
- If you ever add logic to `scripts/es5-check.js` that includes a regex literal containing forbidden-token substrings (e.g., `/const/`), be aware the checker will not strip it and may flag itself or produce misleading results.
