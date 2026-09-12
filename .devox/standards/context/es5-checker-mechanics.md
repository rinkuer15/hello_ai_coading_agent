# ES5 Checker Mechanics

**When to load this:** Any task that modifies `scripts/es5-check.js` itself, or that needs to reason precisely about what the ES5 gate does and doesn't catch.

## Overview

`scripts/es5-check.js` is a zero-dependency, regex-based static checker that strips comments and string literals out of `src/index.js` and then scans what's left for eight forbidden ES6+ tokens. It is the only automated ES5 enforcement in the repo, but its strip-then-scan design has a documented, deliberate gap around regex literals. Anyone touching this script needs to understand the full pipeline order and exactly what it covers (and doesn't) before changing it.

## Key Files

- `scripts/es5-check.js` — the entire checker, 52 lines, CommonJS, uses only `fs` and `path` (lines 8-9).
- `src/index.js` — the **only** file this script ever scans (`scripts/es5-check.js:12`: `target = path.join(__dirname, '..', 'src', 'index.js')`, hardcoded).
- `package.json` — `"es5-check": "node scripts/es5-check.js"` (line 11) is the sole entry point; there is no config or CLI arg support.

## Patterns & Rules

1. **The scan target is hardcoded to `src/index.js` only** (`scripts/es5-check.js:12`). It never scans `scripts/es5-check.js` itself or `src/index.test.js` — if you're checking "is the whole repo ES5-compliant," this script only answers that question for one file.
2. **Strip pipeline order matters and is fixed:** block comments first (`scripts/es5-check.js:15`, `/\*[\s\S]*?\*\//g`), then line comments (line 17), then single-quoted strings (line 19), then double-quoted strings (line 21), then template literals (line 23, replaced with `""` to avoid false positives on their contents — though their mere presence is itself flagged separately by the backtick check).
3. **Forbidden token list is exactly 8 entries** (`scripts/es5-check.js:27-36`): `const`, `let`, `=>`, backtick (template literal), `class`, `async`, `await`, and `...` (spread/rest). Notably absent from this list: destructuring patterns (`{a, b} =` or `[a, b] =`), which CLAUDE.md rule 1 also forbids but this script does not detect via regex.
4. **The loop uses `var i; for (i = 0; ...)`** (`scripts/es5-check.js:39-43`), matching CLAUDE.md rule 5's loop-variable pattern — if you edit this script, preserve that style since the checker's own source must stay ES5-compliant despite not being self-scanned.
5. **Explicit `process.exit(0)` / `process.exit(1)` on both branches** (`scripts/es5-check.js:47,51`), console.error for failure and console.log for success — this matches the "error handling in tooling" convention in CLAUDE.md rule 3.
6. **Regex literals are never stripped before scanning** — this is called out in the script's own header comment (`scripts/es5-check.js:3-5`): "KNOWN LIMITATION: Regex literals are not stripped before scanning. A regex containing a forbidden keyword could produce a false positive. In practice src/index.js contains no regex literals." This is a documented, accepted tradeoff, not a bug to silently fix.

## Gotchas

- Do not "fix" the regex-literal gap by adding a dependency (e.g., a real JS parser/AST library) — the project's zero-dependency constraint (see `lockfile-safety` module) takes precedence over closing this gap. If it needs closing, that's a decision for a human, not an autonomous fix.
- If you extend the forbidden-token list, remember the stripped-string replacement is literally `""` (empty double-quoted string) for single-quotes, double-quotes, and template literals alike (`scripts/es5-check.js:19-23`) — a forbidden keyword accidentally left inside one of these replacement literals would not trigger a false positive, since `""` contains no keywords, but do double check after any pipeline change.
- Because this script only checks `src/index.js`, passing `npm run es5-check` tells you nothing about the ES5 compliance of `scripts/es5-check.js` or `src/index.test.js` — those must be verified manually (see `es5-compliance-traps` and `test-writing-guide` modules).
