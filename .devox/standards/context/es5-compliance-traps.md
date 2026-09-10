# ES5 Compliance Traps

**When to load this:** Before editing any `.js` file in this repo (`src/index.js`, `scripts/es5-check.js`, or `src/index.test.js`).

## Overview

This project mandates ES5-only JavaScript syntax, but the tooling that's supposed to enforce this has two significant blind spots: `node --check` doesn't catch modern syntax at all, and the mandatory blank-line formatting requirement is invisible to every automated tool. Agents must know these traps exist before touching any source file, or they will silently introduce non-compliant changes that pass CI.

## Key Files

- `src/index.js` — the 5-line stdout oracle; structurally frozen, must remain ES5, and requires an exact blank line at line 4.
- `package.json` — defines `lint` and `type-check` scripts that both alias to `node --check src/index.js` (`package.json:9-10`).
- `scripts/es5-check.js` — the actual ES5 gate; a zero-dependency regex-based scanner (`scripts/es5-check.js:8-9,28-37`).

## Patterns & Rules

- `node --check` is parse-only (V8 syntax check) and accepts all of ES2022+ without error — it is **not** an ES5 gate despite being aliased to both `lint` and `type-check` (`package.json:9-10`).
- Only `npm run es5-check` provides real ES5 enforcement, via regex scanning for forbidden tokens: `const`, `let`, `=>`, backticks, `class`, `...`, destructuring, `async`/`await` (`scripts/es5-check.js:28-37`).
- `es5-check.js` scans **only** `src/index.js` (hardcoded path) — it does not cover `src/index.test.js` or itself (`scripts/es5-check.js:11`; `es5-checker-mechanics.md` for pipeline details).
- Required style in `src/index.js`: `function` declarations only (never expressions), `var` for all variables, single-quoted strings (`src/index.js:1-2`).
- Exactly one blank line must exist between the closing `}` of `main()` and the trailing `main();` call (`src/index.js:3-5`). This is load-bearing per governance docs but is not checked by any automated tool.
- Prettier, ESLint `--fix`, and VS Code "format on save" will silently delete this blank line — always re-verify byte layout after any edit, including edits made by other tooling.

## Gotchas

- Passing `npm run lint` and `npm run type-check` gives **zero** assurance of ES5 compliance — both commands are byte-identical and only catch outright syntax errors, not ES6+ features.
- After any edit to `src/index.js`, verify with `node src/index.js | xxd` that stdout is still exactly `48 65 6c 6c 6f 2c 20 41 49 20 43 6f 64 69 6e 67 20 41 67 65 6e 74 21 0a`, and manually inspect the file to confirm the blank line at line 4 survived.
- `es5-check.js`'s regex-strip pipeline does not strip regex literals, so a forbidden token appearing inside a regex literal could produce a false positive or mask a true negative (see `es5-checker-mechanics.md`).
- Because the gate only targets `src/index.js`, introducing ES6+ syntax into `scripts/es5-check.js` or `src/index.test.js` would go completely undetected by automation — manual review is the only safeguard.
