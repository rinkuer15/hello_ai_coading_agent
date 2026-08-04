# Graph Report - .  (2026-08-04)

## Corpus Check
- Corpus is ~5,578 words - fits in a single context window. You may not need a graph.

## Summary
- 33 nodes · 54 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Authority Hierarchy|Governance Authority Hierarchy]]
- [[_COMMUNITY_Scope and Rejection Rules|Scope and Rejection Rules]]
- [[_COMMUNITY_Compliance Traps|Compliance Traps]]
- [[_COMMUNITY_Documentation and Usage|Documentation and Usage]]
- [[_COMMUNITY_Compliance Oracle|Compliance Oracle]]
- [[_COMMUNITY_Architecture Invariants|Architecture Invariants]]
- [[_COMMUNITY_Runtime Oracle File|Runtime Oracle File]]
- [[_COMMUNITY_Agent Discovery Shim|Agent Discovery Shim]]

## God Nodes (most connected - your core abstractions)
1. `Agent Instructions (CLAUDE.md)` - 9 edges
2. `Guardrails` - 8 edges
3. `Mission` - 7 edges
4. `src/index.js Runtime Oracle` - 6 edges
5. `Governance Constitution` - 5 edges
6. `Authority Hierarchy` - 5 edges
7. `MISSION.md Scope Authority` - 5 edges
8. `GUARDRAILS.md Process Authority` - 5 edges
9. `Protected Files` - 5 edges
10. `Core Capabilities In Scope` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Governance Constitution` --semantically_similar_to--> `Governance Benchmark Instrument`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `Absolute Prohibitions` --semantically_similar_to--> `Out of Scope Items`  [INFERRED] [semantically similar]
  GUARDRAILS.md → MISSION.md
- `Auto-Reject Triggers` --semantically_similar_to--> `Out of Scope Items`  [INFERRED] [semantically similar]
  GUARDRAILS.md → MISSION.md
- `False-Pass Test Suite State` --references--> `Core Capabilities In Scope`  [INFERRED]
  CLAUDE.md → MISSION.md
- `Single-File Architecture` --references--> `Hard Invariants`  [INFERRED]
  CLAUDE.md → MISSION.md

## Communities (9 total, 3 thin omitted)

### Community 0 - "Governance Authority Hierarchy"
Cohesion: 0.53
Nodes (9): Agent Instructions (CLAUDE.md), AGENTS.md Discovery Shim, Authority Hierarchy, Governance Constitution, GUARDRAILS.md Process Authority, MISSION.md Scope Authority, Guardrails, Protected Files (+1 more)

### Community 1 - "Scope and Rejection Rules"
Cohesion: 0.33
Nodes (6): Absolute Prohibitions, Auto-Reject Triggers, Governance Benchmark Instrument, Mission, Out of Scope Items, Target Audience

### Community 2 - "Compliance Traps"
Cohesion: 0.5
Nodes (5): Mandatory Blank Line Governance Trap, ES5 Compliance Requirement, False-Pass Test Suite State, Known Compliance Traps, Core Capabilities In Scope

### Community 4 - "Compliance Oracle"
Cohesion: 1.0
Nodes (3): Compliance Oracle, src/index.js Runtime Oracle, Quality Gates

### Community 5 - "Architecture Invariants"
Cohesion: 0.67
Nodes (3): Single-File Architecture, Zero npm Dependencies Invariant, Hard Invariants

## Knowledge Gaps
- **7 isolated node(s):** `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Usage`, `Running Tests`, `Zero npm Dependencies Invariant` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Mission` connect `Scope and Rejection Rules` to `Governance Authority Hierarchy`, `Compliance Traps`, `Architecture Invariants`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `Guardrails` connect `Governance Authority Hierarchy` to `Scope and Rejection Rules`, `Compliance Traps`, `Compliance Oracle`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `Agent Instructions (CLAUDE.md)` connect `Governance Authority Hierarchy` to `Scope and Rejection Rules`, `Compliance Oracle`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **What connects `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Usage` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._