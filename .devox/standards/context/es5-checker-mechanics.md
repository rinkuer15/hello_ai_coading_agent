# es5-check.js Strip-then-Scan Mechanics

**When to load this:** Before modifying `scripts/es5-check.js` itself, or when investigating why the ES5 gate did or didn't flag a piece of code.

## Overview

`scripts/es5-check.js` is the repo's only automated ES5 enforcement mechanism. It is a zero-dependency, regex-based static checker rather than a real parser (e.g., `acorn` or Babel), which is an intentional tradeoff given the zero-dependency constraint but comes with a documented blind spot. This module explains the checker's internal pipeline and its known gap so anyone editing it understands what they can and cannot rely on.

## Key Files

- `scripts/es5-check.js` — the entire checker: reads `src/index.js`, strips comments/strings via regex, then regex-scans for forbidden tokens.

## Patterns & Rules

- The checker resolves its target path via `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`) — it hardcodes scanning `src/index.js` only. It does not scan `src/index.test.js` or itself.
- The forbidden-token list is regex-matched after a strip pass removes comments and string literals: `const`, `let`, `=>`, backticks, `class`, `async`, `await`, `...` (`scripts/es5-check.js:28-37`).
- The checker itself is written in ES5-style CommonJS: `var` declarations (`scripts/es5-check.js:8-9`), a `var i; for (i = 0; ...)` loop pattern (`scripts/es5-check.js:39`), and explicit `process.exit(0)`/`process.exit(1)` calls on both success and failure paths (`scripts/es5-check.js:44-47`). Any change to this file must preserve these same conventions, since it is subject to the same ES5 rules as `src/index.js` even though the automated gate cannot check itself.
- `path.join(__dirname, ...)` is used for path construction (`scripts/es5-check.js:12`) — never hardcode a relative path string here.

## Gotchas

- The strip-then-scan pipeline strips comments and string literals via regex but does **not** strip regex literals. A pattern like `/const|let/` written as an actual JavaScript regex literal in the source can pass through un-stripped and either trigger a false positive (the checker sees the literal token `const` inside the regex source) or, in more contrived cases, mask a true negative. This is a documented, accepted limitation — not a bug to silently patch by adding a parser dependency. Do not "fix" this by pulling in `acorn` or Babel; the zero-dependency constraint is itself part of what's being benchmarked in this repo.
- Since the checker only ever targets `src/index.js`, adding a new production source file (which MISSION.md forbids anyway) would silently escape ES5 enforcement entirely — another reason the single-production-file rule is load-bearing, not incidental.
- Any modification to `scripts/es5-check.js` must be manually re-verified for ES5 compliance since no tool checks the checker itself.
