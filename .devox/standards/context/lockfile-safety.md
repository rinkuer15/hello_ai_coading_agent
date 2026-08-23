# Lockfile Safety & npm Discipline

**When to load this:** Any task that runs `npm install`, modifies `package.json`, sets up a development environment, or involves dependency management.

## Overview

The presence of `package-lock.json` is an **immediate auto-reject trigger** in this repository. There are three compounding failure surfaces: (1) bare `npm install` silently generates `package-lock.json` even when there are zero dependencies, (2) `.gitignore` does **not** block `package-lock.json` — making it eligible to be accidentally staged and committed, and (3) `README.md` actively instructs `npm install` without the required `--no-package-lock` flag. This makes the lockfile trap the highest-probability accidental compliance failure in the repo.

## Key Files

- `package.json` — Zero `dependencies` and `devDependencies`; `npm install` is a no-op content-wise but still generates a lockfile without the flag.
- `.gitignore` — 8 entries; does **not** include `package-lock.json` or `npm-shrinkwrap.json`. (Architecture Assessment §Drift Findings, item 1.)
- `README.md` — Setup section uses bare `npm install`; this is a documented drift from GUARDRAILS.md. (Architecture Assessment §Drift Findings, item 2.)

## Patterns & Rules

**Always use `--no-package-lock`** — Every invocation of `npm install` must include the `--no-package-lock` flag: `npm install --no-package-lock`. (`CLAUDE.md §Key Conventions`, item 7.) This is stated as an absolute prohibition in `GUARDRAILS.md §5`, item 3: "Never run bare `npm install`."

**`package-lock.json` presence is an auto-reject trigger** — `GUARDRAILS.md §5` lists lockfile presence as one of the 13 auto-reject triggers. An agent must not commit, stage, or leave a `package-lock.json` in the working directory.

**`.gitignore` does not protect you** — Despite `CLAUDE.md`'s description of "`.gitignore` — 8 deliberate entries including lockfile exclusions," the actual `.gitignore` contains `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `.DS_Store`, `graphify-out/manifest.json`, and `graphify-out/cost.json`. `package-lock.json` is absent. (Architecture Assessment §Drift Findings, item 1.) If a lockfile is generated, `git status` will show it as untracked and `git add .` will stage it.

**`npm install` is a no-op for dependencies, not for files** — This repo has zero `dependencies` and zero `devDependencies` (`package.json`). Running `npm install` installs nothing, but it still writes `package-lock.json`. The "no-op" characterisation in CLAUDE.md refers only to package installation, not to filesystem side effects.

**README.md drift is a known issue, not a valid instruction** — `README.md` says `npm install` in its Setup section. This contradicts `GUARDRAILS.md §2` Absolute Prohibition #4. The README is the only file automation may freely modify; the prohibition in GUARDRAILS.md takes precedence. (Architecture Assessment §Drift Findings, item 2.)

**Verify absence before committing** — Before any `git commit`, verify `package-lock.json` does not exist: `git status` must not list it in tracked or untracked files. If it appears, delete it and re-run with `npm install --no-package-lock`.

**`npm-shrinkwrap.json` is equally prohibited** — The lockfile prohibition covers all npm lockfile formats. (`GUARDRAILS.md §5`, by extension of the lockfile auto-reject trigger.)

## Gotchas

**The `.gitignore` claim in CLAUDE.md is inaccurate.** CLAUDE.md states the `.gitignore` includes "lockfile exclusions." It does not. An agent who reads CLAUDE.md and assumes the lockfile is gitignored will be surprised when `git status` shows it as untracked after a bare `npm install`. Always verify with `git status` after any `npm` command.

**CI/CD and fresh-clone scenarios are especially risky.** A developer cloning the repo and following `README.md` literally will: (1) run `npm install`, (2) generate `package-lock.json`, (3) see it as untracked (not gitignored), (4) potentially include it in a commit. The combination of README drift + missing gitignore entry creates a two-failure-mode trap.

**`npm ci` is also prohibited.** `npm ci` requires a lockfile to exist and would fail here anyway, but the prohibition on lockfiles means it can never legitimately be used in this repo. Use `npm install --no-package-lock` exclusively.

**Even `npm install --save-dev somepackage --no-package-lock` is prohibited.** Adding any dependency — dev or otherwise — is an auto-reject trigger independent of the lockfile issue. Zero dependencies is a hard invariant. (`GUARDRAILS.md §2`, Absolute Prohibition: "Never add any npm dependency.")
