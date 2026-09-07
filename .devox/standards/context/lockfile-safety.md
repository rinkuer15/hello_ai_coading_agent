# Lockfile Safety

**When to load this:** Running `npm install`, `npm ci`, or any command that touches `package.json` or the dependency tree.

## Overview

This repo has zero dependencies by design, and `package-lock.json` must never exist in the repository. Three separate, compounding failure surfaces can cause a lockfile to slip in: a bare `npm install`, a `.gitignore` that doesn't block it, and a README that recommends the unsafe command. This module documents all three so an agent doesn't "fix" one while leaving the others live.

## Key Files

- `package.json` — zero `dependencies`/`devDependencies`; 5 sealed scripts; presence of a lockfile alongside it is an auto-reject signal.
- `.gitignore` — 8 deliberate entries; does **not** include `package-lock.json`.
- `README.md` — the one file automation may freely edit; currently instructs bare `npm install`, which is known drift.

## Patterns & Rules

- Always run `npm install --no-package-lock` — never bare `npm install` — since this project has zero dependencies and any generated lockfile is unwanted (project-wide build/test convention).
- `.gitignore` has no lockfile entry — confirmed no `package-lock.json` exclusion exists among its 8 entries. The prohibition on committing a lockfile is enforced entirely by process/policy, not tooling, so a bare `npm install` followed by `git add .` would successfully stage the generated file.
- `package.json` has no `dependencies` or `devDependencies` keys at all (`package.json` structure) — any command that would populate them (e.g. `npm install <pkg>`) is out of scope; do not add packages "to improve tooling."
- README.md's setup section currently instructs bare `npm install`, contradicting the mandatory `--no-package-lock` flag — this is documented, accepted drift. Since README.md is the one file automation may freely modify, correcting this instruction there is in scope and encouraged; it is a documentation fix, not a rule change.

## Gotchas

- If a `package-lock.json` ever appears in `git status`, treat it as an immediate blocker — do not commit it, and do not try to "reconcile" it into `.gitignore` (the exclusion is a process rule, not a tooling rule, and `.gitignore` itself is immutable to automation).
- Don't assume `.gitignore`'s presence means lockfiles are safe from accidental commits — verify manually with `git status` after any `npm install`.
- Fixing the README's `npm install` instruction is explicitly allowed and recommended, but do not use this as justification to touch `package.json`'s scripts section, which is sealed.
