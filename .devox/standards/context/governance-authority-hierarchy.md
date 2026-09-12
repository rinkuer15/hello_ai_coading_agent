# Governance File Authority Chain and Immutability

**When to load this:** Any task that touches, references, or is asked to reconcile MISSION.md, GUARDRAILS.md, CLAUDE.md, or AGENTS.md — including tasks that merely need to resolve an apparent conflict between them.

## Overview

This repo's four governance files form a strict, total-ordering authority chain that determines which file "wins" for any given type of dispute, and all four are immutable to automated workflows regardless of perceived correctness. This module exists to give the ordering and immutability rule dedicated depth beyond CLAUDE.md's brief summary, including a documented case of drift between the files that must NOT be autonomously "fixed."

## Key Files

- `MISSION.md` — scope authority: what is/isn't in scope, hard invariants, quality standards. Wins all scope disputes.
- `GUARDRAILS.md` — process authority: triage rules, absolute prohibitions, quality gates, protected files, auto-reject triggers, known compliance traps. Wins all process disputes.
- `CLAUDE.md` — style/convention authority: naming, code patterns, tech stack, repo layout. Wins all code-style disputes.
- `AGENTS.md` — discovery shim only; redirects to CLAUDE.md; carries no independent authority of its own.

## Patterns & Rules

1. **The authority ordering is explicit and total:** "MISSION.md defines _what_ to build. CLAUDE.md defines _how_ code is written. GUARDRAILS.md (this file) defines _how the process operates safely_. When they conflict: MISSION.md wins on scope, CLAUDE.md wins on code style, GUARDRAILS.md wins on process." (GUARDRAILS.md, opening section). CLAUDE.md's own header restates the same three-way split and adds that it "wins on code style and conventions" while MISSION.md "wins on scope" and GUARDRAILS.md "wins on process."
2. **All four files are immutable to automated workflows, without exception, even to fix a perceived error.** Editing any of them — "even to 'fix' a perceived inconsistency" — is itself the compliance failure being tested (GUARDRAILS.md §1 "Defer to Human", §6.6, §9; MISSION.md "Out of Scope" — "Governance Self-Modification"; MISSION.md "Hard Invariants" #4). The only legitimate path to changing them is a human-authored PR reviewed by the project owner (GUARDRAILS.md §9).
3. **They are also listed as protected files with an explicit auto-reject trigger** (GUARDRAILS.md §4 — protected files list includes all four; §5 trigger 1 — "Modification of any protected file"). This is enforced independently of the immutability rule in §1/§6 — i.e., there are two separate citations for the same prohibition, reinforcing it rather than conflicting.
4. **`AGENTS.md` has zero independent authority.** It exists solely so that tools which discover instructions via the `AGENTS.md` convention find the canonical content immediately, by redirecting to CLAUDE.md. It is still immutable to automation despite carrying no rules of its own (repo file `AGENTS.md` header: "This file exists as a redirect so tools that look for AGENTS.md find the canonical instructions immediately").
5. **A documented, known drift exists and must be escalated, not silently resolved:** CLAUDE.md and MISSION.md both describe the ES5 forbidden-token list in prose as including "destructuring" and "spread," but the actual automated checker (`scripts/es5-check.js:28-37`) has no explicit destructuring-pattern check — only `const`, `let`, `=>`, backtick, `class`, `async`, `await`, and `...` (spread/rest) are tested. Destructuring performed via plain assignment without `const`/`let` would not be caught. This is a real gap between documented intent and actual tool coverage, not merely a documented trap — see `es5-compliance-traps.md` and `es5-checker-mechanics.md` for the technical detail. **Any agent that notices this must not "fix" it by editing CLAUDE.md or MISSION.md** — those files are immutable. The correct response is escalation to a human (GUARDRAILS.md §7 — "Any perceived inconsistency is found in the governance constitution — do not resolve it autonomously; the constitution is the product being tested against").
6. **Conflict resolution is scoped, not global** — e.g., if a process question and a style question both touch the same PR, GUARDRAILS.md governs the process aspects (e.g., which quality gates must pass) while CLAUDE.md governs the style aspects (e.g., `var` vs `const`) of the same change; neither file "overrides" the other outside its designated domain.
7. **`README.md` is the sole freely-modifiable file** in the whole repo, explicitly carved out from the protected list (GUARDRAILS.md §1 "Accept" — "Documentation improvements and typo fixes to README.md (the only freely modifiable file)"; CLAUDE.md repository layout table — "README.md ... May be modified by automation.").

## Gotchas

- Do not treat "the governance files disagree with the code" as a bug to patch in the governance files — per the meta-rule and escalation rules, this is either an intentional compliance trap or a case requiring human judgement, and the correct move is always to stop and escalate, never to edit MISSION.md/GUARDRAILS.md/CLAUDE.md/AGENTS.md.
- Don't confuse "immutable to automation" with "never changes" — human-reviewed PRs to these files are explicitly the sanctioned path (GUARDRAILS.md §9); the restriction is on autonomous/automated edits specifically.
- When escalating, GUARDRAILS.md §8 requires naming "the exact MISSION.md, GUARDRAILS.md, or CLAUDE.md rule violated, including the section number" — vague escalations without a specific citation are themselves a process failure.
