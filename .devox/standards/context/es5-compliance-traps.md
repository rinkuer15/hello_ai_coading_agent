# ES5 Compliance Verification Traps

**When to load this:** Editing any `.js` file in this repo, especially `src/index.js` — before trusting `npm run lint`/`type-check` or any formatter/auto-fix output as proof of compliance.

## Overview

This repo requires strict ES5-only syntax in `src/index.js`, but the tools named "lint" and "type-check" do not actually enforce this — they are both `node --check src/index.js` (`package.json:9-10`), which is V8 parse-only and accepts ES2022+ syntax without error. Compliance can only be verified by running `npm run es5-check` (`package.json:11` → `scripts/es5-check.js`) plus manual line-by-line inspection. A second, unrelated trap is that formatters silently delete the mandatory blank line in the oracle file.

## Key Files

- `src/index.js` — the 5-line oracle; every edit here must be manually re-verified for ES5 compliance and the blank-line rule
- `package.json` — defines `lint` and `type-check` as byte-identical `node --check` commands (`package.json:9-10`)
- `scripts/es5-check.js` — the actual ES5 gate (see the `es5-checker-mechanics` module for its internals)

## Patterns & Rules

- `npm run lint` and `npm run type-check` are literally the same command: `node --check src/index.js` (`package.json:9-10`). Passing this proves only that the file parses as valid JavaScript under the current Node/V8 version — it says nothing about ES5-ness.
- The real ES5 gate is `npm run es5-check` → `node scripts/es5-check.js` (`package.json:11`), which regex-scans for 8 forbidden tokens: `const`, `let`, `=>`, backtick, `class`, `async`, `await`, `...` (`scripts/es5-check.js:24-32`).
- `src/index.js` must retain exactly one blank line between the closing `}` of `main()` (line 3) and the `main();` call (line 5) (`src/index.js:3-5`). This blank line is not decorative — it is a structural invariant tested by governance, and Prettier/ESLint `--fix`/"format on save" will collapse it silently.
- After any edit to `src/index.js`, verify the blank line survived with `node src/index.js | xxd` or by viewing the raw file — do not trust an editor's rendered view, which can mask a missing blank line.
- `es5-check.js` only scans `src/index.js` (`scripts/es5-check.js:11`: `path.join(__dirname, '..', 'src', 'index.js')`). It does not cover `src/index.test.js` or itself — ES5 compliance for those two files must be verified by manual inspection, not by any automated command.

## Gotchas

- Running only `npm run lint && npm run type-check` and declaring the file "ES5 compliant" is a false pass — both commands are `node --check`, which accepts modern syntax fine. Always also run `npm run es5-check`.
- A formatter or IDE auto-save that reformats `src/index.js` can merge/remove the blank line between `}` and `main();` without triggering any test failure elsewhere, since no automated check currently asserts on blank-line count. Manual byte inspection is the only safeguard.
- Regex literals are not stripped by the checker's strip pipeline, so a forbidden token appearing inside a regex literal in `src/index.js` could produce a false positive or false negative (`scripts/es5-check.js:4-6` comment; see the `es5-checker-mechanics` module for detail). Not currently an issue since `src/index.js` contains no regex literals, but relevant if the file is ever changed.
