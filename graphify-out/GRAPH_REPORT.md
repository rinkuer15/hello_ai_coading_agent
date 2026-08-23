# Graph Report - .  (2026-08-23)

## Corpus Check
- Corpus is ~5,832 words - fits in a single context window. You may not need a graph.

## Summary
- 31 nodes · 48 edges · 10 communities (7 shown, 3 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Oracle Verification & Tests|Oracle Verification & Tests]]
- [[_COMMUNITY_Governance Constitution|Governance Constitution]]
- [[_COMMUNITY_ES5 Checker Pipeline|ES5 Checker Pipeline]]
- [[_COMMUNITY_Process Rules & Guardrails|Process Rules & Guardrails]]
- [[_COMMUNITY_ES5 Compliance Gate|ES5 Compliance Gate]]
- [[_COMMUNITY_Oracle Source File|Oracle Source File]]
- [[_COMMUNITY_Agent Discovery Shim|Agent Discovery Shim]]

## God Nodes (most connected - your core abstractions)
1. `ES5 Compliance Checker Script` - 9 edges
2. `CLAUDE.md Agent Instructions` - 9 edges
3. `MISSION.md Scope Authority` - 9 edges
4. `GUARDRAILS.md Process Authority` - 8 edges
5. `src/index.js Runtime Oracle` - 6 edges
6. `Index Test File` - 5 edges
7. `Byte-Exact Stdout Oracle Concept` - 5 edges
8. `README Human Documentation` - 4 edges
9. `11 Quality Gates for Auto-Merge` - 4 edges
10. `Comment and String Stripping Pipeline` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ES5 Compliance Checker Script` --implements--> `ES5 Compliance Gate Concept`  [INFERRED]
  scripts/es5-check.js → CLAUDE.md
- `Byte-Exact Stdout Assertion in Tests` --conceptually_related_to--> `Byte-Exact Stdout Oracle Concept`  [INFERRED]
  src/index.test.js → MISSION.md
- `CLAUDE.md Agent Instructions` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  CLAUDE.md → scripts/es5-check.js
- `11 Quality Gates for Auto-Merge` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  GUARDRAILS.md → scripts/es5-check.js
- `MISSION.md Scope Authority` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  MISSION.md → scripts/es5-check.js

## Hyperedges (group relationships)
- **Four Immutable Governance Files** — mission_document, guardrails_document, claude_document, readme_document [EXTRACTED 1.00]
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Oracle Byte-Exact Verification System** — index_oracle, indextest_testfile, mission_stdoutoracle, indextest_stdoutassertion, indextest_exitcodecheck [INFERRED 0.90]
- **Full Pre-PR Quality Gate System** — guardrails_qualitygates, es5check_script, indextest_testfile, claude_blankline, mission_stdoutoracle [EXTRACTED 1.00]
- **Authority Hierarchy Resolution Chain** — mission_authorityhierarchy, mission_document, guardrails_document, claude_document [EXTRACTED 1.00]

## Communities (10 total, 3 thin omitted)

### Community 0 - "Oracle Verification & Tests"
Cohesion: 0.31
Nodes (9): Mandatory Blank Line Oracle Rule, 11 Quality Gates for Auto-Merge, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File, Byte-Exact Stdout Oracle Concept, README Human Documentation (+1 more)

### Community 1 - "Governance Constitution"
Cohesion: 0.47
Nodes (6): CLAUDE.md Agent Instructions, Naming Conventions (camelCase/kebab-case), Protected Files Class, Authority Hierarchy (MISSIONâ†’GUARDRAILSâ†’CLAUDEâ†’AGENTS), MISSION.md Scope Authority, Out-of-Scope Prohibitions

### Community 2 - "ES5 Checker Pipeline"
Cohesion: 0.83
Nodes (4): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline

### Community 3 - "Process Rules & Guardrails"
Cohesion: 0.5
Nodes (4): 13 Absolute Prohibitions, 13 Auto-Reject Triggers, 8 Known Compliance Traps, GUARDRAILS.md Process Authority

## Knowledge Gaps
- **7 isolated node(s):** `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Out-of-Scope Prohibitions`, `13 Absolute Prohibitions`, `13 Auto-Reject Triggers` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ES5 Compliance Checker Script` connect `ES5 Checker Pipeline` to `Oracle Verification & Tests`, `Governance Constitution`, `ES5 Compliance Gate`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `MISSION.md Scope Authority` connect `Governance Constitution` to `Oracle Verification & Tests`, `ES5 Checker Pipeline`, `Process Rules & Guardrails`, `ES5 Compliance Gate`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md Process Authority` connect `Process Rules & Guardrails` to `Oracle Verification & Tests`, `Governance Constitution`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Out-of-Scope Prohibitions` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._