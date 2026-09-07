# Graph Report - .  (2026-09-07)

## Corpus Check
- Corpus is ~6,193 words - fits in a single context window. You may not need a graph.

## Summary
- 46 nodes · 54 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Oracle & Test Compliance|ES5 Oracle & Test Compliance]]
- [[_COMMUNITY_Governance Compliance Traps|Governance Compliance Traps]]
- [[_COMMUNITY_Immutability & Hard Invariants|Immutability & Hard Invariants]]
- [[_COMMUNITY_Package Metadata & Runtime|Package Metadata & Runtime]]
- [[_COMMUNITY_NPM Scripts & ES5 Gate|NPM Scripts & ES5 Gate]]
- [[_COMMUNITY_Scope & Triage Rules|Scope & Triage Rules]]
- [[_COMMUNITY_AGENTS.md Redirect|AGENTS.md Redirect]]
- [[_COMMUNITY_Naming Conventions|Naming Conventions]]

## God Nodes (most connected - your core abstractions)
1. `Stdout Oracle (Hello, AI Coding Agent!)` - 7 edges
2. `scripts` - 6 edges
3. `ES5 Compliance Checker Script` - 5 edges
4. `Immutability Surface (Four Governance Files)` - 5 edges
5. `Index Test File` - 4 edges
6. `README Human Documentation` - 4 edges
7. `Automated ES5 Gate (es5-check.js)` - 4 edges
8. `Hard Invariants (7 Non-Tunable Constraints)` - 4 edges
9. `Known Compliance Traps (8 Traps)` - 4 edges
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
- `ES5 Code Patterns (var, function declarations, single quotes)` --conceptually_related_to--> `Automated ES5 Gate (es5-check.js)`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Constitution Authority Group** — mission_mission, guardrails_guardrails, claude_agent_instructions, agents_ai_agent_instructions, mission_authority_hierarchy [EXTRACTED 1.00]
- **Oracle Integrity Control Group** — mission_compliance_oracle, claude_single_file_oracle_architecture, claude_es5_language_surface, guardrails_full_pre_pr_gate, guardrails_compliance_traps [INFERRED 0.85]

## Communities (9 total, 3 thin omitted)

### Community 0 - "ES5 Oracle & Test Compliance"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File, README Human Documentation (+2 more)

### Community 1 - "Governance Compliance Traps"
Cohesion: 0.36
Nodes (9): Architecture: Two Decoupled Layers, Mandatory Blank Line Oracle Invariant, Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Governance Benchmark Instrument (+1 more)

### Community 2 - "Immutability & Hard Invariants"
Cohesion: 0.31
Nodes (9): ES5 Code Patterns (var, function declarations, single quotes), Hard Rules (Immutability, Single-File, ES5, Sync), Tech Stack (Node.js ES5 zero-dep), Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files) (+1 more)

### Community 3 - "Package Metadata & Runtime"
Cohesion: 0.29
Nodes (5): description, license, name, version, main()

### Community 4 - "NPM Scripts & ES5 Gate"
Cohesion: 0.33
Nodes (5): scripts, lint, start, test, type-check

## Knowledge Gaps
- **16 isolated node(s):** `name`, `version`, `description`, `start`, `test` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Stdout Oracle (Hello, AI Coding Agent!)` connect `Governance Compliance Traps` to `Immutability & Hard Invariants`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts & ES5 Gate` to `Package Metadata & Runtime`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `Hard Invariants (7 Non-Tunable Constraints)` connect `Immutability & Hard Invariants` to `Governance Compliance Traps`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._