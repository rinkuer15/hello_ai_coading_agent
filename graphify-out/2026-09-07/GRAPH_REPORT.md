# Graph Report - .  (2026-09-07)

## Corpus Check
- Corpus is ~6,128 words - fits in a single context window. You may not need a graph.

## Summary
- 43 nodes · 49 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: 8,000 input · 2,500 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Oracle & Test Suite|ES5 Oracle & Test Suite]]
- [[_COMMUNITY_MISSION.md Invariants|MISSION.md Invariants]]
- [[_COMMUNITY_Governance Authority Chain|Governance Authority Chain]]
- [[_COMMUNITY_Compliance Traps & Gates|Compliance Traps & Gates]]
- [[_COMMUNITY_Zero-Dep ES5 Philosophy|Zero-Dep ES5 Philosophy]]
- [[_COMMUNITY_Oracle Architecture|Oracle Architecture]]
- [[_COMMUNITY_Absolute Prohibitions|Absolute Prohibitions]]
- [[_COMMUNITY_AGENTS.md Shim|AGENTS.md Shim]]
- [[_COMMUNITY_Out-of-Scope Boundary|Out-of-Scope Boundary]]

## God Nodes (most connected - your core abstractions)
1. `ES5 Compliance Checker Script` - 5 edges
2. `Index Test File` - 4 edges
3. `README Human Documentation` - 4 edges
4. `Mandatory Blank Line` - 4 edges
5. `ES5 Compliance Gate` - 4 edges
6. `Comment and String Stripping Pipeline` - 3 edges
7. `src/index.js Runtime Oracle` - 3 edges
8. `Stdout Oracle (Hello, AI Coding Agent!)` - 3 edges
9. `Hard Invariants (7 Non-Tunable Constraints)` - 3 edges
10. `MISSION.md` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Zero-Dependency Invariant` --semantically_similar_to--> `Zero-Dependency Node.js CLI`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `ES5 Compliance Gate` --semantically_similar_to--> `ES5 Language Surface`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `Byte-Exact Oracle` --semantically_similar_to--> `Single-File Oracle Architecture`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `Protected Files` --semantically_similar_to--> `Governance Files Immutable`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Governance Constitution (Four Immutable Files)** — mission_immutability_surface, mission_authority_hierarchy, guardrails_protected_files, claude_hard_rules [EXTRACTED 1.00]
- **Oracle Integrity Constraints** — mission_stdout_oracle, claude_mandatory_blank_line, mission_hard_invariants, guardrails_absolute_prohibitions [INFERRED 0.90]
- **Governance Authority Hierarchy** — claude_mission_md, guardrails_guardrails_md, claude_claude_md [EXTRACTED 1.00]
- **Oracle Validation Contract** — guardrails_full_pre_pr_gate, guardrails_byte_exact_oracle, guardrails_es5_compliance_gate, claude_mandatory_blank_line [EXTRACTED 1.00]

## Communities (12 total, 4 thin omitted)

### Community 0 - "ES5 Oracle & Test Suite"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 1 - "MISSION.md Invariants"
Cohesion: 0.29
Nodes (8): Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Governance Benchmark Instrument, Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files), Stdout Oracle (Hello, AI Coding Agent!), Zero-Infrastructure Reproducibility

### Community 2 - "Governance Authority Chain"
Cohesion: 0.39
Nodes (6): Governance Authority Hierarchy, Governance Files Immutable, MISSION.md, Auto-Reject Triggers, Meta-Rule, Protected Files

### Community 3 - "Compliance Traps & Gates"
Cohesion: 0.67
Nodes (4): Mandatory Blank Line, ES5 Compliance Gate, Full Pre-PR Gate, Known Compliance Traps

### Community 4 - "Zero-Dep ES5 Philosophy"
Cohesion: 0.67
Nodes (3): ES5 Language Surface, Governance Benchmark Instrument, Zero-Dependency Node.js CLI

## Knowledge Gaps
- **7 isolated node(s):** `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim`, `Automated ES5 Gate (es5-check.js)`, `Out of Scope (Must Never Build)` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Absolute Prohibitions` connect `Absolute Prohibitions` to `Governance Authority Chain`, `Compliance Traps & Gates`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `Governance Files Immutable` connect `Governance Authority Chain` to `Absolute Prohibitions`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `Mandatory Blank Line` connect `Compliance Traps & Gates` to `Governance Authority Chain`, `Oracle Architecture`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._