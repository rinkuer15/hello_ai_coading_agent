# ES5 Compliance Traps & Manual Verification

**When to load this:** Any task that edits, creates, or validates a `.js` file in this repository — especially when running lint commands or applying formatters.

## Overview

This project uses ES5-compatible JavaScript, but `node --check` (used by `npm run lint` and `npm run type-check`) is a V8 syntax check — it accepts all of ES2022+ without complaint. A passing lint run is therefore **not proof of ES5 compliance**. The only automated ES5 gate is `npm run es5-check`, and even that has a known scanner gap for regex literals. Manual line-by-line inspection remains mandatory after every `.js` edit.

A second trap is structural: the mandatory blank line at `src/index.js:4` (between `}` and `main();`) is silently deleted by Prettier, ESLint `--fix`, Biome, and most editor "format on save" settings. Its deletion is a governance failure, not a style nit.

## Key Files

- `src/index.js` — The 5-line runtime oracle; every line is a governance property; structurally frozen.
- `scripts/es5-check.js` — Automated ES5 gate: strips comments/strings, scans for 8 forbidden tokens. Does **not** cover test files.
- `package.json` — Exposes `lint`, `type-check`, and `es5-check` scripts; `lint` and `type-check` run the identical `node --check` command and are **not** ES5 gates.

## Patterns & Rules

**`node --check` is not an ES5 gate** — `package.json:9-10` runs `node --check src/index.js` for both `lint` and `type-check`. V8 parses modern JS silently. Confirmed by `CLAUDE.md §Development Notes`: "node --check accepts all of ES2022+. Running npm run lint and seeing it pass is not proof of ES5 compliance."

**The forbidden ES6+ token set** — `scripts/es5-check.js:28-37` scans for exactly 8 patterns after stripping: `const`, `let`, `=>`, `` ` `` (backtick), `class`, `async`, `await`, `...`. Any of these in unstripped source triggers a failure exit.

**Manual inspection is always required** — After every edit to any `.js` file, manually scan each line for: `const`, `let`, `=>`, `` ` ``, `class`, `...`, destructuring (`{a, b} =`, `[a, b] =`), and `async`/`await`. The automated checker cannot catch all of these (see Gotchas).

**Function declaration style** — Always `function name() {}` (`src/index.js:1`). Never `const name = () => {}` (arrow), never `var name = function() {}` (expression). (`CLAUDE.md §Key Conventions`, item 1.)

**The mandatory blank line** — `src/index.js:4` must be exactly one blank line between the closing `}` of `main()` and the `main();` call line. This is a governance property, not style. (`CLAUDE.md §Key Conventions`, item 2.) Verify with `xxd` after every edit:
```
node src/index.js | xxd
# must produce: 48 65 6c 6c 6f 2c 20 41 49 20 43 6f 64 69 6e 67 20 41 67 65 6e 74 21 0a
```

**`var` + explicit `for` loop** — `scripts/es5-check.js:39` declares `var i;` before the loop. Never `.forEach`, `.map`, `.filter`, or other ES5+ higher-order array methods that might tempt ES6 arrow callbacks. (`CLAUDE.md §Architecture`, implicit rule 1.)

**No module system in oracle source** — `src/index.js` must contain zero `require`, `import`, `export`, `module.exports`. (`CLAUDE.md §Coding Rules`, item 3.) This rule is per-file: tooling scripts under `scripts/` may use CommonJS `require`.

**Trailing newline on all `.js` files** — Verify with `xxd` after every edit. Its absence is a compliance failure. (`CLAUDE.md §Key Conventions`, item 6.)

## Gotchas

**`npm run lint` passing feels like a green light — it is not.** The identical `node --check` command is run for both `lint` and `type-check` (`package.json:9-10`). Seeing both pass has historically led agents to declare compliance. It proves only that V8 can parse the file.

**`npm run es5-check` has a regex-literal false-positive gap.** `scripts/es5-check.js:5-6` documents that regex literals are not stripped before scanning. A source pattern like `/const|let/` would cause a false positive failure. Conversely, a forbidden token inside a regex body would not be flagged. Manual inspection cannot be skipped even after `es5-check` passes.

**Formatters silently destroy the mandatory blank line.** Prettier, ESLint `--fix`, Biome, and VS Code "Format on Save" all remove the blank line at `src/index.js:4`. There is no config that preserves it — the only defence is to never run these tools on `src/index.js` and to verify with `xxd` after every edit. (`CLAUDE.md §Development Notes`, "The blank line is a governance trap.")

**`scripts/es5-check.js` scans only `src/index.js`.** When `src/index.test.js` is written, its ES5 compliance must be verified manually — the checker does not cover it. (`GUARDRAILS.md §6`, item 7.)

**Destructuring is not in the forbidden token list.** `scripts/es5-check.js:28-37` scans for 8 specific tokens. Destructuring assignment patterns (`const {a} = obj`, `var [x] = arr`) are syntactically caught only if they happen to use `const` or `let`. A destructuring expression using `var` would not be caught by the scanner and must be caught by manual inspection.
