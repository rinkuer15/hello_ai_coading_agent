# Governance Authority Hierarchy

**When to load this:** Any task that reads, references, or is asked to modify `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` — or any task where instructions from these files appear to conflict.

## Overview

The repository is governed by four markdown files that form a strict authority hierarchy for resolving conflicts, and all four are immutable to automated agents regardless of the conflict-resolution outcome. `CLAUDE.md` itself states the ordering explicitly: "MISSION.md wins on scope, GUARDRAILS.md wins on process, this file [CLAUDE.md] wins on code style and conventions." `AGENTS.md` sits outside this ordering entirely as a pure discovery shim with no independent authority. This module exists because the interaction between "which file wins" and "no file may be edited" is a subtle rule system that's easy to get wrong under pressure (e.g., when a file seems to contain a typo or contradiction).

## Key Files

- `MISSION.md` — scope authority: defines in-scope/out-of-scope, hard invariants, quality gates. Wins all scope disputes.
- `GUARDRAILS.md` — process authority: absolute prohibitions, quality gates, protected-file classes, auto-reject triggers, known compliance traps. Wins all process disputes.
- `CLAUDE.md` — style/convention authority: naming, code patterns, tech stack, repo layout, hard rules, important files, gotchas. Wins all code-style disputes. Also the canonical source that `AGENTS.md` redirects to.
- `AGENTS.md` — pure discovery shim redirecting to `CLAUDE.md`. Explicitly states it has "no independent authority" and exists only so tools that look for `AGENTS.md` by convention find the real instructions.

## Patterns & Rules

1. **Total ordering for conflicts is: MISSION.md (scope) > GUARDRAILS.md (process) > CLAUDE.md (style).** CLAUDE.md states this explicitly in its own header block. If a scope question and a style question conflict, scope wins; if a process rule and a style convention conflict, process wins.
2. **All four governance files are immutable to automation — this is orthogonal to the ordering above.** Even the *winning* file in a conflict cannot be edited by an agent to "resolve" the conflict; CLAUDE.md's Hard Rule 1 states "Editing MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — even to 'fix' a perceived inconsistency — is itself a compliance failure. Escalate to a human." The correct action when governance files conflict or appear stale is always to escalate, never to edit.
3. **`AGENTS.md` is a redirect with zero independent authority**, unlike the other three. It should never be cited as a source of a *rule* — only as a pointer to `CLAUDE.md`. If a tool discovers `AGENTS.md` first, the agent must still treat `CLAUDE.md` as the actual rule source.
4. **A known, accepted inconsistency exists between README.md and GUARDRAILS.md** (see `lockfile-safety` module) — this is a worked example of the ordering in action: README.md has no governance authority at all (it's the one freely-editable human-facing doc per CLAUDE.md's Important Files table), so GUARDRAILS.md's `--no-package-lock` requirement wins without needing any escalation, since there's no real conflict between peer-authority files, just between a governed file and an ungoverned one.
5. **The four governance files list themselves as reciprocally protected** — CLAUDE.md's Important Files table marks all four as "Immutable to automation," and GUARDRAILS.md §4 (referenced but not reproduced here) is described as containing "the list of files no automated workflow may modify."

## Gotchas

- Don't confuse "wins the conflict" with "may be edited." A file can be the authoritative source for a dispute and still be completely off-limits for automated editing — these are two independent axes, and conflating them is the most likely mistake here.
- If you find what looks like a genuine contradiction *between* MISSION.md, GUARDRAILS.md, and CLAUDE.md (not just README.md vs. the governance layer), the correct response is to stop and escalate to a human via the ask_user mechanism, not to silently apply the ordering rule and proceed — the ordering rule is for reasoning about which rule to *follow*, not license to resolve textual contradictions in governance content unilaterally.
- Because AGENTS.md explicitly disclaims independent authority, never treat "AGENTS.md says X" as a stronger or weaker claim than "CLAUDE.md says X" — they are the same claim, since AGENTS.md is definitionally a mirror/redirect.
