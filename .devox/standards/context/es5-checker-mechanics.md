# ES5 Checker Mechanics

**When to load this:** Load this before modifying `scripts/es5-check.js` itself (e.g., adding forbidden tokens, closing the regex-literal gap, or changing its error output).

## Overview

`scripts/es5-check.js` is the project's only automated ES5 enforcement mechanism, and it works via a strip-then-scan pipeline rather than a real parser. Understanding its exact stripping order and known gaps is required before changing it, since a naive edit could silently widen or narrow what it catches.

## Key Files

- `scripts/es5-check.js` — the entire checker; zero dependencies, CommonJS, ES5-style itself

## Patterns & Rules

- **Pipeline order matters**: block comments are stripped first (`scripts/es5-check.js:20`, `/\/\*[\s\S]*?\*\//g`), then line comments (`scripts/es5-check.js:22`), then single-quoted strings (`scripts/es5-check.js:24`), then double-quoted strings (`scripts/es5-check.js:26`), then template literals (`scripts/es5-check.js:28-29`) — all replaced with `""` placeholders before the forbidden-token scan runs.
- **Forbidden token list is an array of `{pattern, name}` objects** (`scripts/es5-check.js:31-39`): `const`, `let`, `=>`, backtick, `class`, `async`, `await`, and `\.\.\.` (spread/rest). Adding a new forbidden token means appending another `{pattern, name}` entry to this array, not changing the strip logic.
- **The checker targets only `src/index.js`**, resolved via `path.join(__dirname, '..', 'src', 'index.js')` (`scripts/es5-check.js:12`). It does not accept a file argument or scan any other file — this is intentional per its stated scope.
- **Both success and failure paths call `process.exit` explicitly** — `process.exit(1)` with a joined failure list on line 45, `process.exit(0)` with a pass message on line 47 (`scripts/es5-check.js:44-47`). This pattern must be preserved for any future tooling scripts too (GUARDRAILS.md §2 rule 16).
- **The checker must remain zero-dependency and CommonJS/ES5 itself** — it uses only `require('fs')` and `require('path')` (`scripts/es5-check.js:8-9`), `var` declarations, and a `var i; for (i = 0; ...)` loop (`scripts/es5-check.js:39`; CLAUDE.md rule 5).
- **Improving this file (e.g., stripping regex literals) is explicitly in scope** as an "Allowed Evolution" (MISSION.md "Allowed Evolutions"; GUARDRAILS.md §1 Accept list), provided zero dependencies and ES5 style are maintained.

## Gotchas

- **Known gap: regex literals are never stripped.** The header comment (`scripts/es5-check.js:3-5`) explicitly documents this: a regex literal containing a forbidden keyword (e.g., `/const|let/`) could produce a false positive, or in theory mask a true negative. `src/index.js` currently contains no regex literals, so this hasn't triggered in practice — but any future edit to `src/index.js` that introduces a regex literal should be manually double-checked against this gap.
- The checker is not itself covered by any test or by its own scan (it only checks `src/index.js`), so changes to `scripts/es5-check.js` require manual ES5 inspection with no automated safety net (GUARDRAILS.md §6 item 7, by extension).
- Because strings are stripped before scanning, forbidden keywords that appear only inside string literals in `src/index.js` won't trigger false positives — but this also means the checker cannot verify anything about string *content*, only surrounding code structure.
