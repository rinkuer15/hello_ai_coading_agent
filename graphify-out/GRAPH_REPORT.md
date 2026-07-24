# Graph Report - .  (2026-07-25)

## Corpus Check
- Corpus is ~5,565 words - fits in a single context window. You may not need a graph.

## Summary
- 28 nodes · 46 edges · 7 communities (5 shown, 2 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Constitution|Governance Constitution]]
- [[_COMMUNITY_Runtime Invariants|Runtime Invariants]]
- [[_COMMUNITY_Compliance Traps|Compliance Traps]]
- [[_COMMUNITY_Documentation|Documentation]]
- [[_COMMUNITY_Runtime Core|Runtime Core]]

## God Nodes (most connected - your core abstractions)
1. `GUARDRAILS.md â€” Process Rules` - 11 edges
2. `MISSION.md â€” Scope Authority` - 11 edges
3. `CLAUDE.md â€” Agent Instructions` - 6 edges
4. `Governance Layer (Constitutional Documents)` - 5 edges
5. `ES5 Language Surface Compliance` - 5 edges
6. `Compliance Trap Suite` - 5 edges
7. `Quality Gates for Auto-Merge` - 5 edges
8. `src/index.js â€” Runtime Oracle` - 4 edges
9. `Mandatory Blank Line Invariant` - 4 edges
10. `src/index.test.js â€” Authorised Test File` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ES5 Language Surface Compliance` --rationale_for--> `src/index.test.js â€” Authorised Test File`  [INFERRED]
  CLAUDE.md → src/index.test.js
- `ES5/Lint Gap Trap` --semantically_similar_to--> `ES5 Language Surface Compliance`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `GUARDRAILS.md â€” Process Rules` --references--> `src/index.test.js â€” Authorised Test File`  [EXTRACTED]
  GUARDRAILS.md → src/index.test.js
- `MISSION.md â€” Scope Authority` --references--> `src/index.test.js â€” Authorised Test File`  [EXTRACTED]
  MISSION.md → src/index.test.js
- `Byte-Stable Stdout Oracle` --rationale_for--> `src/index.js â€” Runtime Oracle`  [EXTRACTED]
  MISSION.md → src/index.js

## Hyperedges (group relationships)
- **Four Constitutional Documents Form Authority Hierarchy** — mission_md, guardrails_md, claude_md, agents_md [EXTRACTED 1.00]
- **Compliance Traps as Benchmark Testing Surface** — concept_es5_lint_gap, concept_blank_line_invariant, concept_lockfile_trap, concept_false_pass_trap [EXTRACTED 0.97]
- **Runtime Oracle and Structural Invariants** — src_indexjs, concept_stdout_oracle, concept_single_file_architecture, concept_blank_line_invariant [EXTRACTED 0.92]

## Communities (7 total, 2 thin omitted)

### Community 0 - "Governance Constitution"
Cohesion: 0.42
Nodes (9): AGENTS.md â€” Discovery Shim, CLAUDE.md â€” Agent Instructions, Total-Ordering Authority Hierarchy, Governance Benchmark Instrument, Governance Layer (Constitutional Documents), Governance File Immutability, GUARDRAILS.md â€” Process Rules, MISSION.md â€” Scope Authority (+1 more)

### Community 1 - "Runtime Invariants"
Cohesion: 0.47
Nodes (6): Mandatory Blank Line Invariant, ES5 Language Surface Compliance, Quality Gates for Auto-Merge, Single-File Architecture Boundary, Byte-Stable Stdout Oracle, src/index.js â€” Runtime Oracle

### Community 2 - "Compliance Traps"
Cohesion: 0.5
Nodes (4): Compliance Trap Suite, ES5/Lint Gap Trap, Silent False-Pass Test Trap, Lockfile Generation Trap

## Knowledge Gaps
- **4 isolated node(s):** `main`, `console.log`, `Usage`, `Running Tests`
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MISSION.md â€” Scope Authority` connect `Governance Constitution` to `Runtime Invariants`, `Compliance Traps`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md â€” Process Rules` connect `Governance Constitution` to `Runtime Invariants`, `Compliance Traps`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `CLAUDE.md â€” Agent Instructions` connect `Governance Constitution` to `Runtime Invariants`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ES5 Language Surface Compliance` (e.g. with `src/index.test.js â€” Authorised Test File` and `ES5/Lint Gap Trap`) actually correct?**
  _`ES5 Language Surface Compliance` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `main`, `console.log`, `Usage` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._