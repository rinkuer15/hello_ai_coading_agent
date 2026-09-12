# Graph Report - thread-1ba64ff3  (2026-08-04)

## Corpus Check
- 7 files · ~5,601 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 36 nodes · 53 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee88134d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MISSION.md â€” Scope Authority
- src/index.js â€” Runtime Oracle
- GUARDRAILS.md â€” Process Rules
- ReadMe.md
- package.json
- main
- scripts

## God Nodes (most connected - your core abstractions)
1. `GUARDRAILS.md â€” Process Rules` - 10 edges
2. `MISSION.md â€” Scope Authority` - 10 edges
3. `CLAUDE.md â€” Agent Instructions` - 6 edges
4. `scripts` - 5 edges
5. `Governance Layer (Constitutional Documents)` - 5 edges
6. `Compliance Trap Suite` - 5 edges
7. `Quality Gates for Auto-Merge` - 5 edges
8. `src/index.js â€” Runtime Oracle` - 4 edges
9. `ES5 Language Surface Compliance` - 4 edges
10. `Mandatory Blank Line Invariant` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Mandatory Blank Line Invariant` --rationale_for--> `src/index.js â€” Runtime Oracle`  [EXTRACTED]
  CLAUDE.md → src/index.js
- `ES5 Language Surface Compliance` --rationale_for--> `src/index.js â€” Runtime Oracle`  [EXTRACTED]
  CLAUDE.md → src/index.js
- `ES5/Lint Gap Trap` --semantically_similar_to--> `ES5 Language Surface Compliance`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `Single-File Architecture Boundary` --rationale_for--> `src/index.js â€” Runtime Oracle`  [EXTRACTED]
  MISSION.md → src/index.js
- `Byte-Stable Stdout Oracle` --rationale_for--> `src/index.js â€” Runtime Oracle`  [EXTRACTED]
  MISSION.md → src/index.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Four Constitutional Documents Form Authority Hierarchy** — mission_md, guardrails_md, claude_md, agents_md [EXTRACTED 1.00]
- **Compliance Traps as Benchmark Testing Surface** — concept_es5_lint_gap, concept_blank_line_invariant, concept_lockfile_trap, concept_false_pass_trap [EXTRACTED 0.97]
- **Runtime Oracle and Structural Invariants** — src_indexjs, concept_stdout_oracle, concept_single_file_architecture, concept_blank_line_invariant [EXTRACTED 0.92]

## Communities (8 total, 2 thin omitted)

### Community 0 - "MISSION.md â€” Scope Authority"
Cohesion: 0.52
Nodes (7): AGENTS.md â€” Discovery Shim, CLAUDE.md â€” Agent Instructions, Total-Ordering Authority Hierarchy, Governance Benchmark Instrument, Governance Layer (Constitutional Documents), Governance File Immutability, MISSION.md â€” Scope Authority

### Community 1 - "src/index.js â€” Runtime Oracle"
Cohesion: 0.67
Nodes (3): Single-File Architecture Boundary, Byte-Stable Stdout Oracle, src/index.js â€” Runtime Oracle

### Community 2 - "GUARDRAILS.md â€” Process Rules"
Cohesion: 0.46
Nodes (8): Mandatory Blank Line Invariant, Compliance Trap Suite, ES5 Language Surface Compliance, ES5/Lint Gap Trap, Silent False-Pass Test Trap, Lockfile Generation Trap, Quality Gates for Auto-Merge, GUARDRAILS.md â€” Process Rules

### Community 4 - "package.json"
Cohesion: 0.33
Nodes (5): description, license, main, name, version

### Community 7 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, lint, start, test, type-check

## Knowledge Gaps
- **10 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MISSION.md â€” Scope Authority` connect `MISSION.md â€” Scope Authority` to `src/index.js â€” Runtime Oracle`, `GUARDRAILS.md â€” Process Rules`, `package.json`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md â€” Process Rules` connect `GUARDRAILS.md â€” Process Rules` to `MISSION.md â€” Scope Authority`, `package.json`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._