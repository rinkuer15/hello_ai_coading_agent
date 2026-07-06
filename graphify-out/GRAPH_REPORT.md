# Graph Report - .  (2026-07-06)

## Corpus Check
- Corpus is ~5,470 words - fits in a single context window. You may not need a graph.

## Summary
- 28 nodes · 40 edges · 7 communities (5 shown, 2 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Constitution|Governance Constitution]]
- [[_COMMUNITY_Runtime Compliance|Runtime Compliance]]
- [[_COMMUNITY_Architecture Invariants|Architecture Invariants]]
- [[_COMMUNITY_Docs and Testing|Docs and Testing]]
- [[_COMMUNITY_Runtime Execution|Runtime Execution]]

## God Nodes (most connected - your core abstractions)
1. `Authority Hierarchy` - 6 edges
2. `Hard Invariants` - 6 edges
3. `Agent Instructions (CLAUDE.md)` - 5 edges
4. `Scope Authority (MISSION.md)` - 5 edges
5. `Stdout Oracle` - 5 edges
6. `Governance File Immutability` - 5 edges
7. `Process Rules (GUARDRAILS.md)` - 4 edges
8. `Governance Benchmark Instrument` - 4 edges
9. `ES5 Language Constraint` - 4 edges
10. `Single-File Architecture` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Core Capabilities (In Scope)` --conceptually_related_to--> `Authority Hierarchy`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Quality Gates for Auto-Merge` --references--> `Stdout Oracle`  [EXTRACTED]
  GUARDRAILS.md → CLAUDE.md
- `Hard Invariants` --conceptually_related_to--> `Stdout Oracle`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Hard Invariants` --conceptually_related_to--> `ES5 Language Constraint`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Known Traps` --conceptually_related_to--> `ES5 Language Constraint`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md

## Hyperedges (group relationships)
- **Total-Order Authority Hierarchy Chain** — mission_scopeauthority, guardrails_processrules, claude_agentinstructions, claude_agentsmd [EXTRACTED 1.00]
- **Hard Invariants Enforcement Cluster** — mission_hardinvariants, guardrails_autorejecttriggers, guardrails_absoluteprohibitions, claude_immutabilityprinciple [EXTRACTED 1.00]
- **Stdout Oracle Validation Flow** — claude_indexjs, claude_stdoutoracle, guardrails_qualitygates [EXTRACTED 1.00]

## Communities (7 total, 2 thin omitted)

### Community 0 - "Governance Constitution"
Cohesion: 0.54
Nodes (8): Agent Instructions (CLAUDE.md), AGENTS.md Discovery Shim, Authority Hierarchy, Governance Benchmark Instrument, Governance File Immutability, Process Rules (GUARDRAILS.md), Core Capabilities (In Scope), Scope Authority (MISSION.md)

### Community 1 - "Runtime Compliance"
Cohesion: 0.47
Nodes (6): ES5 Language Constraint, src/index.js Runtime, Stdout Oracle, Auto-Reject Triggers, Known Traps, Quality Gates for Auto-Merge

### Community 2 - "Architecture Invariants"
Cohesion: 0.47
Nodes (6): Single-File Architecture, Zero Dependency Constraint, Absolute Prohibitions, Allowed Evolutions, Hard Invariants, Out of Scope Categories

## Knowledge Gaps
- **5 isolated node(s):** `main`, `console.log`, `Usage`, `Running Tests`, `Allowed Evolutions`
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hard Invariants` connect `Architecture Invariants` to `Governance Constitution`, `Runtime Compliance`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `Stdout Oracle` connect `Runtime Compliance` to `Governance Constitution`, `Architecture Invariants`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Governance File Immutability` connect `Governance Constitution` to `Runtime Compliance`, `Architecture Invariants`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `main`, `console.log`, `Usage` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._