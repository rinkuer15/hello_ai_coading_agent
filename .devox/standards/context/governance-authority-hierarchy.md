# Governance Document Authority & Immutability

**When to load this:** Load whenever a task involves reading, referencing, or (especially) considering an edit to MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — including "fixing" a perceived typo or inconsistency in any of them.

## Overview

This repo's actual governance layer is four markdown files forming a total-ordering authority hierarchy, with a single absolute rule cutting across all of them: no automated workflow may ever edit any of the four, even to correct a genuine inconsistency. This is the highest-stakes trap in the repo because the "fix" impulse is usually correct engineering instinct — here it is explicitly wrong.

## Key Files

- `MISSION.md` — scope authority; defines in-scope/out-of-scope, hard invariants, quality gates; wins all scope disputes
- `GUARDRAILS.md` — process authority; absolute prohibitions, quality gates, protected-file classes, auto-reject triggers; wins all process disputes
- `CLAUDE.md` — style/convention authority; full ES5 rules, mandatory blank line, per-file scope; wins all code-style disputes
- `AGENTS.md` — discovery shim redirecting to `CLAUDE.md`; no independent authority of its own

## Patterns & Rules

- Conflict resolution order is explicit: "MISSION.md wins on scope, GUARDRAILS.md wins on process, this file [CLAUDE.md] wins on code style and conventions" (CLAUDE.md header, "Conflict resolution" line).
- `AGENTS.md` carries zero independent authority — it exists solely so tools that look for `AGENTS.md` by convention find the canonical instructions, and it redirects entirely to `CLAUDE.md` (AGENTS.md:1-8; CLAUDE.md header note on AGENTS.md).
- Hard Rule #1 in CLAUDE.md: "The governance files are immutable to automation. Editing `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md` — even to 'fix' a perceived inconsistency — is itself a compliance failure. Escalate to a human." (CLAUDE.md "Hard Rules" #1, citing GUARDRAILS.md §4).
- All four files are listed as "Immutable to automation" in the repository layout and "Important Files" tables (CLAUDE.md "Repository Layout"; CLAUDE.md "Important Files" table rows for MISSION.md/GUARDRAILS.md/CLAUDE.md/AGENTS.md).
- No code reads these `.md` files at runtime — the constitution only constrains how an agent may change layer 1 (the runtime oracle), never the reverse (CLAUDE.md "Architecture Deep-Dive" #1).
- As of this assessment, all four governance files were confirmed to match the actual code exactly (script names, forbidden tokens, file layout) — no drift was detected, so there is currently no legitimate "inconsistency" to tempt an agent into fixing.

## Gotchas

- The single strongest trap: encountering a real, verifiable inconsistency between a governance file and the code (or between two governance files) does NOT authorize editing the governance file — the correct action is to escalate to a human, not to "helpfully" resolve it yourself.
- Don't confuse "AGENTS.md redirects to CLAUDE.md" with "AGENTS.md is less important" in a way that makes it feel more editable — it is equally immutable despite having no independent content.
- A request framed as "just update the docs to match the code" is still an automation edit to a governance file and must be refused/escalated, regardless of how reasonable it sounds.
