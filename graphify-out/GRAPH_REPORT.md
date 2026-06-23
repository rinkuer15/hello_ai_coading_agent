# Graph Report - .  (2026-06-23)

## Corpus Check
- 6 files · ~4,437 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 75 nodes · 95 edges · 7 communities
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core Governance Concepts|Core Governance Concepts]]
- [[_COMMUNITY_Process Rules & Quality Gates|Process Rules & Quality Gates]]
- [[_COMMUNITY_Agent Instructions Detail|Agent Instructions Detail]]
- [[_COMMUNITY_Project Setup & Usage|Project Setup & Usage]]
- [[_COMMUNITY_Mission & Scope Detail|Mission & Scope Detail]]
- [[_COMMUNITY_Issue Triage Rules|Issue Triage Rules]]

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent` - 11 edges
2. `Hello AI Coding Agent — Agent Instructions` - 10 edges
3. `Mission` - 9 edges
4. `1. Triage Rules` - 5 edges
5. `Governance Layer` - 5 edges
6. `Architecture & Key Patterns` - 4 edges
7. `Hard Invariants` - 4 edges
8. `2. Implementation Rules` - 3 edges
9. `Single Execution Point` - 3 edges
10. `Module System One-Way Door` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Zero-Dependency Policy` --semantically_similar_to--> `Zero External Dependencies`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `Stdout Contract` --semantically_similar_to--> `Byte-Stable Stdout Contract`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `Governance Layer` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Single Execution Point` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Authority Split** — mission_scope_authority, guardrails_process_authority, claude_style_authority [EXTRACTED 1.00]
- **Core Project Constraints** — claude_zero_dependency_policy, claude_stdout_contract, claude_module_system_one_way_door [EXTRACTED 1.00]
- **Governance Layer Documents** — mission_document, guardrails_document, claude_document [EXTRACTED 1.00]

## Communities (7 total, 0 thin omitted)

### Community 0 - "Core Governance Concepts"
Cohesion: 0.16
Nodes (15): Governance Files Are the Architecture, Governance Layer, Single Execution Point, Stdout Contract, Style Authority, Zero-Dependency Policy, Protected Files, Quality Gates (+7 more)

### Community 1 - "Process Rules & Quality Gates"
Cohesion: 0.12
Nodes (15): Auto-Reject Triggers, Meta-rule, Process Authority, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human (+7 more)

### Community 2 - "Agent Instructions Detail"
Cohesion: 0.15
Nodes (13): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, graphify, Hello AI Coding Agent — Agent Instructions, Important Files (+5 more)

### Community 3 - "Project Setup & Usage"
Cohesion: 0.22
Nodes (10): Module System One-Way Door, Zero Dependencies, Hello AI Coding Agent, Running Tests, Usage, code:bash (npm install), code:bash (npm start), code:bash (npm test) (+2 more)

### Community 4 - "Mission & Scope Detail"
Cohesion: 0.2
Nodes (10): Allowed Evolutions, code:bash (npm run lint          # exits 0), Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done) (+2 more)

### Community 5 - "Issue Triage Rules"
Cohesion: 0.4
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

## Knowledge Gaps
- **41 isolated node(s):** `AI Agent Instructions`, `Project Overview`, `Tech Stack`, `Repository Layout`, `Build, Test & Lint` (+36 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hello AI Coding Agent — Agent Instructions` connect `Agent Instructions Detail` to `Core Governance Concepts`?**
  _High betweenness centrality (0.289) - this node is a cross-community bridge._
- **Why does `Mission` connect `Mission & Scope Detail` to `Core Governance Concepts`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent` connect `Project Setup & Usage` to `Core Governance Concepts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Governance Layer` (e.g. with `Hard Invariants` and `Governance Files Are the Architecture`) actually correct?**
  _`Governance Layer` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AI Agent Instructions`, `Project Overview`, `Tech Stack` to the rest of the system?**
  _41 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Process Rules & Quality Gates` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._