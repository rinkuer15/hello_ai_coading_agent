# The Load-Bearing Blank Line in index.js

**When to load this:** Load before or immediately after making ANY edit to `src/index.js`, or whenever a formatter, linter `--fix`, or "clean up this file" request touches that file.

## Overview

`src/index.js` has a hard structural requirement: exactly one blank line between the closing `}` of `main()` and the `main();` invocation on line 5 (src/index.js:1-5). This blank line carries no semantic meaning to the JS engine, which is precisely what makes it dangerous — common automated formatters (Prettier, ESLint `--fix`, VS Code "format on save") will silently collapse or remove it, corrupting the byte-stable oracle without producing any syntax error.

## Key Files

- `src/index.js` — the only file where this invariant applies; 5 lines total, blank line is line 4

## Patterns & Rules

- The file's frozen shape: `function main() {` at line 1, function body, closing `}`, then a blank line 4, then `main();` at line 5 (src/index.js:1-5, per CLAUDE.md "Architecture Deep-Dive" §2).
- This is listed explicitly as a core code pattern: "Mandatory blank line in oracle" (CLAUDE.md "Core Code Patterns" #2) — described as "Silently deleted by Prettier/ESLint `--fix`/VS Code 'format on save' — verify with `xxd` after every edit."
- Verification method: run `node src/index.js | xxd` and confirm the byte sequence is exactly `48 65 6c 6c 6f 2c 20 41 49 20 43 6f 64 69 6e 67 20 41 67 65 6e 74 21 0a` — but note this only verifies stdout bytes, not the source file's blank-line structure. To verify the blank line itself, inspect the raw file content (e.g. view the file or use a line-count/line-content check) and confirm line 4 is empty and line 5 is `main();`.
- Do not run any formatter, linter autofix, or IDE "format on save" against `src/index.js`. If a task requires touching this file, make the surgical edit by hand and re-check the line structure afterward.

## Gotchas

- A file that still passes `node --check`, `es5-check`, and `npm test` can still have silently lost its blank line if a formatter touched it — none of those tools check for the blank line's presence. This is a purely structural/stylistic invariant enforced only by manual inspection.
- Because the blank line has zero effect on program behavior or test output, its disappearance is easy to miss during a normal diff review unless you specifically look for it.
