# Lockfile Safety and npm install Discipline

**When to load this:** Before running `npm install` in this repo, or when touching `package.json`, `.gitignore`, or README.md's setup instructions.

## Overview

This repo has zero dependencies by design, but that does not make `npm install` safe to run carelessly. Three separate, compounding failure surfaces can result in a committed `package-lock.json`, which is treated as an auto-reject condition. This module walks through each surface so an agent doesn't trip over any of them.

## Key Files

- `package.json` — has no `dependencies`/`devDependencies` keys; the scripts section is a sealed public API.
- `.gitignore` — 8 deliberate entries; does not include `package-lock.json`.
- `README.md` — human-facing docs, the only file automation may freely modify, but currently instructs a bare `npm install`.
- `GUARDRAILS.md` — process authority; specifies the `--no-package-lock` requirement.

## Patterns & Rules

- Always run `npm install --no-package-lock`, never bare `npm install`, even though the project has zero dependencies (per CLAUDE.md's Build/Test/Lint section and GUARDRAILS.md §2). A bare install still generates a `package-lock.json` file on disk.
- `.gitignore`'s 8 deliberate entries (`node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`) do **not** include `package-lock.json`. This is a deliberate gap in `.gitignore`, not an oversight — the exclusion is enforced by process policy (GUARDRAILS.md), not by git tooling. Do not assume `.gitignore` will save you if you run a bare install.
- `README.md`'s setup section currently instructs a bare `npm install`, which directly contradicts GUARDRAILS.md §2's prohibition on committing lockfiles. When following instructions, GUARDRAILS.md wins — always use `--no-package-lock` regardless of what README.md currently says. README.md is a file automation may freely modify, so if asked to fix documentation drift, this is the one place it's safe to correct.
- `package.json`'s scripts section (`start`, `test`, `lint`, `type-check`, `es5-check`) is a sealed public API — modifying it (renaming, adding, removing scripts) is an auto-reject, independent of the lockfile issue.

## Gotchas

- If a bare `npm install` is accidentally run and `package-lock.json` appears, do not stage or commit it — delete it before any `git add`/`git commit`, and re-run with `--no-package-lock` if dependency resolution is genuinely needed.
- Because there are zero dependencies, `npm install --no-package-lock` is effectively a no-op — if a task appears to require adding a dependency, stop and check MISSION.md/GUARDRAILS.md first, since dependency additions are out of scope for this repo entirely, not just a lockfile concern.
- Do not "fix" the README/GUARDRAILS contradiction by editing GUARDRAILS.md — GUARDRAILS.md is immutable to automation. The correct fix, if requested, is to update README.md to match GUARDRAILS.md, never the reverse.
