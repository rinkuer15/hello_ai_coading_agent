# Graph Report - .  (2026-06-29)

## Corpus Check
- 6 files · ~5,542 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 98 nodes · 131 edges · 8 communities
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Code Style & Governance Layer|Code Style & Governance Layer]]
- [[_COMMUNITY_Developer Docs & Architecture|Developer Docs & Architecture]]
- [[_COMMUNITY_Guardrails & Auto-Reject Rules|Guardrails & Auto-Reject Rules]]
- [[_COMMUNITY_Mission & Project Scope|Mission & Project Scope]]
- [[_COMMUNITY_Quality Gates & Automation|Quality Gates & Automation]]
- [[_COMMUNITY_Runtime Contract|Runtime Contract]]
- [[_COMMUNITY_Out-of-Scope Prohibitions|Out-of-Scope Prohibitions]]
- [[_COMMUNITY_Triage & Human Escalation|Triage & Human Escalation]]

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent` - 11 edges
2. `Hello AI Coding Agent — Agent Instructions` - 10 edges
3. `Mission` - 9 edges
4. `Core Capabilities (In Scope)` - 7 edges
5. `Out of Scope (Must Never Build)` - 7 edges
6. `Quality Standards (Definition of Done)` - 7 edges
7. `Hard Invariants` - 6 edges
8. `Governance Layer` - 6 edges
9. `1. Triage Rules` - 5 edges
10. `Architecture & Key Patterns` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Hard Invariants` --semantically_similar_to--> `Auto-Reject Triggers`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Knowledge Graph Integration` --semantically_similar_to--> `graphify`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Automated Quality Gates` --semantically_similar_to--> `3. Quality Gates for Auto-Merge`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `main` --implements--> `Byte-Stable Regression Contract`  [INFERRED]
  src/index.js → MISSION.md

## Hyperedges (group relationships)
- **Governance Rule Hierarchy** — mission_document, guardrails_document, claude_document, mission_constitutional_governance_hierarchy [EXTRACTED 1.00]
- **Governance Enforcement System** — mission_hard_invariants, guardrails_auto_reject_triggers, guardrails_quality_gates, guardrails_protected_files [INFERRED 0.85]

## Communities (8 total, 0 thin omitted)

### Community 0 - "Code Style & Governance Layer"
Cohesion: 0.15
Nodes (19): ES5 Only Rule, Governance Files Are the Architecture, Governance Layer, Single Execution Point, Single-File Flat Architecture, Zero Dependencies, Protected Files, Constitutional Governance Hierarchy (+11 more)

### Community 1 - "Developer Docs & Architecture"
Cohesion: 0.15
Nodes (14): Architecture & Key Patterns, Build, Test & Lint, code:js (var assert = require('node:assert');), Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files (+6 more)

### Community 2 - "Guardrails & Auto-Reject Rules"
Cohesion: 0.15
Nodes (12): Module System One-Way Door, Auto-Reject Triggers, Meta-rule, 2. Implementation Rules, 6. Escalation to Human, 7. Communication Style, 8. Changes to This File, Absolute Prohibitions (+4 more)

### Community 3 - "Mission & Project Scope"
Cohesion: 0.17
Nodes (12): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, What Hello AI Coding Agent Is, Who It's For, Coding Convention Enforcement (+4 more)

### Community 4 - "Quality Gates & Automation"
Cohesion: 0.2
Nodes (11): 3. Quality Gates for Auto-Merge, code:bash (npm run lint && npm run type-check && npm test), code:block2 (Hello, AI Coding Agent!), Quality Standards (Definition of Done), code:bash (npm run lint && npm test), code:bash (npm run lint          # exits 0), Automated Quality Gates, Gate 1 — Static Checks Pass (+3 more)

### Community 5 - "Runtime Contract"
Cohesion: 0.18
Nodes (10): Byte-Stable Stdout Contract, ES5-Only JavaScript, Quality Gates, console.log, main, Byte-Stable Regression Contract, Deterministic Stdout Contract, Quality Standards (+2 more)

### Community 6 - "Out-of-Scope Prohibitions"
Cohesion: 0.25
Nodes (9): 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), Out of Scope (Must Never Build), Dependency Introduction, Governance File Modification, Language Modernisation, Module System Changes, Production Application Infrastructure (+1 more)

### Community 7 - "Triage & Human Escalation"
Cohesion: 0.4
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

## Knowledge Gaps
- **47 isolated node(s):** `AI Agent Instructions`, `Project Overview`, `Repository Layout`, `Build, Test & Lint`, `Core Architecture` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Mission` connect `Mission & Project Scope` to `Code Style & Governance Layer`, `Quality Gates & Automation`, `Out-of-Scope Prohibitions`?**
  _High betweenness centrality (0.293) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent — Agent Instructions` connect `Developer Docs & Architecture` to `Code Style & Governance Layer`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent` connect `Code Style & Governance Layer` to `Guardrails & Auto-Reject Rules`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `AI Agent Instructions`, `Project Overview`, `Repository Layout` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._