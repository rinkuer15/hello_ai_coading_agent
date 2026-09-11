# Graph Report - .  (2026-09-10)

## Corpus Check
- 8 files · ~6,258 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 60 nodes · 89 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.83)
- Token cost: 3,200 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Compliance Testing|ES5 Compliance Testing]]
- [[_COMMUNITY_Governance File Hierarchy|Governance File Hierarchy]]
- [[_COMMUNITY_Runtime Oracle Architecture|Runtime Oracle Architecture]]
- [[_COMMUNITY_npm Scripts|npm Scripts]]
- [[_COMMUNITY_Guardrails Invariants|Guardrails Invariants]]
- [[_COMMUNITY_Quality Gates & Traps|Quality Gates & Traps]]
- [[_COMMUNITY_package.json Metadata|package.json Metadata]]
- [[_COMMUNITY_README & Lockfile Safety|README & Lockfile Safety]]
- [[_COMMUNITY_index.js Runtime|index.js Runtime]]
- [[_COMMUNITY_Mission Scope Rules|Mission Scope Rules]]
- [[_COMMUNITY_AGENTS.md Shim|AGENTS.md Shim]]

## God Nodes (most connected - your core abstractions)
1. `package.json` - 8 edges
2. `src/index.js` - 8 edges
3. `MISSION.md` - 7 edges
4. `scripts` - 6 edges
5. `GUARDRAILS.md` - 6 edges
6. `ES5 Compliance Checker Script` - 5 edges
7. `Quality Gates for Auto-Merge (11 Gates)` - 5 edges
8. `Stdout Oracle (Hello, AI Coding Agent!)` - 5 edges
9. `Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS)` - 5 edges
10. `Governance Benchmark Instrument` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js
- `README Human Documentation` --references--> `src/index.js Runtime Oracle`  [EXTRACTED]
  ReadMe.md → src/index.js
- `README Human Documentation` --references--> `Index Test File`  [EXTRACTED]
  ReadMe.md → src/index.test.js
- `Compliance Oracle` --conceptually_related_to--> `Quality Gates for Auto-Merge (11 Gates)`  [INFERRED]
  MISSION.md → GUARDRAILS.md

## Hyperedges (group relationships)
- **Governance Authority Hierarchy** — mission_mission_md, guardrails_guardrails_md, claude_claude_md, agents_agents_md, mission_authority_hierarchy [EXTRACTED 1.00]
- **Oracle Verification Regime** — mission_compliance_oracle, claude_es5_language_surface, guardrails_quality_gates, readme_false_pass_test_suite [INFERRED 0.75]

## Communities (12 total, 3 thin omitted)

### Community 0 - "ES5 Compliance Testing"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File, README Human Documentation (+2 more)

### Community 1 - "Governance File Hierarchy"
Cohesion: 0.38
Nodes (9): Redirect to CLAUDE.md, AGENTS.md, Governance Authority Hierarchy, GUARDRAILS.md, MISSION.md, Single-File Production Architecture, Meta-Rule of Safety, Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS) (+1 more)

### Community 2 - "Runtime Oracle Architecture"
Cohesion: 0.39
Nodes (8): Byte-Stable Stdout Oracle, ES5 Language Surface, Mandatory Blank Line in Oracle, scripts/es5-check.js, src/index.js, src/index.test.js, Subprocess Isolation Pattern, Zero-Dependency Node.js CLI

### Community 3 - "npm Scripts"
Cohesion: 0.33
Nodes (5): scripts, lint, start, test, type-check

### Community 4 - "Guardrails Invariants"
Cohesion: 0.47
Nodes (6): Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files), Zero-Infrastructure Reproducibility

### Community 5 - "Quality Gates & Traps"
Cohesion: 0.53
Nodes (6): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Oracle, Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

### Community 6 - "package.json Metadata"
Cohesion: 0.4
Nodes (5): description, license, name, version, package.json

### Community 7 - "README & Lockfile Safety"
Cohesion: 0.67
Nodes (3): Lockfile Safety, README.md, False-Pass Test Suite Warning

## Knowledge Gaps
- **17 isolated node(s):** `name`, `version`, `description`, `start`, `test` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `package.json` connect `package.json Metadata` to `index.js Runtime`, `Governance File Hierarchy`, `npm Scripts`, `README & Lockfile Safety`?**
  _High betweenness centrality (0.269) - this node is a cross-community bridge._
- **Why does `scripts` connect `npm Scripts` to `package.json Metadata`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `Governance Benchmark Instrument` connect `Governance File Hierarchy` to `Runtime Oracle Architecture`, `Quality Gates & Traps`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._