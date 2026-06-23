# Graph Report - .  (2026-06-23)

## Corpus Check
- Corpus is ~4,496 words - fits in a single context window. You may not need a graph.

## Summary
- 22 nodes · 34 edges · 6 communities (4 shown, 2 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Architectural Principles|Architectural Principles]]
- [[_COMMUNITY_Project Governance Docs|Project Governance Docs]]
- [[_COMMUNITY_Constraints and Rules|Constraints and Rules]]
- [[_COMMUNITY_README and Usage|README and Usage]]
- [[_COMMUNITY_Code Invariants|Code Invariants]]

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent` - 7 edges
2. `Governance Layer` - 3 edges
3. `Hard Invariants` - 3 edges
4. `Single Execution Point` - 3 edges
5. `Module System One-Way Door` - 3 edges
6. `Minimal Node.js Scaffold` - 2 edges
7. `Quality Standards` - 2 edges
8. `Zero Dependencies` - 2 edges
9. `Governance Files Are the Architecture` - 2 edges
10. `Quality Gates` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Governance Layer` --semantically_similar_to--> `Governance Files Are the Architecture`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Single Execution Point` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Module System One-Way Door` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Zero Dependencies` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Constraint System** — mission_mission_md, guardrails_guardrails_md, agents_agents_md, claude_claude_md, mission_governance_layer [EXTRACTED 1.00]

## Communities (6 total, 2 thin omitted)

### Community 0 - "Architectural Principles"
Cohesion: 0.4
Nodes (5): Governance Files Are the Architecture, Zero Dependencies, Governance Layer, Hello AI Coding Agent, Minimal Node.js Scaffold

### Community 1 - "Project Governance Docs"
Cohesion: 0.4
Nodes (3): Quality Gates, Allowed Evolutions, Quality Standards

### Community 4 - "Code Invariants"
Cohesion: 0.67
Nodes (3): Single Execution Point, Protected Files, Hard Invariants

## Knowledge Gaps
- **4 isolated node(s):** `Allowed Evolutions`, `Meta-rule`, `Usage`, `Running Tests`
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hello AI Coding Agent` connect `Architectural Principles` to `Project Governance Docs`, `Constraints and Rules`, `README and Usage`, `Code Invariants`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `Hard Invariants` connect `Code Invariants` to `Project Governance Docs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Hard Invariants` (e.g. with `Protected Files` and `Single Execution Point`) actually correct?**
  _`Hard Invariants` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Allowed Evolutions`, `Meta-rule`, `Usage` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._