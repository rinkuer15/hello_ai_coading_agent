# Lockfile Safety

**When to load this:** Before running `npm install`, or when modifying `package.json`.

## Overview

This project has zero dependencies by design, making `npm install` a true no-op — but three compounding gaps mean a careless install can still leave a `package-lock.json` staged for commit. This module exists so agents check the safe install command before touching dependencies, rather than trusting `.gitignore` or the README to protect them.

## Key Files

- `package.json` — has no `dependencies` or `devDependencies` keys; any lockfile generated from it would be trivial but still must not be committed.
- `.gitignore` — contains 8 deliberate entries but does **not** include `package-lock.json`.
- `README.md` — currently instructs a bare `npm install`, which contradicts the required safe workflow.

## Patterns & Rules

- Always install with `npm install --no-package-lock` — never a bare `npm install` (per Build/Test/Lint section: "Install dependencies (always a no-op — zero deps — MUST use --no-package-lock)").
- `.gitignore`'s 8 entries (`node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`) deliberately do **not** include `package-lock.json` — this exclusion is enforced by process policy (GUARDRAILS.md), not by `.gitignore` itself.
- `README.md`'s bare `npm install` instruction contradicts GUARDRAILS.md's `--no-package-lock` requirement — when the two conflict, follow GUARDRAILS.md regardless of what README.md currently says.
- A committed `package-lock.json` is an immediate auto-reject trigger per the pre-PR validation gate ("confirm no package-lock.json — lockfile presence is an immediate auto-reject").

## Gotchas

- Running bare `npm install` will generate `package-lock.json` and, because `.gitignore` does not block it, a subsequent `git add .` or `git add -A` will stage it without any warning.
- Because the project has zero dependencies, it's tempting to assume `npm install` is "harmless" — the lockfile generation risk exists regardless of dependency count.
- If a `package-lock.json` is ever found in the working tree (staged or not), delete it before committing rather than adding it to `.gitignore` — `.gitignore` is itself an immutable, protected file (see `governance-authority-hierarchy.md`).
- README.md is explicitly the one file automation may freely modify — if instructed to reconcile the README/GUARDRAILS contradiction, update README.md's install instructions to `npm install --no-package-lock`, not the other way around.
