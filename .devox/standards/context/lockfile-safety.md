# Lockfile Safety on Install

**When to load this:** Running `npm install` for any reason, or touching `package.json`.

## Overview

This repo has zero dependencies by design (`package.json` has no `dependencies` or `devDependencies` keys), and a `package-lock.json` must never be committed. However, `.gitignore` does not block `package-lock.json` (`.gitignore:1-8` — 8 fixed entries, none matching lockfiles), so a bare `npm install` can silently generate a file that will happily get staged and committed unless the operator remembers to avoid it or explicitly excludes it.

## Key Files

- `package.json` — zero deps, 5 sealed scripts (`start`, `test`, `lint`, `type-check`, `es5-check` — `package.json:6-12`); no `"type"` field, i.e. CommonJS
- `.gitignore` — exactly 8 entries: `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json` (`.gitignore:1-8`); `package-lock.json` is conspicuously absent

## Patterns & Rules

- Always run `npm install --no-package-lock`, never bare `npm install`, even though the repo has zero dependencies — the flag prevents Node/npm from generating a lockfile with only the root package's own metadata, which would otherwise silently appear as a new untracked (and stageable) file.
- The exclusion of `package-lock.json` is enforced by process policy (see GUARDRAILS.md), not by `.gitignore` — do not assume `.gitignore` will catch a lockfile if `--no-package-lock` is forgotten. Verify with `git status` after any `npm install` invocation.
- `package.json`'s `scripts` block (`package.json:6-12`) is a sealed 5-command public API: `start`, `test`, `type-check`, `lint`, `es5-check`. Do not add, remove, rename, or change the underlying command of any of these — modification is an auto-reject trigger regardless of intent, per GUARDRAILS.md.
- `README.md` currently instructs a bare `npm install` in its setup section, which contradicts the `--no-package-lock` requirement — when running install commands, follow this file's guidance (and GUARDRAILS.md), not README.md, until README.md is updated to match.

## Gotchas

- Because `.gitignore` doesn't list `package-lock.json`, `git status` after a bare `npm install` will show it as an untracked file ready to be `git add`-ed — an agent scanning "what changed" without checking `.gitignore` coverage assumptions could stage it without noticing the omission.
- Zero dependencies does not mean `npm install` is a no-op file-system-wise — it still writes a `package-lock.json` reflecting the root package itself unless `--no-package-lock` is passed.
- If a `package-lock.json` is ever found already committed in this repo, that is itself a sign of a prior process violation — do not "clean it up" silently as a drive-by fix; flag it explicitly, since removing files unrelated to the current task is out of scope unless requested.
