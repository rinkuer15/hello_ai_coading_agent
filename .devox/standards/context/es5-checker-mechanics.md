# ES5 Checker Strip-and-Scan Pipeline

**When to load this:** When modifying, reviewing, or extending `scripts/es5-check.js` itself (not when just editing `src/index.js`).

## Overview

`scripts/es5-check.js` is the repo's sole automated ES5 gate: a zero-dependency, regex-based scanner that strips non-code text (comments, strings) from `src/index.js` and then tests the remainder against a fixed list of forbidden ES6+ tokens. This module documents its exact pipeline order and known coverage gaps, since that implementation detail is too granular for the top-level CLAUDE.md.

## Key Files

- `scripts/es5-check.js` — the entire checker; single file, CommonJS, ES5-style itself, uses only `fs` and `path` built-ins (`scripts/es5-check.js:8-9`).

## Patterns & Rules

1. **Target is hardcoded, not parameterized.** `var target = path.join(__dirname, '..', 'src', 'index.js');` (`scripts/es5-check.js:11`) — the checker only ever reads `src/index.js`. It has no CLI argument handling and none should be added (would violate zero-dependency/no-CLI-parsing scope per GUARDRAILS.md "Reject" list).
2. **Strip order matters and is fixed:** block comments (`/\*...\*/`) → line comments (`//...`) → single-quoted strings → double-quoted strings → template-literal (backtick) strings (`scripts/es5-check.js:15-24`). Each strip replaces matched content with `""` so stripped string/comment content can never itself trigger a false positive on a forbidden token.
3. **Regex literals are never stripped** — this is a documented, explicit gap called out in the file's own header comment (`scripts/es5-check.js:1-5`): "KNOWN LIMITATION: Regex literals are not stripped before scanning... In practice src/index.js contains no regex literals." Any future work on this file should treat closing this gap as the main improvement opportunity — GUARDRAILS.md explicitly lists "stripping regex literals to close the known scanner gap" as an **accepted** category of change (GUARDRAILS.md §1 "Accept").
4. **Forbidden-token list is an array of `{ pattern, name }` objects**, tested in order via `.test(stripped)` (`scripts/es5-check.js:28-42`): `const`, `let`, `=>`, backtick, `class`, `async`, `await`, `...` (spread/rest). All patterns except `=>`, backtick, and `...` use `\b` word boundaries to avoid matching substrings (e.g. `let` inside `outlet`).
5. **Exit contract is explicit on both paths** (GUARDRAILS.md §2 rule 16): success prints `'ES5 check passed.'` and calls `process.exit(0)` (`scripts/es5-check.js:46-47`); failure prints `'ES5 check FAILED. Forbidden tokens found: ' + failures.join(', ')` and calls `process.exit(1)` (`scripts/es5-check.js:43-44`). No implicit fall-through exit.
6. **Loop style follows repo convention:** `var i; for (i = 0; i < forbidden.length; i++)` — loop variable declared before the `for` statement, not inside it (`scripts/es5-check.js:39`), matching CLAUDE.md's `var i; for (i = 0; ...)` pattern rule.
7. **No destructuring-specific pattern exists in the forbidden list** — only `const`/`let` are checked, so array/object destructuring performed via plain assignment (without `const`/`let`) would slip through undetected. This is a real, uncited-elsewhere coverage gap worth being aware of if extending the list.

## Gotchas

- Because strings and comments are stripped to `""` (not removed entirely), the character-count/position of the source is altered before scanning — this checker never reports line numbers for a failure, only which token names were found. Don't expect line-level diagnostics from `npm run es5-check` output.
- Any change to this file must itself remain ES5-compliant and zero-dependency (GUARDRAILS.md §1 "Accept" — "Improvements... that maintain zero dependencies and ES5 style"), but is NOT covered by its own automated scan (it only scans `src/index.js`) — verify manually.
- Adding stripping for regex literals requires care: a naive regex-matching-regex approach can itself be fragile (e.g., distinguishing division operators `/` from regex delimiters). Any such change should be reviewed carefully rather than assumed correct.
