# Graph Report - .  (2026-08-26)

## Corpus Check
- Corpus is ~6,107 words - fits in a single context window. You may not need a graph.

## Summary
- 36 nodes · 43 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Gate & Checker|ES5 Gate & Checker]]
- [[_COMMUNITY_Governance Rules & Prohibitions|Governance Rules & Prohibitions]]
- [[_COMMUNITY_Compliance & Oracle Integrity|Compliance & Oracle Integrity]]
- [[_COMMUNITY_Scope Triage|Scope Triage]]
- [[_COMMUNITY_Agent Discovery Shim|Agent Discovery Shim]]
- [[_COMMUNITY_Naming Conventions|Naming Conventions]]

## God Nodes (most connected - your core abstractions)
1. `Stdout Oracle (Hello, AI Coding Agent!)` - 7 edges
2. `ES5 Compliance Checker Script` - 5 edges
3. `Immutability Surface (Four Governance Files)` - 5 edges
4. `Index Test File` - 4 edges
5. `README Human Documentation` - 4 edges
6. `Automated ES5 Gate (es5-check.js)` - 4 edges
7. `Hard Invariants (7 Non-Tunable Constraints)` - 4 edges
8. `Known Compliance Traps (8 Traps)` - 4 edges
9. `Comment and String Stripping Pipeline` - 3 edges
10. `src/index.js Runtime Oracle` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js
- `README Human Documentation` --references--> `src/index.js Runtime Oracle`  [EXTRACTED]
  ReadMe.md → src/index.js
- `README Human Documentation` --references--> `Index Test File`  [EXTRACTED]
  ReadMe.md → src/index.test.js
- `ES5 Code Patterns (var, function declarations, single quotes)` --conceptually_related_to--> `Automated ES5 Gate (es5-check.js)`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Governance Constitution (Four Immutable Files)** — mission_immutability_surface, mission_authority_hierarchy, guardrails_protected_files, claude_hard_rules [EXTRACTED 1.00]
- **Compliance Enforcement System** — guardrails_quality_gates, guardrails_auto_reject_triggers, guardrails_compliance_traps, mission_compliance_trap_detection [EXTRACTED 1.00]
- **Oracle Integrity Constraints** — mission_stdout_oracle, claude_mandatory_blank_line, mission_hard_invariants, guardrails_absolute_prohibitions [INFERRED 0.90]

## Communities (9 total, 3 thin omitted)

### Community 0 - "ES5 Gate & Checker"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 1 - "Governance Rules & Prohibitions"
Cohesion: 0.31
Nodes (9): ES5 Code Patterns (var, function declarations, single quotes), Hard Rules (Immutability, Single-File, ES5, Sync), Tech Stack (Node.js ES5 zero-dep), Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files) (+1 more)

### Community 2 - "Compliance & Oracle Integrity"
Cohesion: 0.36
Nodes (9): Architecture: Two Decoupled Layers, Mandatory Blank Line Oracle Invariant, Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Governance Benchmark Instrument (+1 more)

## Knowledge Gaps
- **8 isolated node(s):** `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim`, `False-Pass Warning for Missing Test File`, `Out of Scope (Must Never Build)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Stdout Oracle (Hello, AI Coding Agent!)` connect `Compliance & Oracle Integrity` to `Governance Rules & Prohibitions`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `Hard Invariants (7 Non-Tunable Constraints)` connect `Governance Rules & Prohibitions` to `Compliance & Oracle Integrity`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `Immutability Surface (Four Governance Files)` connect `Governance Rules & Prohibitions` to `Compliance & Oracle Integrity`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._