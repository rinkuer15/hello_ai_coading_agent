# Lockfile Safety

**When to load this:** Before running `npm install` (or any command that could generate `package-lock.json`), and before touching `package.json` for any reason.

## Overview

This project must permanently remain at zero `dependencies`/`devDependencies` (`package.json` has no such keys at all), and a committed `package-lock.json` is treated as an auto-reject condition. Three separate failure surfaces compound around this: `.gitignore` doesn't block the lockfile, `README.md`'s documented setup step contradicts the stricter process rule, and a bare `npm install` will happily generate and stage the file if you're not careful. This module exists to make the safe command explicit and to explain why the "obvious" command is wrong here.

## Key Files

- `package.json` — zero `dependencies`/`devDependencies` keys; 5 frozen scripts (lines 6-12: `start`, `test`, `type-check`, `lint`, `es5-check`).
- `.gitignore` — 8 entries (`node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`); notably **does not** include `package-lock.json`.
- `README.md` — human-facing setup docs; per CLAUDE.md this is the one file automation may freely edit, and it currently instructs a bare `npm install`.

## Patterns & Rules

1. **`.gitignore` does not block `package-lock.json`.** Confirmed by direct inspection: the file lists exactly 8 entries and none of them match `package-lock.json` or `*.lock`. This means a plain `npm install` will generate the lockfile and `git add .`/`git add -A` will happily stage it — the safety net here is process discipline, not tooling.
2. **Always run `npm install --no-package-lock`**, never bare `npm install`, when any dependency install step is needed (which should be rare/never, since the project has zero real dependencies).
3. **`README.md` currently documents the unsafe bare `npm install` command** — this is a known, acknowledged inconsistency (not something you introduced). Per CLAUDE.md's own gotcha list, follow the stricter `--no-package-lock` rule regardless of what README.md says, since README.md has no independent authority over process (GUARDRAILS.md wins on process per the file's own conflict-resolution note).
4. **Zero dependencies is a permanent invariant**, not a temporary state — `package.json` has no `dependencies` or `devDependencies` keys whatsoever, so any task that seems to need a new package should be treated as out of scope and escalated rather than solved by installing something.

## Gotchas

- If you ever see a `package-lock.json` appear in `git status` after running any npm command, do not commit it — remove/untrack it immediately and re-run with `--no-package-lock`.
- Since README.md is the one file automation may edit freely, updating its setup instructions to say `npm install --no-package-lock` is a reasonable, low-risk documentation fix if you're already touching that file for another reason — but this is optional and not required by any task unless explicitly requested.
- Because `.gitignore` doesn't cover it, a lockfile accidentally created and left in the working tree (even if never `git add`ed) can still cause confusion for the next agent/session — clean it up before ending a task if you generated one for any reason.
