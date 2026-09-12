# Graph Report - .  (2026-09-12)

## Corpus Check
- Corpus is ~5,992 words - fits in a single context window. You may not need a graph.

## Summary
- 85 nodes · 154 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Package & Scripts|Package & Scripts]]
- [[_COMMUNITY_Governance Constitution|Governance Constitution]]
- [[_COMMUNITY_Runtime Oracle & Validation|Runtime Oracle & Validation]]
- [[_COMMUNITY_ES5 Check & Test Details|ES5 Check & Test Details]]
- [[_COMMUNITY_Context Modules & Config|Context Modules & Config]]
- [[_COMMUNITY_Zero-Dependency Invariants|Zero-Dependency Invariants]]
- [[_COMMUNITY_Compliance Gates|Compliance Gates]]
- [[_COMMUNITY_Scope Triage Rules|Scope Triage Rules]]
- [[_COMMUNITY_AGENTS.md Redirect|AGENTS.md Redirect]]

## God Nodes (most connected - your core abstractions)
1. `MISSION.md` - 17 edges
2. `src/index.js` - 11 edges
3. `Governance Benchmark Instrument` - 10 edges
4. `GUARDRAILS.md` - 9 edges
5. `package.json` - 9 edges
6. `ES5 Language Surface` - 8 edges
7. `Mandatory Blank Line in Oracle` - 8 edges
8. `src/index.test.js` - 7 edges
9. `Governance Files Immutable to Automation` - 7 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Mandatory Blank Line in Oracle` --semantically_similar_to--> `Blank Line Is Load-Bearing`  [INFERRED] [semantically similar]
  CLAUDE.md → MISSION.md
- `Protected Files (Auto-Reject on Modification)` --semantically_similar_to--> `Governance Files Immutable to Automation`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Zero-Dependency Invariant` --semantically_similar_to--> `Zero-Dependency Node.js CLI`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md
- `ES5 Compliance Gate` --semantically_similar_to--> `ES5 Language Surface`  [INFERRED] [semantically similar]
  GUARDRAILS.md → CLAUDE.md

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Oracle Validation Contract** — guardrails_full_pre_pr_gate, guardrails_byte_exact_oracle, guardrails_es5_compliance_gate, claude_mandatory_blank_line [EXTRACTED 1.00]
- **Governance Authority Hierarchy** — mission_mission_md, claude_guardrails_md, claude_claude_md, claude_agents_md [EXTRACTED 1.00]
- **Benchmark Enforcement Tripod** — mission_deterministic_stdout_oracle, mission_es5_compliance_gate, mission_byte_exact_integration_testing [EXTRACTED 1.00]
- **Governance Authority Stack** — claude_mission_md, claude_guardrails_md, claude_claude_md, claude_governance_authority_hierarchy [EXTRACTED 1.00]
- **Oracle Validation Gate** — claude_src_index_js, claude_src_index_test_js, claude_scripts_es5_check_js, claude_full_pre_pr_validation_gate [EXTRACTED 1.00]
- **Minimal CLI Pattern** — claude_package_json, claude_src_index_js, claude_zero_dependency_node_js_cli, claude_single_file_production_architecture [INFERRED 0.85]

## Communities (10 total, 2 thin omitted)

### Community 0 - "Package & Scripts"
Cohesion: 0.12
Nodes (14): description, license, name, scripts, lint, start, test, type-check (+6 more)

### Community 1 - "Governance Constitution"
Cohesion: 0.27
Nodes (16): Redirect to CLAUDE.md, AGENTS.md, Conflict Resolution Hierarchy, Governance Authority Hierarchy, Governance Constitution, Governance Files Immutable to Automation, GUARDRAILS.md, MISSION.md (+8 more)

### Community 2 - "Runtime Oracle & Validation"
Cohesion: 0.24
Nodes (15): Byte-Stable Stdout Oracle, ES5 Language Surface, Full Pre-PR Validation Gate, Mandatory Blank Line in Oracle, Runtime Oracle, scripts/es5-check.js, Single-File Production Architecture, src/index.js (+7 more)

### Community 3 - "ES5 Check & Test Details"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 4 - "Context Modules & Config"
Cohesion: 0.29
Nodes (9): .devox/standards/context/es5-checker-mechanics.md, .devox/standards/context/es5-compliance-traps.md, .gitignore, .devox/standards/context/governance-authority-hierarchy.md, graphify-out/, .devox/standards/context/lockfile-safety.md, On-Demand Context Modules, Style and Convention Authority (+1 more)

### Community 5 - "Zero-Dependency Invariants"
Cohesion: 0.25
Nodes (8): Two Decoupled Layers, Zero-Dependency Node.js CLI, Zero-Dependency Invariant, Byte-Exact Integration Testing, Deterministic Stdout Oracle, Governance Benchmark Instrument, Layered Governance Enforcement, Zero-Dependency Reproducibility

### Community 6 - "Compliance Gates"
Cohesion: 0.53
Nodes (6): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Oracle, Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

## Knowledge Gaps
- **20 isolated node(s):** `name`, `version`, `description`, `start`, `test` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `package.json` connect `Package & Scripts` to `Context Modules & Config`, `Zero-Dependency Invariants`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **Why does `MISSION.md` connect `Governance Constitution` to `Runtime Oracle & Validation`, `Context Modules & Config`, `Zero-Dependency Invariants`, `Compliance Gates`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package & Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._