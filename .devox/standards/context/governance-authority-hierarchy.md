# Governance Authority Hierarchy

**When to load this:** Before any task that touches, references, or would require changing `MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, or `AGENTS.md`.

## Overview

This repo is governed by four layered documents with a strict total ordering of authority, and all four are immutable to automated agents regardless of how well-intentioned a proposed edit might be. This is a distinct process/legal topic from code style or ES5 mechanics — it only matters when a task's scope brushes against the governance layer itself, so it's kept out of the always-loaded CLAUDE.md.

## Key Files

- `MISSION.md` — scope authority; defines in-scope/out-of-scope work and hard invariants. Wins all scope disputes.
- `GUARDRAILS.md` — process authority; absolute prohibitions, quality gates, protected-file classes. Wins all process disputes.
- `CLAUDE.md` — style/convention authority; naming, ES5 rules, per-file scope. Wins all code-style disputes.
- `AGENTS.md` — a pure discovery shim redirecting to `CLAUDE.md`; carries no independent authority of its own.

## Patterns & Rules

- Conflict resolution ordering is explicit: "MISSION.md wins on scope, GUARDRAILS.md wins on process, this file [CLAUDE.md] wins on code style and conventions" (CLAUDE.md header).
- All four governance files are described as "Immutable to automation" in the Repository Layout table — no automated workflow, including this AI agent, may edit them even to fix a perceived inconsistency.
- The one documented exception in the entire repo to "automation may edit files" is `README.md`, explicitly called out as "the only file automation may freely modify" (Important Files table) — everything else, especially the four governance docs, is out of bounds.
- `AGENTS.md`'s sole purpose is discoverability: several tools look for `AGENTS.md` by convention, so it exists to redirect them to `CLAUDE.md` rather than duplicating content — it must never diverge from being a pure redirect.
- If an agent identifies a genuine inconsistency between governance files (e.g., README.md's bare `npm install` contradicting GUARDRAILS.md's `--no-package-lock` requirement), the correct action is to escalate to a human reviewer, not to edit the governance file directly.

## Gotchas

- It is tempting for an agent to "just fix" a small inconsistency it notices in one of these four files during an unrelated task — this is explicitly called out as a compliance failure, not a helpful correction, even if the fix is objectively correct.
- Because `CLAUDE.md` states it wins on "code style and conventions" but `GUARDRAILS.md` wins on "process," an agent must judge which category a given rule falls into before assuming which document governs — when genuinely ambiguous, treat it as a process question deferred to `GUARDRAILS.md`.
- `AGENTS.md` looking "thin" or "redundant" compared to `CLAUDE.md` is by design, not an oversight — do not attempt to "flesh it out" with duplicated content, as this would create a second source of truth that could drift.
