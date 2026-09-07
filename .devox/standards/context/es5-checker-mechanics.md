# ES5 Checker Mechanics

**When to load this:** Before modifying `scripts/es5-check.js` itself (as opposed to merely running it).

## Overview

`scripts/es5-check.js` is a zero-dependency, regex-based static analyzer that is itself written in ES5 and must stay that way. Its internals — a strip-then-scan pipeline with a documented gap — are implementation details too deep for CLAUDE.md but essential to understand before extending the forbidden-token list or fixing the known regex-literal gap. This module is the deep-dive reference for that file specifically.

## Key Files

- `scripts/es5-check.js` — the entire checker; ~47 lines, no dependencies beyond Node built-ins `fs` and `path`.

## Patterns & Rules

1. **Pipeline order: strip, then scan.** The script first strips content that could produce false positives, then regex-tests what remains against the forbidden-token list (`scripts/es5-check.js:14-37`):
   - Block comments: `/\/\*[\s\S]*?\*\//g` → removed (`scripts/es5-check.js:15`)
   - Line comments: `/\/\/[^\n]*/g` → removed (`scripts/es5-check.js:17`)
   - Single-quoted strings: replaced with `""` (`scripts/es5-check.js:19`)
   - Double-quoted strings: replaced with `""` (`scripts/es5-check.js:21`)
   - Template literals (backtick strings): replaced with `""` (`scripts/es5-check.js:23-24`) — note the comment explaining these are stripped to avoid false positives on their *contents*, even though their mere presence is itself a violation caught separately.
   - **Regex literals are NOT stripped** — self-documented as a known limitation at `scripts/es5-check.js:4-6`.
2. **The forbidden-token list is a fixed array of `{pattern, name}` objects** (`scripts/es5-check.js:28-37`): `const`, `let`, `=>`, backtick (template literal), `class`, `async`, `await`, `...` (spread/rest). Note this list does **not** include a destructuring pattern (e.g. `\[\w+,\s*\w+\]\s*=` or object destructuring) — that must be caught by manual inspection, since encoding a reliable destructuring regex without false positives (array literals, etc.) is nontrivial.
3. **The target file is hardcoded, not parameterized.** `target = path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`) — the script has no CLI argument support and by design scans only `src/index.js`. Extending it to also scan `src/index.test.js` would be a legitimate, in-scope improvement per MISSION.md's "Allowed Evolutions," but is not the current behavior.
4. **Explicit `process.exit` on every path.** Success prints `'ES5 check passed.'` and exits 0; failure prints the joined list of failure names and exits 1 (`scripts/es5-check.js:39-47`). GUARDRAILS.md §2 rule 16 requires this pattern for all tooling scripts — no implicit fall-through exit.
5. **The script itself must remain ES5, CommonJS, and zero-dependency.** It already uses `var`, `function`, single quotes, and `require('fs')`/`require('path')` only (`scripts/es5-check.js:8-9`) — any edit must preserve this, since MISSION.md's "Allowed Evolutions" permits improving this script only "provided the file remains ES5-compliant, zero-dependency, and CommonJS."

## Gotchas

- Closing the regex-literal gap (e.g., stripping `/.../ ` patterns before scanning) is explicitly named in MISSION.md's "Allowed Evolutions" as legitimate scope — but do not reach for a real parser library (e.g., acorn/esprima) to do it, since that would violate the zero-dependency invariant. Any fix must stay regex-based.
- A hand-rolled regex-literal stripper is itself error-prone (distinguishing `/` division from `/regex/` requires lookback context) — if attempting this, test extensively against edge cases like `a/b/c` (division) vs `/abc/.test(x)` (regex) before trusting it.
- This script is the **only** automated ES5 gate in the repo, and it only ever checks `src/index.js` — do not assume extending its forbidden-token list also protects `src/index.test.js` or the checker script itself unless the `target` path logic is also changed.
