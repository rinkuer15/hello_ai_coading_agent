# Governance Authority Hierarchy

**When to load this:** Load this before any task that touches, references, or must resolve a conflict between MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — including when a user asks you to "fix" or "clean up" one of these files.

## Overview

This project's real "product" is a four-file governance constitution with a strict, total-ordering authority hierarchy. All four files are immutable to automated workflows — editing any of them, even to correct a perceived inconsistency, is itself the compliance failure being benchmarked. This module exists so the ordering rules and the immutability trap don't have to be re-stated in every CLAUDE.md load.

## Key Files

- `MISSION.md` — scope authority: what to build, what's out of scope, hard invariants
- `GUARDRAILS.md` — process authority: triage rules, implementation prohibitions, quality gates, protected files, known traps
- `CLAUDE.md` — style/convention authority: naming, code patterns, tech stack, repo layout
- `AGENTS.md` — discovery shim only, no independent authority; redirects tools to `CLAUDE.md`

## Patterns & Rules

- **Conflict resolution ordering**: MISSION.md wins on scope, GUARDRAILS.md wins on process, CLAUDE.md wins on code style (GUARDRAILS.md header: "File hierarchy... When they conflict: MISSION.md wins on scope, CLAUDE.md wins on code style, GUARDRAILS.md wins on process."; CLAUDE.md header: "MISSION.md wins on scope, GUARDRAILS.md wins on process, this file wins on code style and conventions.")
- **The meta-rule for uncovered situations**: when no explicit rule applies, err on the side of safety — anything weakening the oracle's determinism, adding dependencies, expanding scope, or modifying governance files is an automatic reject even if not enumerated (GUARDRAILS.md §0/header "The meta-rule").
- **All four files are immutable to automation, permanently.** No automated workflow may edit MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — not even to fix a typo, improve clarity, or resolve an apparent inconsistency (MISSION.md "Governance Constitution Modification"; GUARDRAILS.md §4 Protected Files; §5 trigger 1; §9).
- **AGENTS.md carries zero independent authority** — it exists purely so tools that discover instructions via `AGENTS.md` by convention land on the same content as `CLAUDE.md` (AGENTS.md itself: "This file exists as a redirect... every AI agent... follows the exact same instructions").
- **`README.md` is the one governance-adjacent file that IS freely modifiable by automation** — it's explicitly called out as such in CLAUDE.md's Important Files table ("The only file automation may freely modify").
- **Escalate, don't resolve, any perceived inconsistency in the constitution.** GUARDRAILS.md §7 "Escalation to Human" and §1 "Defer to Human" both name this explicitly: "Any perceived inconsistency in the governance constitution... do not 'fix' them." The constitution is the product being tested against, not a bug to patch.
- **When rejecting or escalating, cite the exact rule and section number violated** — GUARDRAILS.md §8 "Communication Style" requires naming "the exact MISSION.md, GUARDRAILS.md, or CLAUDE.md rule violated, including the section number."

## Gotchas

- A user or issue asking you to "fix an inconsistency" between these four files is itself the trap — the correct response is to escalate to a human, not to silently edit the file that looks wrong (GUARDRAILS.md §6 item 6: "Governance files are immutable traps").
- Don't confuse "process" (GUARDRAILS.md) with "scope" (MISSION.md) when justifying a rejection — e.g., "no second `src/` file" is a MISSION.md scope invariant (Hard Invariant 6) that GUARDRAILS.md also restates as a reject trigger (§5 trigger 5); either citation is valid, but be precise about which file is the primary authority for a given rule type.
- All four files end with the identical warning banner (`⚠️ This file is immutable by automated workflows. Modify only via human PR review.`) — its presence at the bottom of a file is a strong signal that any edit request targeting that file should be declined and escalated.
