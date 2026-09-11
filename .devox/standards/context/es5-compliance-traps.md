# ES5 Compliance Traps and Verification Gaps

**When to load this:** Before or after editing `src/index.js` (or any `.js` file), or when asked to verify/prove ES5 compliance for this repo.

## Overview

This repo's entire value proposition rests on `src/index.js` staying byte-stable, structurally frozen, and strictly ES5. The tooling that is supposed to guarantee this (`node --check`, `npm run lint`, `npm run type-check`) does **not** actually enforce ES5 — it only checks that V8 can parse the file, and V8 happily parses ES2022+. This module documents the gap between what looks like enforcement and what actually is, plus the specific failure modes an agent is likely to trigger.

## Key Files

- `src/index.js` — the 5-line oracle; must remain `function` declaration + `var`-free (it has no vars) + single quotes + exact blank-line structure.
- `scripts/es5-check.js` — the only tool that actually checks for forbidden ES6+ tokens; scans `src/index.js` only.
- `package.json` — defines `lint` and `type-check` scripts, both aliased to `node --check src/index.js`.

## Patterns & Rules

- `npm run lint` and `npm run type-check` are both literally `node --check src/index.js` (`package.json:9-10`) — this is parse-only syntax validation, not an ES5 gate. Passing these two commands proves nothing about ES5 compliance.
- The only automated ES5 gate is `npm run es5-check`, which runs `scripts/es5-check.js`. It strips comments/strings via regex and then regex-scans for 8 forbidden tokens: `const`, `let`, `=>`, backticks, `class`, `async`, `await`, `...` (`scripts/es5-check.js:28-37`).
- `scripts/es5-check.js` scans `src/index.js` only (`scripts/es5-check.js:12`, resolving via `path.join(__dirname, '..', 'src', 'index.js')`). It never scans `src/index.test.js` or itself — ES5 compliance for those two files must be verified manually, line by line.
- The mandatory blank line between the closing `}` of `main()` and the `main();` call (`src/index.js:3-5`) is a structural requirement, not a style preference. It is silently deleted by Prettier, `eslint --fix`, and VS Code's "format on save." After any edit to `src/index.js`, verify the blank line survived — do not trust that your editor left it alone.
- Full pre-PR validation requires `npm run lint && npm run type-check && npm run es5-check && npm test` **plus** manual steps that no command can substitute for: byte-verify stdout, inspect every line for ES5 compliance, and confirm the blank line is still present.

## Gotchas

- Passing `node --check` gives false confidence — it will accept `const`, arrow functions, template literals, and all other ES6+ syntax without complaint. Never treat a clean `node --check` as proof of ES5 compliance.
- `scripts/es5-check.js`'s regex-based strip pipeline does not strip regex literals. A pattern like `/const|let/` written as an actual regex literal inside the source can produce a false positive (flagged as violation) or, worse, mask a true negative if the stripping logic misparses it. Always manually re-inspect the file after any edit, even if `es5-check` reports success.
- Byte-verifying stdout is not optional cosmetics — use `node src/index.js | xxd` and confirm the exact hex sequence `48 65 6c 6c 6f 2c 20 41 49 20 43 6f 64 69 6e 67 20 41 67 65 6e 74 21 0a`. A trailing space, extra newline, or different quote style can slip through `node --check` and `es5-check` entirely.
