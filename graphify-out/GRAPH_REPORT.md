# Graph Report - .  (2026-09-11)

## Corpus Check
- 8 files · ~6,230 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 85 nodes · 136 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Authority Hierarchy|Governance Authority Hierarchy]]
- [[_COMMUNITY_Package Scripts & Runtime Entry|Package Scripts & Runtime Entry]]
- [[_COMMUNITY_Mission Invariants & Protections|Mission Invariants & Protections]]
- [[_COMMUNITY_ES5 Checker & Test Traps|ES5 Checker & Test Traps]]
- [[_COMMUNITY_Runtime Oracle Structure|Runtime Oracle Structure]]
- [[_COMMUNITY_Lockfile & Test False-Pass Traps|Lockfile & Test False-Pass Traps]]
- [[_COMMUNITY_Compliance Gates & Traps|Compliance Gates & Traps]]
- [[_COMMUNITY_On-Demand Context Modules|On-Demand Context Modules]]
- [[_COMMUNITY_Scope & Triage Rules|Scope & Triage Rules]]
- [[_COMMUNITY_AGENTS|AGENTS.md]]

## God Nodes (most connected - your core abstractions)
1. `GUARDRAILS.md` - 15 edges
2. `MISSION.md` - 14 edges
3. `Governance Benchmark Instrument` - 10 edges
4. `src/index.js` - 10 edges
5. `package.json` - 8 edges
6. `README.md` - 7 edges
7. `scripts` - 6 edges
8. `Immutability Surface (Four Governance Files)` - 6 edges
9. `AGENTS.md` - 6 edges
10. `ES5 Compliance Checker Script` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Mandatory Blank Line` --semantically_similar_to--> `Formatter-Hostile Blank Line`  [INFERRED] [semantically similar]
  CLAUDE.md → GUARDRAILS.md
- `Authority Hierarchy Enforcement` --semantically_similar_to--> `File Hierarchy Rule`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `False-Pass npm test Trap` --semantically_similar_to--> `False-Pass npm test Note`  [INFERRED] [semantically similar]
  GUARDRAILS.md → ReadMe.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js

## Hyperedges (group relationships)
- **Governance Constitution** — mission_mission_md, guardrails_guardrails_md, claude_claude_md, agents_agents_md [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "Governance Authority Hierarchy"
Cohesion: 0.22
Nodes (17): CLAUDE.md Redirect, AGENTS.md, Conflict Resolution Hierarchy, .gitignore, Governance Authority Hierarchy, Governance Constitution, Governance Files Immutable to Automation, graphify-out/ (+9 more)

### Community 1 - "Package Scripts & Runtime Entry"
Cohesion: 0.15
Nodes (11): description, license, name, scripts, lint, start, test, type-check (+3 more)

### Community 2 - "Mission Invariants & Protections"
Cohesion: 0.27
Nodes (11): Redirect to CLAUDE.md, Zero-Dependency Node.js CLI, Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Byte-Exact Oracle, Governance Benchmark Instrument (+3 more)

### Community 3 - "ES5 Checker & Test Traps"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File, README Human Documentation (+2 more)

### Community 4 - "Runtime Oracle Structure"
Cohesion: 0.39
Nodes (9): Byte-Stable Stdout Oracle, ES5 Language Surface, Mandatory Blank Line in Oracle, Runtime Oracle, scripts/es5-check.js, Single-File Production Architecture, src/index.js, src/index.test.js (+1 more)

### Community 5 - "Lockfile & Test False-Pass Traps"
Cohesion: 0.25
Nodes (8): Lockfile Safety, README.md, False-Pass npm test Trap, Lockfile Generation Trap, Bare npm install Setup, False-Pass npm test Note, False-Pass Test Suite Warning, Minimal AI Agent Scaffold

### Community 6 - "Compliance Gates & Traps"
Cohesion: 0.53
Nodes (6): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Oracle, Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

### Community 7 - "On-Demand Context Modules"
Cohesion: 0.33
Nodes (6): .devox/standards/context/es5-checker-mechanics.md, .devox/standards/context/es5-compliance-traps.md, .devox/standards/context/governance-authority-hierarchy.md, .devox/standards/context/lockfile-safety.md, On-Demand Context Modules, .devox/standards/context/test-writing-guide.md

## Knowledge Gaps
- **26 isolated node(s):** `name`, `version`, `description`, `start`, `test` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `package.json` connect `Package Scripts & Runtime Entry` to `Governance Authority Hierarchy`, `Lockfile & Test False-Pass Traps`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md` connect `Governance Authority Hierarchy` to `Mission Invariants & Protections`, `Lockfile & Test False-Pass Traps`, `Compliance Gates & Traps`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `Governance Benchmark Instrument` connect `Mission Invariants & Protections` to `Governance Authority Hierarchy`, `Runtime Oracle Structure`, `Compliance Gates & Traps`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._