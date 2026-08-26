# Lockfile Safety

**When to load this:** Any task that runs `npm install`, modifies `package.json`, sets up a development environment, or involves dependency management.

## Overview

The presence of `package-lock.json` is an **immediate auto-reject trigger** in this repository. There are three compounding failure surfaces: (1) bare `npm install` silently generates `package-lock.json` even when there are zero dependencies, (2) `.gitignore` does **not** block `package-lock.json` — making it eligible to be accidentally staged and committed, and (3) `README.md` actively instructs `npm install` without the required `--no-package-lock` flag. This combination makes lockfile generation the highest-probability accidental compliance failure in the repo.

## Key Files

- `package.json` — Zero `dependencies` and `devDependencies`; `npm install` is a no-op content-wise but still generates a lockfile without the flag.
- `.gitignore` — 8 entries (`node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, `graphify-out/cost.json`); does **not** include `package-lock.json`.
- `GUARDRAILS.md` — §2 Absolute Prohibition #4; §5 auto-reject trigger #3. Process authority on lockfile policy.
- `README.md` — Setup section uses bare `npm install`; this is documented drift from GUARDRAILS.md.

## Patterns & Rules

**Always use `--no-package-lock`** — Every invocation of `npm install` must include the flag: `npm install --no-package-lock`. (`CLAUDE.md §Build, Test & Lint`; `GUARDRAILS.md §2`.) This applies even when installing zero packages.

**`package-lock.json` presence is an auto-reject trigger** — `GUARDRAILS.md §5` lists lockfile presence as one of the 13 auto-reject triggers. An agent must not commit, stage, or leave a `package-lock.json` in the working directory.

**`.gitignore` does not protect you** — Despite CLAUDE.md's description mentioning "8 deliberate entries," the actual `.gitignore` contains no lockfile exclusion. If a lockfile is generated, `git status` will show it as untracked and `git add .` will stage it silently. (`CLAUDE.md §Miscellaneous / Gotchas`, first entry.)

**`npm install` is a no-op for dependencies, not for files** — This repo has zero `dependencies` and zero `devDependencies` (`package.json`). Running `npm install` installs nothing, but it still writes `package-lock.json`. The "install is a no-op" claim applies only to package installation, not filesystem side effects.

**README.md drift is a known issue, not a valid instruction** — `README.md` says `npm install` in its setup section. This contradicts `GUARDRAILS.md §2`. The README is the only file automation may freely modify; the prohibition in GUARDRAILS.md takes precedence. (`CLAUDE.md §Miscellaneous / Gotchas`, second entry.)

**Verify absence before committing** — Before any `git commit`, verify `package-lock.json` does not exist: `git status` must not list it. If it appears, delete it and re-run `npm install --no-package-lock`.

**`npm-shrinkwrap.json` is equally prohibited** — The lockfile prohibition covers all npm lockfile formats. (Extension of `GUARDRAILS.md §5` auto-reject trigger #3.)

**Zero dependencies is a hard invariant** — Adding any `npm` package (dependency or devDependency) is an auto-reject trigger independent of the lockfile issue. (`GUARDRAILS.md §2`; `CLAUDE.md §Tech Stack`.)

## Gotchas

**The `.gitignore` claim in CLAUDE.md is inaccurate.** CLAUDE.md states the `.gitignore` includes "lockfile exclusions." It does not. An agent who reads CLAUDE.md and assumes the lockfile is gitignored will be surprised when `git status` shows it as untracked after a bare `npm install`. Always verify with `git status` after any `npm` command.

**CI/CD and fresh-clone scenarios are especially risky.** A developer cloning the repo and following `README.md` literally will: (1) run `npm install`, (2) generate `package-lock.json`, (3) see it as untracked (not gitignored), (4) potentially include it in a commit. The combination of README drift + absent gitignore entry creates a compounding two-failure-mode trap.

**`npm ci` is also prohibited.** `npm ci` requires a lockfile to exist and would fail here anyway, but the prohibition on lockfiles means it can never legitimately be used in this repo.

**Even `npm install --save-dev somepackage --no-package-lock` is prohibited.** Adding any dependency — dev or otherwise — is an auto-reject trigger independent of the lockfile issue. Zero dependencies is a hard invariant. (`GUARDRAILS.md §2`.)
