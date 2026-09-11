# ES5 Compliance Traps

**When to load this:** Any task that edits `src/index.js` (or reviews a diff against it) — before making the edit and again immediately after, to verify the change is still ES5-compliant and structurally intact.

## Overview

`src/index.js` is a 5-line ES5 program that must remain byte-stable in shape: a `function main() {}` declaration, one `console.log` statement, exactly one blank line, then `main();`. Two traps make this harder than it looks: (1) the standard `node --check` command does **not** actually enforce ES5 syntax, and (2) the mandatory blank line at the end of the file is routinely deleted by autoformatters. This module exists because CLAUDE.md's summary rule isn't enough to stop an agent from tripping either trap in practice.

## Key Files

- `src/index.js` — the 5-line oracle; every line's shape is a hard constraint (lines 1–5: `function main() {`, `console.log(...)`, `}`, blank, `main();`).
- `scripts/es5-check.js` — the only automated gate for ES5 compliance, and it only scans `src/index.js`.
- `package.json` — defines `lint` and `type-check` scripts as the *same* command (`node --check src/index.js`), which is a false-security signal.

## Patterns & Rules

1. **`node --check` is parse-only, not an ES5 gate.** V8 happily parses `const`, `let`, arrow functions, template literals, `class`, `async`/`await`, and spread/rest — none of these fail `node --check`. `package.json:9-10` maps both `lint` and `type-check` to `node --check src/index.js`, so passing both scripts proves nothing about ES5 compliance on its own.
2. **The mandatory blank line is at `src/index.js:4`**, between the closing `}` of `main()` (line 3) and the `main();` call (line 5). This exact single blank line is a hard structural requirement (CLAUDE.md rule 2). Prettier, ESLint `--fix`, and VS Code "format on save" will silently collapse or remove it.
3. **Only `npm run es5-check` (`scripts/es5-check.js`) catches forbidden ES6+ tokens**, and it does so via a strip-then-regex-scan pipeline that checks for `const`, `let`, `=>`, backticks, `class`, `async`, `await`, and `...` (`scripts/es5-check.js:27-36`). It does not check for destructuring patterns, `let`-style block scoping edge cases, or the blank-line rule at all.
4. **The blank line is invisible to every automated tool** — `es5-check.js` never inspects line count or whitespace layout, and `node --check` doesn't care about blank lines. The only way to catch a deleted blank line is manual inspection or a byte-level diff (e.g., `xxd`).
5. **Every other `.js` file in the repo (`scripts/es5-check.js`, `src/index.test.js`) must also stay ES5-only** per CLAUDE.md rule 1, but neither is covered by the automated `es5-check` gate — see the `es5-checker-mechanics` module for why.

## Gotchas

- Running `npm run lint && npm run type-check && npm run es5-check && npm test` all passing is **not sufficient proof** of full compliance — you must still manually re-open `src/index.js` and confirm the blank line survived your edit and the tool run.
- If you use any code-formatting tool (even indirectly through an editor extension) on `src/index.js`, always re-check the file afterward — formatters are the most common source of the blank-line deletion bug in practice.
- A regex literal inside `src/index.js` containing a forbidden keyword substring (e.g., `/const|let/`) could produce a false positive or, worse, mask a true negative in `es5-check.js`, since regex literals aren't stripped before scanning (`scripts/es5-check.js:3-5`). This is currently moot because `src/index.js` contains no regex literals — but don't add one without re-verifying the checker's behavior.
