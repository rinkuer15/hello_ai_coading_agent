# Lockfile Safety and Zero-Dependency Enforcement

**When to load this:** Running `npm install`, touching `package.json`, or any task that could result in dependency additions or a generated `package-lock.json`.

## Overview

This project has no dependency mechanism at all — `package.json` has no `dependencies` or `devDependencies` keys present (confirmed by direct read). Bare `npm install` still silently generates a `package-lock.json` file even with zero declared dependencies, and `.gitignore` does not block it. This creates a three-part failure surface — lockfile drift, dependency-invariant violation, and undetected staging — that no single tool catches; it must be caught by process discipline.

## Key Files

- `package.json` — 5 frozen scripts (`start`, `test`, `lint`, `type-check`, `es5-check`) and zero dependency keys; the scripts section is a sealed public API
- `.gitignore` — 8 deliberate entries; does not include `package-lock.json`

## Patterns & Rules

- `package.json` has no `dependencies` or `devDependencies` keys at all — this is stronger than "empty arrays," there is no dependency mechanism present in the file. Adding any dependency, including devDependencies for tooling/linting/formatting convenience, is a hard invariant violation (`MISSION.md` Hard Invariant, `GUARDRAILS.md` §2 rules 3-4).
- Always run `npm install --no-package-lock` — never bare `npm install` — since this repo has zero dependencies to install and no lockfile should ever be generated or committed.
- `.gitignore` (verified by direct read) has exactly 8 entries: `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json` — it has **no** `package-lock.json` entry. Do not assume `.gitignore` provides a safety net for lockfiles.
- `package.json`'s scripts section (`start`, `test`, `lint`, `type-check`, `es5-check`) is treated as a sealed public API — modifying it is an auto-reject condition (`GUARDRAILS.md`).

## Gotchas

- `README.md` currently instructs a bare `npm install`, which contradicts the process policy — always follow `GUARDRAILS.md`/this module (`npm install --no-package-lock`), not the README's literal wording, until the README is corrected.
- If `package-lock.json` is ever generated in the working tree (e.g., by an accidental bare `npm install`), it will not be blocked from `git add -A` or similar broad-staging commands — check `git status` explicitly for it and remove/untrack it before any commit.
- The lockfile-exclusion safety is enforced entirely by human/agent process discipline, not by any tooling in this repo — do not rely on `git status` looking "clean" as proof no lockfile was generated; always check explicitly.
