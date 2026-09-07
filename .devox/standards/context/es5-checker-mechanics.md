# ES5 Checker Mechanics

**When to load this:** Modifying `scripts/es5-check.js` itself — its pipeline, forbidden-token list, or scan target.

## Overview

`scripts/es5-check.js` is the repo's only automated defense against ES6+ syntax creeping into `src/index.js`. It is a zero-dependency, regex-based scanner with a documented strip-then-scan pipeline and a known gap around regex literals. Any change to this script must preserve its zero-dependency nature and its existing detection guarantees — accidentally narrowing its coverage is a silent regression.

## Key Files

- `scripts/es5-check.js` — the entire ES5 gate implementation; CommonJS, ES5-style itself, zero dependencies.

## Patterns & Rules

- The script's pipeline strips block comments, line comments, and string literals from the source before regex-scanning for forbidden tokens (`scripts/es5-check.js:16-26`) — this ordering matters: stripping must happen before scanning to avoid false positives on tokens that appear inside comments or strings.
- Known gap: regex literals are **not** stripped before the scan (documented at the top of the file, `scripts/es5-check.js:3-5`). A source regex like `/const|let/` will trigger a false positive because the literal's text content is scanned as if it were code.
- The forbidden-token list covers 8 ES6+ constructs: `const`, `let`, `=>`, template literals (backtick), `class`, spread/rest (`...`), destructuring, `async`/`await` (`scripts/es5-check.js:28-37`).
- The script hardcodes its scan target to `src/index.js` only (`scripts/es5-check.js:12`) via `path.join(__dirname, ...)` — it does not scan `src/index.test.js` or itself.
- On success and failure paths alike, the script calls `process.exit` explicitly: `process.exit(1)` on detected violations, `process.exit(0)` on a clean pass (`scripts/es5-check.js:44,47`) — this convention must be preserved in any modification.
- The script itself must remain written in ES5 style (`var`, `function` declarations, single quotes) since it is one of the `.js` files subject to the repo's own conventions, even though it is not self-scanned.

## Gotchas

- Do not "fix" the regex-literal gap by adding a regex-literal-stripping step without carefully considering scope — this is a documented, accepted limitation (an AST-based checker would close it but would require a dependency like `acorn`, violating the zero-dependency invariant).
- Expanding the scan target to include `src/index.test.js` or `scripts/es5-check.js` itself would be a behavior change beyond a typical bugfix — confirm this is explicitly requested before doing so, since it changes what "passing es5-check" means project-wide.
- Any modification must be manually verified against the mandatory ES5 rules (see `es5-compliance-traps.md`) since `node --check` won't catch a slip into ES6+ syntax within the checker script itself.
