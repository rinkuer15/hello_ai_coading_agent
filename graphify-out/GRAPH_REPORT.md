# Graph Report - .  (2026-09-07)

## Corpus Check
- Corpus is ~6,258 words - fits in a single context window. You may not need a graph.

## Summary
- 48 nodes · 62 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Compliance & Test Oracle|ES5 Compliance & Test Oracle]]
- [[_COMMUNITY_Governance Layer Docs|Governance Layer Docs]]
- [[_COMMUNITY_GUARDRAILS Rules & Invariants|GUARDRAILS Rules & Invariants]]
- [[_COMMUNITY_Oracle Architecture Rationale|Oracle Architecture Rationale]]
- [[_COMMUNITY_CLAUDE.md Quality Gates|CLAUDE.md Quality Gates]]
- [[_COMMUNITY_MISSION Scope Rules|MISSION Scope Rules]]
- [[_COMMUNITY_AGENTS.md Shim|AGENTS.md Shim]]

## God Nodes (most connected - your core abstractions)
1. `src/index.js` - 8 edges
2. `ES5 Compliance Checker Script` - 5 edges
3. `Stdout Oracle (Hello, AI Coding Agent!)` - 5 edges
4. `src/index.test.js` - 5 edges
5. `Index Test File` - 4 edges
6. `Immutability Surface (Four Governance Files)` - 4 edges
7. `Hard Invariants (7 Non-Tunable Constraints)` - 4 edges
8. `README Human Documentation` - 4 edges
9. `Governance Authority Hierarchy` - 4 edges
10. `Comment and String Stripping Pipeline` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js
- `README Human Documentation` --references--> `src/index.js Runtime Oracle`  [EXTRACTED]
  ReadMe.md → src/index.js
- `README Human Documentation` --references--> `Index Test File`  [EXTRACTED]
  ReadMe.md → src/index.test.js
- `Quality Gates for Auto-Merge (11 Gates)` --references--> `Stdout Oracle (Hello, AI Coding Agent!)`  [EXTRACTED]
  GUARDRAILS.md → MISSION.md

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Compliance Enforcement System** — guardrails_quality_gates, guardrails_auto_reject_triggers, guardrails_compliance_traps, mission_compliance_trap_detection [EXTRACTED 1.00]
- **Governance Constitution (Four Immutable Files)** — mission_immutability_surface, mission_authority_hierarchy, guardrails_protected_files, claude_hard_rules [EXTRACTED 1.00]
- **Oracle Integrity Constraints** — mission_stdout_oracle, claude_mandatory_blank_line, mission_hard_invariants, guardrails_absolute_prohibitions [INFERRED 0.90]
- **Governance Authority System** — claude_mission_md, claude_guardrails_md, claude_claude_md [EXTRACTED 1.00]
- **Oracle Validation Pattern** — claude_src_index_js, claude_src_index_test_js, claude_scripts_es5_check_js, claude_byte_stable_stdout_oracle [EXTRACTED 1.00]

## Communities (10 total, 2 thin omitted)

### Community 0 - "ES5 Compliance & Test Oracle"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 1 - "Governance Layer Docs"
Cohesion: 0.27
Nodes (9): AGENTS.md, Governance Authority Hierarchy, Governance Benchmark Instrument, GUARDRAILS.md, Lockfile Safety, MISSION.md, package.json, README.md (+1 more)

### Community 2 - "GUARDRAILS Rules & Invariants"
Cohesion: 0.32
Nodes (8): Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Governance Benchmark Instrument, Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files), Zero-Infrastructure Reproducibility

### Community 3 - "Oracle Architecture Rationale"
Cohesion: 0.43
Nodes (8): Byte-Stable Stdout Oracle, ES5 Language Surface, Mandatory Blank Line in Oracle, scripts/es5-check.js, Single-File Production Architecture, src/index.js, src/index.test.js, Subprocess Isolation Pattern

### Community 4 - "CLAUDE.md Quality Gates"
Cohesion: 0.7
Nodes (5): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

## Knowledge Gaps
- **8 isolated node(s):** `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim`, `Triage Rules (Accept / Reject / Defer)`, `Out of Scope (Must Never Build)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `src/index.js` connect `Oracle Architecture Rationale` to `Governance Layer Docs`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `Stdout Oracle (Hello, AI Coding Agent!)` connect `CLAUDE.md Quality Gates` to `GUARDRAILS Rules & Invariants`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Hard Invariants (7 Non-Tunable Constraints)` connect `GUARDRAILS Rules & Invariants` to `CLAUDE.md Quality Gates`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._