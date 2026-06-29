# Graph Report - thread-063be1b6  (2026-06-29)

## Corpus Check
- 6 files · ~5,854 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 156 nodes · 163 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d44651d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Core Governance Concepts|Core Governance Concepts]]
- [[_COMMUNITY_Process Rules & Quality Gates|Process Rules & Quality Gates]]
- [[_COMMUNITY_Agent Instructions Detail|Agent Instructions Detail]]
- [[_COMMUNITY_Project Setup & Usage|Project Setup & Usage]]
- [[_COMMUNITY_Mission & Scope Detail|Mission & Scope Detail]]
- [[_COMMUNITY_Issue Triage Rules|Issue Triage Rules]]
- [[_COMMUNITY_Application Code|Application Code]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent — Agent Instructions` - 10 edges
2. `Guardrails` - 10 edges
3. `Mission` - 10 edges
4. `Hello AI Coding Agent — Agent Instructions` - 10 edges
5. `Guardrails` - 10 edges
6. `Hello AI Coding Agent — Agent Instructions` - 9 edges
7. `Guardrails` - 9 edges
8. `Mission` - 9 edges
9. `Mission` - 9 edges
10. `Hello AI Coding Agent` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Governance Layer` --semantically_similar_to--> `Governance Files Are the Architecture`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Zero Dependencies` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Hard Invariants` --conceptually_related_to--> `Protected Files`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Single Execution Point` --conceptually_related_to--> `Hard Invariants`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Constraint System** — mission_mission_md, guardrails_guardrails_md, agents_agents_md, claude_claude_md, mission_governance_layer [EXTRACTED 1.00]

## Communities (13 total, 2 thin omitted)

### Community 0 - "Core Governance Concepts"
Cohesion: 0.17
Nodes (15): Governance Files Are the Architecture, Module System One-Way Door, Single Execution Point, Zero Dependencies, Meta-rule, Protected Files, Quality Gates, Allowed Evolutions (+7 more)

### Community 1 - "Process Rules & Quality Gates"
Cohesion: 0.11
Nodes (18): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Codebase-Specific Notes (+10 more)

### Community 2 - "Agent Instructions Detail"
Cohesion: 0.12
Nodes (16): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Changes to This File (+8 more)

### Community 3 - "Project Setup & Usage"
Cohesion: 0.12
Nodes (15): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Changes to This File (+7 more)

### Community 4 - "Mission & Scope Detail"
Cohesion: 0.15
Nodes (12): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Key Conventions (+4 more)

### Community 5 - "Issue Triage Rules"
Cohesion: 0.15
Nodes (12): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Key Conventions (+4 more)

### Community 6 - "Application Code"
Cohesion: 0.15
Nodes (13): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, graphify, Hello AI Coding Agent — Agent Instructions, Important Files (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (10): Allowed Evolutions, code:bash (npm run lint          # exits 0), Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done) (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.2
Nodes (8): code:bash (npm install), code:bash (npm start), code:bash (npm test), Contributing, Hello AI Coding Agent, Running Tests, Setup, Usage

### Community 9 - "Community 9"
Cohesion: 0.2
Nodes (9): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done), What Hello AI Coding Agent Is (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (9): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done), What Hello AI Coding Agent Is (+1 more)

## Knowledge Gaps
- **100 isolated node(s):** `Project Overview`, `Tech Stack`, `Repository Layout`, `Build, Test & Lint`, `Core Architecture` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Guardrails` connect `Process Rules & Quality Gates` to `Agent Instructions Detail`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `Guardrails` connect `Project Setup & Usage` to `Agent Instructions Detail`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `Project Overview`, `Tech Stack`, `Repository Layout` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Process Rules & Quality Gates` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Agent Instructions Detail` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Project Setup & Usage` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._