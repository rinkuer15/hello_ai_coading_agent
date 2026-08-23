# Writing src/index.test.js (Authorised Test File)

**When to load this:** Any task that involves writing, modifying, or evaluating the test suite — including diagnosing why `npm test` exits 0 with no output.

## Overview

The test suite is deliberately in a **false-pass state**: zero `*.test.js` files exist, so `npm test` (`node --test`) exits 0 silently. This is a documented compliance trap, not a bug. The one authorised test file is `src/index.test.js`. Writing it requires satisfying a strict, non-obvious set of constraints: ES5 syntax only, specific built-in imports only, byte-exact oracle assertions, and manual ES5 verification because `scripts/es5-check.js` does not cover test files.

## Key Files

- `src/index.js` — The oracle under test; its stdout must be verified byte-exact.
- `src/index.test.js` — The only authorised test file; does not yet exist.
- `scripts/es5-check.js` — Automated ES5 gate for `src/index.js` only; does NOT scan test files.
- `package.json` — `npm test` runs `node --test`; a real pass requires ≥1 file named in stdout.

## Patterns & Rules

**One authorised test file, one location** — The only permitted test file is `src/index.test.js`. No additional test files may be created under `src/` or anywhere else. (`CLAUDE.md §Coding Rules`, item 4.)

**Node.js built-ins only** — Test files must import only from `node:assert`, `node:child_process`, and `node:test`. No npm packages. No third-party test frameworks. (`CLAUDE.md §Coding Rules`, item 4.)

**ES5 compliance in test files** — `src/index.test.js` must use `var`, `function` declarations, CommonJS `require`, single quotes, and semicolons. No `const`, `let`, arrow functions, template literals, or destructuring. (`CLAUDE.md §Coding Rules`, item 5.)

**CommonJS `require` for imports** — Use `var assert = require('node:assert');` style. Do not use `import` statements. (`CLAUDE.md §Coding Rules`, item 5.)

**What the test must verify** — The test must assert: (1) stdout is byte-exact `Hello, AI Coding Agent!\n`, (2) exit code is 0, (3) stderr is empty. These three assertions together constitute a valid oracle test. (Architecture Assessment §Test Strategy.)

**Spawning the oracle** — Use `node:child_process` `spawnSync` or `execSync` to run `node src/index.js` and capture output. Example shape (ES5):
```js
var cp = require('node:child_process');
var result = cp.spawnSync(process.execPath, ['src/index.js'], { encoding: 'utf8' });
```

**A real pass requires ≥1 file named in stdout** — After writing the file, run `npm test` and verify that stdout names `src/index.test.js` as a discovered file. Silent exit 0 is the false-pass state, not a passing suite. (`CLAUDE.md §Key Conventions`, item 8; `GUARDRAILS.md §6`, item 2.)

**Manual ES5 verification is required** — `scripts/es5-check.js` scans only `src/index.js` (`scripts/es5-check.js:12`). After writing `src/index.test.js`, manually inspect every line for `const`, `let`, `=>`, `` ` ``, `class`, `async`, `await`, `...`, and destructuring patterns. (`GUARDRAILS.md §6`, item 7.)

**`var i` declared before `for` loops** — Following the implicit convention in `scripts/es5-check.js:39`, declare loop variables on their own line before the loop body. (Architecture Assessment §Implicit Rules, item 2.)

**Trailing newline** — `src/index.test.js` must end with a trailing newline character. Verify with `xxd` after writing. (`CLAUDE.md §Key Conventions`, item 6.)

## Gotchas

**`npm test` silence is not success.** Before `src/index.test.js` exists, `node --test` exits 0 with zero output. After writing the file, if `npm test` still exits silently, the file may not be discovered (wrong name, wrong location, syntax error preventing parsing). The file must be exactly `src/index.test.js`.

**`node:test` API changed between Node 18 and 20.** In Node 18, `node --test` is experimental and output format differs from Node 20 LTS (stable). The assertions themselves (`node:assert`) are stable across both. If output looks unusual, check `node --version`.

**`scripts/es5-check.js` will not catch ES6+ in the test file.** The checker hardcodes `src/index.js` as its target (`scripts/es5-check.js:12`). A passing `npm run es5-check` after writing `src/index.test.js` proves nothing about the test file's ES5 compliance. Manual line-by-line inspection is the only gate.

**`spawnSync` vs `execSync` choice matters for byte verification.** `execSync` returns stdout as a Buffer or string but throws on non-zero exit. `spawnSync` returns `{ stdout, stderr, status }` without throwing, making it easier to assert all three oracle properties independently. Prefer `spawnSync` for test file use.

**The test file itself is a `.js` source file subject to all `.js` file rules** — trailing newline, single quotes, semicolons, no formatters, no build tools. Do not use `prettier --write` or equivalent on it.
