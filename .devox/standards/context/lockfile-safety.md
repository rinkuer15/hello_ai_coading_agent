# package-lock.json Safety and .gitignore Gap

**When to load this:** Before running `npm install`, or when touching `package.json` in any way (adding scripts, checking dependencies, reviewing a PR that modifies it).

## Overview

This repo has a zero-dependency invariant, but the standard `npm install` command still generates a `package-lock.json` file even when there is nothing to lock — and `.gitignore` does **not** block it. This creates a compounding trap: an innocuous default command can silently produce a file that is an automatic PR rejection trigger, with no filesystem-level safety net catching it before commit.

## Key Files

- `package.json` — zero `dependencies`/`devDependencies` keys; 5 frozen scripts (`start`, `test`, `type-check`, `lint`, `es5-check`) (`package.json:6-11`); scripts section is a sealed, protected API (GUARDRAILS.md §4).
- `.gitignore` — exactly 8 deliberate entries: `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`. `package-lock.json` is conspicuously **absent** from this list.

## Patterns & Rules

1. **Always run `npm install --no-package-lock`, never bare `npm install`** (GUARDRAILS.md §2 rule 4; MISSION.md "Hard Invariants" #5). Bare `npm install` generates `package-lock.json` even with zero dependencies declared in `package.json`.
2. **`.gitignore` does not and must not be relied upon to catch this.** The exclusion of `package-lock.json` from version control is enforced entirely by **process policy** (this rule, plus GUARDRAILS.md §5 trigger 3), not by the filesystem-level `.gitignore` mechanism. `.gitignore` itself is a protected/immutable file (GUARDRAILS.md §4) — do not "fix" this gap by adding `package-lock.json` to `.gitignore`; that would be a modification to a protected file and is itself an auto-reject trigger.
3. **Presence of `package-lock.json` in the repo is an immediate, high-priority auto-reject trigger** (GUARDRAILS.md §1 "Priority Assignment" — high; §5 trigger 3), independent of whether it was committed intentionally or generated accidentally by a bare install.
4. **If a bare `npm install` is ever run by mistake, the generated `package-lock.json` must be manually deleted before staging any changes** — it will not be caught automatically by `git status` filtering (GUARDRAILS.md §6.8).
5. **`README.md` contains known, accepted documentation drift**: its Setup section still shows bare `npm install` (CLAUDE.md "Gotchas"; GUARDRAILS.md §2 rule 4 note). This does **not** authorize using bare `npm install` — GUARDRAILS.md is explicit that following README's stale instructions does not exempt the lockfile from the auto-reject rule. `README.md` is the one file automation may freely modify, so correcting this drift is an allowed (not required) future improvement (MISSION.md "Allowed Evolutions").
6. **`package.json`'s scripts section is sealed** — 5 frozen commands, and any modification (including "improving" `npm start` to also guard against lockfile creation) is an auto-reject trigger regardless of intent (GUARDRAILS.md §4, §5 trigger 1).

## Gotchas

- Don't assume "the repo has 0 dependencies, so `npm install` is harmless" — the lockfile is generated purely from `package.json`'s presence, not from having actual dependencies to resolve.
- If you're asked to "fix" the README/GUARDRAILS contradiction by updating `.gitignore` instead of `README.md`, refuse — `.gitignore` is protected and immutable to automation; only `README.md` may be edited to resolve this drift.
- A PR that looks otherwise clean can still be auto-rejected purely for an incidentally-generated `package-lock.json` sitting in the working tree — always check `git status` for this file specifically before considering any task complete.
