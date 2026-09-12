# package-lock.json Safety Procedure

**When to load this:** Load before running any `npm install` command, or whenever a task touches `package.json` or dependency management in this repo.

## Overview

This project has zero dependencies and a deliberate policy of never committing a lockfile — but `.gitignore` does NOT block `package-lock.json`, so a bare `npm install` will silently create a file that then risks being staged and committed. This module documents the compounding failure mode and the correct procedure to avoid it.

## Key Files

- `package.json` — 5 frozen scripts, zero `dependencies`/`devDependencies` keys at all
- `.gitignore` — 8 deliberate entries; confirmed to NOT include `package-lock.json`

## Patterns & Rules

- Always run `npm install --no-package-lock` — never a bare `npm install` (CLAUDE.md "Build, Test & Lint" first command block; GUARDRAILS.md §2 dependency policy).
- `.gitignore`'s 8 entries are: `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json` (CLAUDE.md "Important Files" table, `.gitignore` row). `package-lock.json` is deliberately absent from this list.
- The lockfile exclusion is enforced by **process policy** (GUARDRAILS.md), not by `.gitignore` — meaning there is no automated technical safety net; an agent must actively remember not to stage it.
- `README.md` instructs a bare `npm install`, which contradicts GUARDRAILS.md's `--no-package-lock` requirement. Follow GUARDRAILS.md regardless of what README.md currently says (CLAUDE.md "Miscellaneous / Gotchas").
- If a `package-lock.json` is ever generated (e.g. by accident or by another tool), delete it before staging/committing anything — do not rely on `git status` filtering it out.

## Gotchas

- A lockfile presence in a diff or staged changes is an immediate auto-reject condition — check `git status` for `package-lock.json` before every commit in this repo.
- Because there are zero dependencies, a generated lockfile would have near-empty content, which can make it easy to overlook in a diff review — don't assume "it's basically empty" means it's safe to commit.
- If asked to "fix" README.md's bare `npm install` instruction, that is in scope (README.md is the one file automation may freely modify) — but do not use this as license to touch `package.json`, `.gitignore`, or any governance file.
