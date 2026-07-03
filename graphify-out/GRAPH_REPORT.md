# Graph Report - .  (2026-07-03)

## Corpus Check
- Corpus is ~5,276 words - fits in a single context window. You may not need a graph.

## Summary
- 24 nodes · 28 edges · 8 communities (5 shown, 3 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance & Process Rules|Governance & Process Rules]]
- [[_COMMUNITY_Hard Invariants & Constraints|Hard Invariants & Constraints]]
- [[_COMMUNITY_README Documentation|README Documentation]]
- [[_COMMUNITY_Agent Instructions|Agent Instructions]]
- [[_COMMUNITY_stdout Oracle Function|stdout Oracle Function]]
- [[_COMMUNITY_Authority Hierarchy|Authority Hierarchy]]

## God Nodes (most connected - your core abstractions)
1. `Agent Instructions (CLAUDE.md)` - 6 edges
2. `Guardrails` - 6 edges
3. `Mission` - 6 edges
4. `ES5 Language Constraint` - 4 edges
5. `Hard Invariants` - 4 edges
6. `Byte-Exact Regression Oracle` - 3 edges
7. `Zero Dependencies Invariant` - 3 edges
8. `Auto-Reject Triggers` - 3 edges
9. `Governance Layer (4 Documents)` - 3 edges
10. `Authority Hierarchy` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Authority Hierarchy` --semantically_similar_to--> `Governance Layer (4 Documents)`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `Known Traps` --conceptually_related_to--> `ES5 Language Constraint`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md
- `Agent Instructions (CLAUDE.md)` --references--> `Mission`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Guardrails` --references--> `Agent Instructions (CLAUDE.md)`  [EXTRACTED]
  GUARDRAILS.md → CLAUDE.md
- `Byte-Exact Regression Oracle` --conceptually_related_to--> `Quality Gates`  [INFERRED]
  MISSION.md → GUARDRAILS.md

## Hyperedges (group relationships)
- **Governance Conflict Resolution Hierarchy** — mission_mission, guardrails_guardrails, claude_agentinstructions [EXTRACTED 1.00]
- **Hard Invariants Enforcement Surface** — mission_hardinvariants, guardrails_autorejecttriggers, guardrails_protectedfiles [EXTRACTED 1.00]
- **Agent Compliance Measurement** — mission_governancebenchmark, guardrails_knowntraps, claude_es5constraint [INFERRED 0.85]

## Communities (8 total, 3 thin omitted)

### Community 0 - "Governance & Process Rules"
Cohesion: 0.32
Nodes (8): Guardrails, Known Traps, Protected Files, Quality Gates, Byte-Exact Regression Oracle, Governance Benchmark Instrument, Governance Layer (4 Documents), Mission

### Community 1 - "Hard Invariants & Constraints"
Cohesion: 0.67
Nodes (4): ES5 Language Constraint, Zero Dependencies Invariant, Auto-Reject Triggers, Hard Invariants

### Community 3 - "Agent Instructions"
Cohesion: 0.67
Nodes (3): Agent Instructions (CLAUDE.md), Authority Hierarchy, Single-File Architecture

## Knowledge Gaps
- **7 isolated node(s):** `main`, `console.log`, `Usage`, `Running Tests`, `Authority Hierarchy` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Guardrails` connect `Governance & Process Rules` to `Hard Invariants & Constraints`, `Agent Instructions`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `Agent Instructions (CLAUDE.md)` connect `Agent Instructions` to `Governance & Process Rules`, `Hard Invariants & Constraints`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `Mission` connect `Governance & Process Rules` to `Hard Invariants & Constraints`, `Agent Instructions`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ES5 Language Constraint` (e.g. with `Auto-Reject Triggers` and `Known Traps`) actually correct?**
  _`ES5 Language Constraint` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `main`, `console.log`, `Usage` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._