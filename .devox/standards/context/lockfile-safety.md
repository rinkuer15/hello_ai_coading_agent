# Lockfile Safety

**When to load this:** Load this before running `npm install`, adding/editing dependencies, or touching `package.json`.

## Overview

This project enforces a zero-dependency invariant, but npm's default behavior actively works against that: a bare `npm install` generates `package-lock.json` even when there are zero dependencies to lock, and `.gitignore` does not block it. This is a compounding failure surface across three files (`package.json`, `.gitignore`, and the generated lockfile itself) that's easy to trigger by habit.

## Key Files

- `package.json` — zero `dependencies`/`devDependencies`; 5 frozen scripts (sealed public API)
- `.gitignore` — 8 deliberate entries; does NOT include `package-lock.json`

## Patterns & Rules

- **Always use `npm install --no-package-lock`, never bare `npm install`.** Bare `npm install` silently generates `package-lock.json` even with zero deps — an immediate auto-reject trigger (GUARDRAILS.md §2 rule 4; §5 trigger 3; §6 item 4).
- **`.gitignore` has exactly 8 deliberate entries** (`node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`) and is itself immutable (GUARDRAILS.md §4). None of them is `package-lock.json` — its exclusion is enforced by process policy, not the filesystem (GUARDRAILS.md §4 note; §6 item 8).
- **Never add any npm dependency for any reason** — not for testing, linting, formatting, or type-checking (GUARDRAILS.md §2 rule 3; MISSION.md Hard Invariant 3). Zero `dependencies`/`devDependencies` is permanent.
- **`package.json`'s scripts section is a sealed public API** — the 5 existing scripts (`start`, `test`, `lint`, `type-check`, `es5-check`) may not be modified, and it is on the protected-files list (GUARDRAILS.md §4; §2 rule "Requirements for Every PR").
- **README.md's Setup section shows bare `npm install`** — this is known, acknowledged documentation drift (GUARDRAILS.md §2 rule 4 note). Following the README does not exempt you from the `--no-package-lock` requirement or from the lockfile auto-reject rule (GUARDRAILS.md §6 item 4).

## Gotchas

- If a lockfile is accidentally generated (e.g., by an agent or contributor running bare `npm install`), it must be manually deleted before staging any changes — `.gitignore` will not catch it (GUARDRAILS.md §6 item 8).
- Fixing the README's bare `npm install` instruction is in scope (README.md is the one freely modifiable file), but do not treat the README's current wording as authorization to skip `--no-package-lock` in your own actions.
- `package-lock.json` presence in the repo is checked as an explicit quality gate (`GUARDRAILS.md §3 gate 7`) — verify it's absent before considering any change complete.
