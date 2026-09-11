# Governance File Authority & Immutability Hierarchy

**When to load this:** Any task that reads, references, or is tempted to edit `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` — or when two governance documents appear to disagree.

## Overview

This repo is governed by a four-file constitution with a strict, total-ordered conflict-resolution rule and a hard immutability constraint: none of the four files may be edited by automation, ever, even to fix a perceived inconsistency between them. `CLAUDE.md` itself states this ordering explicitly and names itself as the single source of truth that `AGENTS.md` redirects to.

## Key Files

- `MISSION.md` — scope authority: what is/isn't in scope, hard invariants, out-of-scope list; wins all scope disputes
- `GUARDRAILS.md` — process authority: absolute prohibitions, quality gates, protected-file classes, auto-reject triggers, known compliance traps; wins all process disputes
- `CLAUDE.md` — style/convention authority: naming, ES5 rules, blank-line rule, full repo layout; wins all code-style disputes; states itself as canonical (`CLAUDE.md` header: "CLAUDE.md (this file) is the canonical, most detailed instruction set")
- `AGENTS.md` — pure discovery shim redirecting readers to `CLAUDE.md`; carries no independent authority of its own

## Patterns & Rules

- Conflict resolution is explicitly ordered, as stated in `CLAUDE.md`'s own header: "MISSION.md wins on scope, GUARDRAILS.md wins on process, this file wins on code style and conventions." When two governance docs seem to disagree, resolve by asking which *category* (scope vs. process vs. style) the disagreement falls into, then defer to the file that owns that category — not by picking whichever file was read first or seems more detailed.
- All four governance files are immutable to automation. `CLAUDE.md`'s Hard Rules section states this directly: "Editing MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — even to 'fix' a perceived inconsistency — is itself a compliance failure. Escalate to a human." This is the single most important trap in the whole repo: an agent that notices e.g. the README/`--no-package-lock` contradiction (see the `lockfile-safety` module) must NOT "helpfully" patch a governance file to resolve it — the correct action is to follow the higher-authority file and, if truly warranted, flag the discrepancy for human review rather than edit around it.
- `AGENTS.md` exists purely so that tools which discover instructions via the `AGENTS.md` filename convention still land on the same canonical rules as tools that look for `CLAUDE.md` — it is not a second, independently-maintained rule set. Any AI agent, regardless of which file it discovers first, follows the same instructions in `CLAUDE.md`.
- `README.md` is explicitly called out as the one file automation may freely modify — it carries no governance authority and is the correct place to reflect human-facing setup instructions, even though it may currently be out of sync with GUARDRAILS.md (see `lockfile-safety` module).

## Gotchas

- The four-file structure invites a natural "helpful" impulse to consolidate or fix contradictions between them (e.g., the README vs. GUARDRAILS lockfile instruction mismatch). This impulse must be resisted for the four governance files themselves — the correct move is always to follow the authority-ordering rule and escalate to a human, never to silently edit the governance layer.
- Because `AGENTS.md` has no independent authority, never treat instructions found only in `AGENTS.md` as an additional or alternate rule set — if `AGENTS.md` and `CLAUDE.md` ever appear to diverge, `CLAUDE.md` is correct by definition, since `AGENTS.md`'s only job is to redirect.
- "Immutable to automation" applies even to trivial-seeming edits like fixing a typo or updating a stale file-line-number citation inside these docs — there is no severity threshold below which self-editing governance files becomes acceptable for an automated agent.
