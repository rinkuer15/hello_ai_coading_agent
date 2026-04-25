# Claude Code Instructions for hello-ai-coding-agent

A minimal Node.js scaffold for experimenting with AI-assisted coding agents — the entire runtime is a single `main()` function that prints `"Hello, AI Coding Agent!"` and exits.

**Rules**: See GUARDRAILS.md for all coding and factory rules.
**Scope**: See MISSION.md for what is and is not in scope.

---

## Build, Test & Lint

```bash
# Run the application
npm start
# equivalent to: node src/index.js

# Run tests (Node built-in test runner; discovers *.test.js, test/*.js, etc.)
npm test
# equivalent to: node --test

# Syntax-check / lint (validates JS syntax only — not ESLint)
npm run lint
# equivalent to: node --check src/index.js

# Type-check (identical to lint — syntax validation only, no TypeScript)
npm run type-check
# equivalent to: node --check src/index.js
```

> **Note**: There are zero npm dependencies. `npm install` is a no-op today but
> must be run after adding any package to `package.json`.

---

## Architecture

```
hello-ai-coding-agent/
├── src/
│   └── index.js        ← entire application (5 lines)
├── package.json        ← project metadata + npm scripts; zero deps
├── ReadMe.md           ← project overview
└── .gitignore          ← excludes node_modules/, dist/, .env, logs
```

**Data flow**:
```
node src/index.js
  → main() invoked
    → console.log("Hello, AI Coding Agent!")
  → process exits 0
```

- No modules, no imports, no exports, no network, no state, no database.
- `src/` is the source root (`package.json#main` → `src/index.js`).
- `dist/` is gitignored, anticipating a future build/compile step that does not yet exist.
- No async code — fully synchronous.

---

## Key Conventions

1. **Wrap all executable code in `main()`** — never write top-level side-effect code outside a named function. The established pattern is:
   ```js
   function main() {
     // your logic here
   }
   main();
   ```
2. **Plain CommonJS or ESM — choose deliberately** — the current file uses neither `require`/`module.exports` nor `import`/`export`. Any addition of modules requires an explicit, consistent choice; do not mix styles.
3. **Use `console.log` for output** — no logger library is installed. Add one (`pino`, `winston`, etc.) only if the scope warrants it.
4. **`camelCase` for functions and variables**, `kebab-case` for the package name, `PascalCase` reserved for classes/constructors (none exist yet).
5. **No TypeScript** — source files are plain `.js`. Do not add `.ts` files or a `tsconfig.json` without explicit project-wide setup.
6. **No build step** — source is run directly with `node`. Do not assume transpilation or bundling.
7. **`npm run lint` and `npm run type-check` are identical** — both run `node --check` (syntax validation only). Do not treat them as ESLint or a real type checker.
8. **Test files follow Node built-in test runner conventions** — name files `*.test.js` or place them in a `test/` directory. Use `node:test` and `node:assert` (built-in); do not add Jest or Mocha without updating `package.json`.
9. **Node ≥ 18 is implied** — `node --test` requires Node 18+. Pin this with `.nvmrc` or `engines` in `package.json` when the project grows.
10. **MIT license** — all contributions and dependencies must be MIT-compatible.

---

## Important Files

| File / Directory | Purpose |
|---|---|
| `src/index.js` | Entire application — `main()` function + single `console.log` |
| `package.json` | Project metadata, npm scripts; **zero runtime or dev dependencies** |
| `ReadMe.md` | Project overview; matches actual runtime behaviour |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env`, log files, `__pycache__/`, `.DS_Store` |

---

## Development Notes

- **Zero dependencies**: `package.json` has no `dependencies` or `devDependencies`. Every new package must be explicitly installed (`npm install <pkg>`).
- **No tests exist yet**: `npm test` runs the Node built-in runner but finds nothing — 0 tests pass, 0 fail. This is intentional; add `*.test.js` files to start testing.
- **`__pycache__/` in `.gitignore`**: Suggests the template may accommodate Python files eventually, or was generated from a generic template. Do not add Python code without explicit scope approval.
- **`dist/` is gitignored**: A build step is anticipated by the scaffold but does not exist. Do not create a `dist/` directory manually.
- **No Node version constraint**: Nothing enforces Node ≥ 18. Add `.nvmrc` and/or `engines` to `package.json` before deploying or sharing the project.
- **No error handling**: There is no `try/catch`, no `process.exitCode`, and no uncaught-exception handler. Add error handling as soon as the code does anything fallible.
- **No async code**: The codebase is fully synchronous. If async is needed, adopt `async/await` consistently — do not mix callbacks, raw Promises, and async/await.
- **Running the app**: `npm start` (or `node src/index.js`) is the only way to run the project — there is no Docker image, no dev server, and no watch mode.
