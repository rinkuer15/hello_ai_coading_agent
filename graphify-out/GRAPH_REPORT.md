# Graph Report - .  (2026-06-29)

## Corpus Check
- 6 files · ~5,227 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 90 nodes · 117 edges · 8 communities
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Files & Architecture|Governance Files & Architecture]]
- [[_COMMUNITY_Build, Test & Coding Rules|Build, Test & Coding Rules]]
- [[_COMMUNITY_Quality Gates & Authority Hierarchy|Quality Gates & Authority Hierarchy]]
- [[_COMMUNITY_Process Rules & Guardrails|Process Rules & Guardrails]]
- [[_COMMUNITY_Hard Invariants & Allowed Evolutions|Hard Invariants & Allowed Evolutions]]
- [[_COMMUNITY_Out-of-Scope Prohibitions|Out-of-Scope Prohibitions]]
- [[_COMMUNITY_Runtime Contract & ES5 Constraints|Runtime Contract & ES5 Constraints]]
- [[_COMMUNITY_Triage & Issue Handling|Triage & Issue Handling]]

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent` - 11 edges
2. `Hello AI Coding Agent — Agent Instructions` - 10 edges
3. `Mission` - 9 edges
4. `Core Capabilities (In Scope)` - 7 edges
5. `Out of Scope (Must Never Build)` - 7 edges
6. `Quality Standards (Definition of Done)` - 6 edges
7. `Governance Layer` - 6 edges
8. `1. Triage Rules` - 5 edges
9. `Architecture & Key Patterns` - 4 edges
10. `3. Quality Gates for Auto-Merge` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Knowledge Graph Integration` --semantically_similar_to--> `graphify`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Automated Quality Gates` --semantically_similar_to--> `3. Quality Gates for Auto-Merge`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `main` --implements--> `Byte-Stable Regression Contract`  [INFERRED]
  src/index.js → MISSION.md
- `Governance Layer` --rationale_for--> `Zero-Blast-Radius Sandbox`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Authority Hierarchy** — mission_scope_authority, guardrails_process_authority, claude_style_authority [EXTRACTED 1.00]
- **Stdout Verification System** — index_main, mission_byte_stable_regression_contract, guardrails_quality_gates [INFERRED 0.85]
- **Governance Preservation Mechanism** — claude_governance_layer, guardrails_protected_files, mission_zero_blast_radius_sandbox [INFERRED 0.75]

## Communities (8 total, 0 thin omitted)

### Community 0 - "Governance Files & Architecture"
Cohesion: 0.16
Nodes (17): Governance Files Are the Architecture, Governance Layer, Module System One-Way Door, Single Execution Point, Zero Dependencies, Protected Files, Hard Invariants, Hello AI Coding Agent (+9 more)

### Community 1 - "Build, Test & Coding Rules"
Cohesion: 0.17
Nodes (13): graphify, Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files (+5 more)

### Community 2 - "Quality Gates & Authority Hierarchy"
Cohesion: 0.2
Nodes (11): code:bash (npm run lint && npm test), Automated Quality Gates, Coding Convention Enforcement, Governance Authority Hierarchy, Knowledge Graph Integration, Runtime Contract, Test Scaffolding (Prescribed, Not Yet Instantiated), 3. Quality Gates for Auto-Merge (+3 more)

### Community 3 - "Process Rules & Guardrails"
Cohesion: 0.18
Nodes (10): Meta-rule, 8. Codebase-Specific Notes, 8. Stack-Specific Traps (Read Before Any Validation), 2. Implementation Rules, 6. Escalation to Human, 7. Communication Style, 8. Stack-Specific Traps (Read Before Every Task), 9. Changes to This File (+2 more)

### Community 4 - "Hard Invariants & Allowed Evolutions"
Cohesion: 0.18
Nodes (11): Allowed Evolutions, code:bash (npm run lint          # exits 0), Gate 1 — Static Checks Pass, Gate 2 — Feature Is Discoverable Without Docs, Gate 3 — End-to-End Regression, Hard Invariants (Not Tunable by Issues), Mission, Non-Goals (+3 more)

### Community 5 - "Out-of-Scope Prohibitions"
Cohesion: 0.25
Nodes (9): Dependency Introduction, Governance File Modification, Language Modernisation, Module System Changes, Production Application Infrastructure, Runtime Complexity, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts) (+1 more)

### Community 6 - "Runtime Contract & ES5 Constraints"
Cohesion: 0.22
Nodes (8): ES5-Only JavaScript, Quality Gates, console.log, main, Byte-Stable Regression Contract, Quality Standards, Zero-Blast-Radius Sandbox, Zero External Dependencies

### Community 7 - "Triage & Issue Handling"
Cohesion: 0.4
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

## Knowledge Gaps
- **46 isolated node(s):** `AI Agent Instructions`, `Project Overview`, `Repository Layout`, `Build, Test & Lint`, `Core Architecture` (+41 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Mission` connect `Hard Invariants & Allowed Evolutions` to `Governance Files & Architecture`, `Quality Gates & Authority Hierarchy`, `Out-of-Scope Prohibitions`?**
  _High betweenness centrality (0.297) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent — Agent Instructions` connect `Build, Test & Coding Rules` to `Governance Files & Architecture`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **What connects `AI Agent Instructions`, `Project Overview`, `Repository Layout` to the rest of the system?**
  _46 weakly-connected nodes found - possible documentation gaps or missing edges._