# ES5 Compliance Traps

**When to load this:** Load this before editing `src/index.js` or any other `.js` file, or when asked to verify/prove ES5 compliance.

## Overview

This project mandates a strict ES5-only language surface, but the tooling that would normally enforce this (`node --check`) does not actually check for it. On top of that, `src/index.js` has a structurally mandatory blank line that common formatters silently delete. Both are subtle, code-level traps that only matter at the moment of editing a `.js` file — they don't belong in the always-loaded CLAUDE.md.

## Key Files

- `src/index.js` — the 5-line oracle; structurally frozen (`function main() {...}`, one blank line, `main();`)
- `scripts/es5-check.js` — the only real automated ES5 gate; regex-based, zero dependencies

## Patterns & Rules

- **`node --check` is a V8 parser pass only, not an ES5 gate.** `npm run lint` and `npm run type-check` are both literally `node --check src/index.js` (`package.json:9-10`). V8 happily parses ES2022+ syntax, so a passing lint/type-check tells you nothing about ES5 compliance (GUARDRAILS.md §6 item 1; §2 rule 8).
- **The real gate is `npm run es5-check`**, which runs `scripts/es5-check.js`. It strips block comments, line comments, single/double-quoted strings, and template literals (`scripts/es5-check.js:20-28`), then regex-scans the stripped source for 8 forbidden tokens: `const`, `let`, `=>`, backtick, `class`, `async`, `await`, and `...` (`scripts/es5-check.js:30-39`).
- **`scripts/es5-check.js` scans only `src/index.js`** (`scripts/es5-check.js:12`: `path.join(__dirname, '..', 'src', 'index.js')`). It does not scan `src/index.test.js` or itself. ES5 compliance in those files must be verified manually (GUARDRAILS.md §6 item 7).
- **Exactly one blank line is required between the closing `}` of `main()` and the `main();` call** in `src/index.js` (currently lines 3 and 5, with line 4 blank). This is a hard structural requirement (CLAUDE.md rule 2; GUARDRAILS.md §2 rule 12, §3 gate 6, §5 trigger 11).
- **Prettier, ESLint `--fix`, Biome, and VS Code "format on save" silently delete this blank line** (GUARDRAILS.md §6 item 3). Verify with `node src/index.js | xxd` (byte-level) or `cat -A` / manual inspection after every edit — do not trust a diff view alone.
- **No formatter config may be added** (`.prettierrc`, `biome.json`, `eslint.config.*`) specifically because it would trigger this deletion (GUARDRAILS.md §1 Reject list).
- Forbidden ES6+ tokens apply to `src/` and `scripts/` equally (CLAUDE.md rule 3): no `const`, `let`, `=>`, template literals, `class`, destructuring, spread/rest, `async`/`await`. Use `function` declarations and `var` only (CLAUDE.md rules 3-4).

## Gotchas

- Seeing `npm run lint` or `npm run type-check` pass and reporting "ES5 compliant" as a result is a documented compliance failure — always run `npm run es5-check` too, and still manually inspect every changed line (GUARDRAILS.md §8, "Communication Style").
- `scripts/es5-check.js`'s own regex-strip pipeline does not strip regex literals before scanning (`scripts/es5-check.js:3-5` comment header). A regex literal like `/const|let/` inside source could produce a false positive or mask a true negative — manual inspection is the only safeguard (GUARDRAILS.md §6 item 5).
- The blank-line check has no automated verification step in `package.json` — it must be checked manually via `xxd`/`cat -A` every time `src/index.js` is touched.
