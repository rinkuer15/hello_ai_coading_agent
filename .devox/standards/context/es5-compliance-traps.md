# ES5 Compliance Traps

**When to load this:** Editing any `.js` file in this repository (`src/index.js`, `src/index.test.js`, or `scripts/es5-check.js`) — before making the edit and again before declaring it complete.

## Overview

This repository requires strict ES5 language surface in every `.js` file, but the tooling that appears to enforce this is deceptive: `node --check` parses ES2022+ without complaint, and the dedicated ES5 gate (`scripts/es5-check.js`) has a documented gap and a limited scan scope. An agent that trusts green tooling output alone will silently ship non-compliant code. This module exists to make the gap between "tooling passed" and "actually ES5 compliant" explicit.

## Key Files

- `src/index.js` — the 5-line oracle; the only file `scripts/es5-check.js` scans automatically.
- `src/index.test.js` — the sole test file; ES5 compliance here is **never** automated-checked.
- `scripts/es5-check.js` — the regex-based gate itself; scans only `src/index.js` (`scripts/es5-check.js:12`, `target = path.join(__dirname, '..', 'src', 'index.js')`).
- `package.json` — defines `lint` and `type-check` as the identical command `node --check src/index.js` (`package.json:10-11`).

## Patterns & Rules

1. **`npm run lint` and `npm run type-check` are byte-identical commands and are NOT ES5 gates.** Both map to `node --check src/index.js` (`package.json:10-11`). V8's parser accepts `const`, `let`, arrow functions, classes, template literals, and more — it only checks syntax validity, not the ES5 subset. A green result here proves nothing about ES5 compliance (GUARDRAILS.md §2 rule 8, §6 trap 1).
2. **`scripts/es5-check.js` only ever reads `src/index.js`.** Confirmed at `scripts/es5-check.js:12` — the `target` path is hardcoded to `src/index.js`. It will never catch forbidden tokens in `src/index.test.js` or in itself (GUARDRAILS.md §6 trap 7).
3. **The strip-then-scan pipeline does not strip regex literals.** `scripts/es5-check.js:14-26` strips block comments, line comments, single/double-quoted strings, and template literals — but not regex literals. A pattern like `/const|let/` embedded in source would produce a false positive on the forbidden-token scan (self-documented at `scripts/es5-check.js:4-6`; GUARDRAILS.md §6 trap 5). Conversely, a regex like `/=>/ ` used for some other purpose would also trip the scanner as if it were an arrow function — so absence of regex literals in `src/index.js` is a hard requirement, not just a convenience.
4. **Manual, line-by-line inspection is mandatory after every `.js` edit — not optional.** GUARDRAILS.md §2 rule 8 and §3 gate 8 both require inspecting every touched line for `const`, `let`, `=>`, backticks, `class`, `...`, destructuring, and `async`/`await`, specifically because no automated tool covers the full ES5 surface across all files.
5. **The forbidden-token list enforced by the automated gate** (`scripts/es5-check.js:28-37`): `const`, `let`, `=>`, template literals (backtick), `class`, `async`, `await`, spread/rest (`...`). Destructuring is *not* in this regex list and must be caught manually.
6. **CommonJS `require` is permitted in tooling (`scripts/`) but forbidden in `src/index.js`.** GUARDRAILS.md §2 rule 11 draws this exact line: the oracle itself may never gain `require`/`import`/`export`/`module.exports`, but `scripts/es5-check.js` (and `src/index.test.js`) may use `require`.

## Gotchas

- Seeing `npm run lint` or `npm run type-check` pass and treating that as evidence of ES5 compliance is the single most common failure mode this repo is designed to catch (GUARDRAILS.md §6 trap 1). Always run `npm run es5-check` **and** manually inspect the diff.
- `src/index.test.js` is ES5-compliant today, but because no automated tool checks it, any future edit must be manually verified — a passing `npm test` says nothing about ES5 syntax.
- Do not "fix" the regex-literal gap in `scripts/es5-check.js` by adding a real parser dependency (e.g., acorn) — that would violate the zero-dependency invariant (MISSION.md hard invariant #3). The gap is an accepted, documented limitation, not a bug to eliminate with heavier tooling.
