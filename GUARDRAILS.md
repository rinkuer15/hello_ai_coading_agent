# GUARDRAILS.md — Factory Governance for `hello-ai-coding-agent`

This file governs how the automated factory operates on this repository. The governance
hierarchy is: **MISSION.md** wins on scope (what to build), **GUARDRAILS.md** wins on
process (how to build it), and **CLAUDE.md** wins on code style (how to write it).
When documents conflict, that precedence order applies.

**The meta-rule:** Safety and correctness come before velocity. A rejected or deferred
issue causes no harm. A bad merge to `main` does.

---

## 1. Triage Rules

### Accept (label `factory:accepted`)
- Issues that add, modify, or remove logic inside `src/` (JavaScript `.js` files only)
- Issues that add or update `npm` scripts in `package.json` (scripts section only)
- Issues that add or update test files (`*.test.js` or files under `test/`)
- Issues that update `README.md` or other documentation files
- Issues that fix syntax errors caught by `node --check`
- Issues that add missing Node.js built-in test cases for existing functionality
- Issues that update `.gitignore` entries unrelated to secrets or CI

### Reject (label `factory:rejected`, close with comment)
- Issues requesting TypeScript migration without an explicit setup PR already merged
- Issues requesting a build step (Babel, esbuild, webpack, etc.) without prior human approval
- Issues that add runtime `dependencies` or `devDependencies` without explicit justification in the issue body
- Issues that introduce top-level side-effect code outside a named function (violates the `main()` wrapper convention)
- Issues that add ESM `import`/`export` syntax without an explicit CommonJS→ESM migration plan
- Issues that are duplicates of open or recently closed issues
- Issues with no reproducible description or acceptance criteria
- Issues that request changes outside the repository scope (infrastructure, hosting, DNS, etc.)

### Defer to human (label `factory:needs-human`)
- Any change to `.github/**` (workflows, actions, branch-protection rules)
- Any change that adds, removes, or modifies authentication or authorization logic
- Any change to `package.json` that adds a `dependencies` or `devDependencies` key for the first time
- Any change to Node.js engine requirements (`.nvmrc`, `engines` field in `package.json`)
- Any schema or data-model change (if a database is introduced in the future)
- Any change that touches files listed in **§ 4 Protected Files**
- Security-sensitive changes (cryptography, secrets handling, network exposure)
- Ambiguous issues where two or more valid interpretations exist and the author is unreachable
- Any issue that requires resolving a merge conflict in a protected file

### Priority assignment
| Label | Criteria |
|---|---|
| `priority:critical` | Broken `npm start` or `npm test` command; syntax error in `src/index.js` |
| `priority:high` | Test coverage gap for existing exported behaviour |
| `priority:normal` | New feature within accepted scope |
| `priority:low` | Documentation-only changes, comment updates |

---

## 2. Implementation Rules

### Absolute prohibitions
1. **Never modify tests to make them pass.** Fix the implementation, not the assertion.
2. **Never add a dependency (`require`/`import`) without stating the justification** in the PR description. Zero-dependency is a feature of this project.
3. **Never modify protected files** (see § 4). Even a whitespace-only change triggers auto-reject.
4. **Never commit secrets**, tokens, passwords, API keys, or `.env` files. The `.gitignore` already excludes `.env`; enforce it.
5. **Never declare success without running full validation** (`npm run lint && npm test`). A green CI is required, not assumed.
6. **Never add scope beyond the issue.** One issue → one focused PR. Opportunistic refactors belong in a separate issue.
7. **Never write top-level side-effect code.** All executable logic must live inside a named function (the established `main()` pattern).
8. **Never remove or rename the `main` export** in `src/index.js` without a corresponding update to all call sites.

### Requirements for every PR
- [ ] All changed `.js` files pass `node --check <file>` (syntax validation)
- [ ] `npm run lint` exits with code `0`
- [ ] `npm test` exits with code `0` (zero failures; new behaviour must include a test)
- [ ] PR description references the issue number (`Closes #N`)
- [ ] PR title follows the pattern: `<type>(<scope>): <short summary>` (e.g. `feat(src): add greeting formatter`)
- [ ] No new top-level side-effect code introduced
- [ ] No new dependencies added without human approval (see § 1 Defer)
- [ ] Diff is limited to files relevant to the stated issue

---

## 3. Quality Gates for Auto-Merge

All gates must pass. A single failure blocks the merge.

1. **Syntax check** — `node --check` passes on every modified `.js` file.
2. **Lint** — `npm run lint` exits `0` (currently syntax-only via `node --check src/index.js`; if ESLint is added later this gate automatically applies to it).
3. **Unit tests** — `npm test` exits `0` with no failing test cases.
4. **Behavioural smoke test** — `node src/index.js` exits with code `0` and produces non-empty stdout (the application must not crash on startup).
5. **Security check** — PR diff contains no string literals that match common secret patterns (API keys, tokens, passwords, PEM headers).
6. **Protected files untouched** — none of the files in § 4 appear in the diff.
7. **PR size limit** — fewer than 400 lines changed (additions + deletions). Larger PRs must be split or escalated to human review.
8. **Fix-attempt cap** — if automated fix attempts for a single issue exceed **3**, stop, label `factory:needs-human`, and leave a comment summarising what was tried.

---

## 4. Protected Files (Auto-Reject on Any Modification)

Modifications to any file below must arrive via a **human-authored PR** with at least one human reviewer approval.

| File / Pattern | Reason |
|---|---|
| `GUARDRAILS.md` | Governance document — this file |
| `MISSION.md` | Project scope definition (if present) |
| `CLAUDE.md` | Code-style contract (if present) |
| `.github/**` | CI/CD pipelines and branch-protection rules |
| `package.json` → `scripts` section (destructive changes) | Removing or renaming existing scripts breaks consumers |
| `.env`, `.env.*` | Secrets and environment configuration |
| `LICENSE` | Legal artefact |

---

## 5. Auto-Reject Triggers (No Fix Attempts)

These conditions cause an immediate rejection with a one-line explanation. No fix is attempted.

- Diff modifies a file in § 4
- Diff introduces a `require()` or `import` of a package not already listed in `package.json`
- Diff removes or renames the `main()` function in `src/index.js`
- Diff adds `process.exit()` with a non-zero hard-coded code (masks real errors)
- Diff contains a string that matches a secret pattern (e.g. `sk-`, `-----BEGIN`, `ghp_`, `xox[baprs]-`)
- Diff changes the `license` field in `package.json` away from `MIT`
- PR branch is targeting a branch other than `main`
- Issue body is empty or contains only a URL with no description
- PR was opened by a bot account against a protected file

---

## 6. Escalation to `factory:needs-human`

Escalate (label the issue, ping the human maintainer, stop all automation) when:

- The fix-attempt cap (3 attempts) is reached for a single issue
- Two auto-accepted issues produce mutually conflicting changes to the same file
- A new dependency is required to satisfy the issue and no human has approved it
- A passing test suite masks a functional regression detected during behavioural smoke (§ 3 gate 4)
- The issue scope is ambiguous and the author has not responded within the SLA window
- Any change is needed to `.github/**`, authentication logic, or secret-handling code
- A merge conflict exists in a protected file
- The Node.js version constraint needs to change (would affect all contributors)

---

## 7. Communication Style

- **PR descriptions**: factual, terse. State what changed, why, and which issue it closes.
- **Rejection comments**: one sentence stating the exact rule violated, e.g.:
  > "Auto-rejected: diff modifies `GUARDRAILS.md` (§ 4 Protected Files)."
- **Escalation comments**: summarise what was attempted and why automation cannot proceed, e.g.:
  > "Escalating to human: 3 fix attempts exhausted. Each attempt introduced a new syntax error in `src/index.js`. Manual review required."
- **No apologies, no filler, no marketing language.** Precision over politeness.
- **Use GitHub issue/PR number references** (`#N`) wherever applicable.
- **Labels are applied programmatically**; human reviewers must not remove `factory:*` labels without understanding their meaning.

---

## 8. Changes to This File

`GUARDRAILS.md` is on the protected-files list (§ 4). It may only be changed via a
**human-authored pull request** that receives at least one approving review from a
repository maintainer. Automated workflows must never open, edit, or approve such a PR.

To propose a governance change:
1. Open an issue tagged `governance` describing the proposed change and rationale.
2. A maintainer opens a PR modifying this file.
3. The PR is reviewed and merged by a human — **not** by the factory.

---

> ⚠️ This file is immutable by automated workflows. Modify only via human PR review.
