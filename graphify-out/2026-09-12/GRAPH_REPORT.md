# Graph Report - .  (2026-09-12)

## Corpus Check
- Corpus is ~5,938 words - fits in a single context window. You may not need a graph.

## Summary
- 80 nodes · 130 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance File Hierarchy|Governance File Hierarchy]]
- [[_COMMUNITY_Project Scaffold & Package Config|Project Scaffold & Package Config]]
- [[_COMMUNITY_ES5 Runtime Oracle Constraints|ES5 Runtime Oracle Constraints]]
- [[_COMMUNITY_ES5 Checker & Test Suite|ES5 Checker & Test Suite]]
- [[_COMMUNITY_Compliance Gates & Traps|Compliance Gates & Traps]]
- [[_COMMUNITY_Hard Invariants & Prohibitions|Hard Invariants & Prohibitions]]
- [[_COMMUNITY_On-Demand Context Modules|On-Demand Context Modules]]
- [[_COMMUNITY_Scope Triage Rules|Scope Triage Rules]]
- [[_COMMUNITY_AGENTS.md Redirect|AGENTS.md Redirect]]

## God Nodes (most connected - your core abstractions)
1. `MISSION.md` - 17 edges
2. `Governance Benchmark Instrument` - 10 edges
3. `src/index.js` - 10 edges
4. `GUARDRAILS.md` - 9 edges
5. `package.json` - 8 edges
6. `scripts` - 6 edges
7. `Hard Invariants (7 Non-Tunable Constraints)` - 6 edges
8. `ES5 Language Surface` - 6 edges
9. `ES5 Compliance Checker Script` - 5 edges
10. `Quality Gates for Auto-Merge (11 Gates)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Mandatory Blank Line in Oracle` --semantically_similar_to--> `Blank Line Is Load-Bearing`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js
- `README Human Documentation` --references--> `Index Test File`  [EXTRACTED]
  ReadMe.md → src/index.test.js
- `ES5 Language Surface` --conceptually_related_to--> `Quality Gates for Auto-Merge (11 Gates)`  [INFERRED]
  CLAUDE.md → GUARDRAILS.md

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Governance Authority Hierarchy** — mission_mission_md, claude_guardrails_md, claude_claude_md, claude_agents_md [EXTRACTED 1.00]
- **Benchmark Enforcement Tripod** — mission_deterministic_stdout_oracle, mission_es5_compliance_gate, mission_byte_exact_integration_testing [EXTRACTED 1.00]

## Communities (10 total, 2 thin omitted)

### Community 0 - "Governance File Hierarchy"
Cohesion: 0.21
Nodes (19): Redirect to CLAUDE.md, AGENTS.md, Conflict Resolution Hierarchy, .gitignore, Governance Authority Hierarchy, Governance Constitution, Governance Files Immutable to Automation, graphify-out/ (+11 more)

### Community 1 - "Project Scaffold & Package Config"
Cohesion: 0.12
Nodes (14): description, license, name, scripts, lint, start, test, type-check (+6 more)

### Community 2 - "ES5 Runtime Oracle Constraints"
Cohesion: 0.26
Nodes (12): Byte-Stable Stdout Oracle, ES5 Language Surface, Mandatory Blank Line in Oracle, Runtime Oracle, scripts/es5-check.js, Single-File Production Architecture, src/index.js, src/index.test.js (+4 more)

### Community 3 - "ES5 Checker & Test Suite"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 4 - "Compliance Gates & Traps"
Cohesion: 0.53
Nodes (6): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Oracle, Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

### Community 5 - "Hard Invariants & Prohibitions"
Cohesion: 0.47
Nodes (6): Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files), Zero-Infrastructure Reproducibility

### Community 6 - "On-Demand Context Modules"
Cohesion: 0.33
Nodes (6): .devox/standards/context/es5-checker-mechanics.md, .devox/standards/context/es5-compliance-traps.md, .devox/standards/context/governance-authority-hierarchy.md, .devox/standards/context/lockfile-safety.md, On-Demand Context Modules, .devox/standards/context/test-writing-guide.md

## Knowledge Gaps
- **25 isolated node(s):** `name`, `version`, `description`, `start`, `test` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `package.json` connect `Project Scaffold & Package Config` to `Governance File Hierarchy`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `MISSION.md` connect `Governance File Hierarchy` to `ES5 Runtime Oracle Constraints`, `Compliance Gates & Traps`, `Hard Invariants & Prohibitions`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Scaffold & Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._