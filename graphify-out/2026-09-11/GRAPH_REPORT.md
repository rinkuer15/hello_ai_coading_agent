# Graph Report - .  (2026-09-11)

## Corpus Check
- Corpus is ~6,335 words - fits in a single context window. You may not need a graph.

## Summary
- 63 nodes · 101 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Authority Hierarchy|Governance Authority Hierarchy]]
- [[_COMMUNITY_ES5 Gate & Oracle Test Suite|ES5 Gate & Oracle Test Suite]]
- [[_COMMUNITY_Runtime Oracle Invariants|Runtime Oracle Invariants]]
- [[_COMMUNITY_Immutability & Protected Files|Immutability & Protected Files]]
- [[_COMMUNITY_Compliance Traps & Quality Gates|Compliance Traps & Quality Gates]]
- [[_COMMUNITY_Lockfile Safety & Package Config|Lockfile Safety & Package Config]]
- [[_COMMUNITY_On-Demand Context Modules|On-Demand Context Modules]]
- [[_COMMUNITY_Scope Triage Rules|Scope Triage Rules]]
- [[_COMMUNITY_AGENTS.md Redirect|AGENTS.md Redirect]]

## God Nodes (most connected - your core abstractions)
1. `MISSION.md` - 10 edges
2. `src/index.js` - 10 edges
3. `GUARDRAILS.md` - 9 edges
4. `Governance Benchmark Instrument` - 6 edges
5. `ES5 Compliance Checker Script` - 5 edges
6. `Quality Gates for Auto-Merge (11 Gates)` - 5 edges
7. `Stdout Oracle (Hello, AI Coding Agent!)` - 5 edges
8. `Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS)` - 5 edges
9. `AGENTS.md` - 5 edges
10. `src/index.test.js` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Trap Detection` --semantically_similar_to--> `Known Compliance Traps (8 Traps)`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `README Human Documentation` --references--> `ES5 Compliance Checker Script`  [EXTRACTED]
  ReadMe.md → scripts/es5-check.js
- `README Human Documentation` --references--> `Index Test File`  [EXTRACTED]
  ReadMe.md → src/index.test.js
- `ES5 Language Surface` --conceptually_related_to--> `Quality Gates for Auto-Merge (11 Gates)`  [INFERRED]
  CLAUDE.md → GUARDRAILS.md
- `Compliance Oracle` --conceptually_related_to--> `Quality Gates for Auto-Merge (11 Gates)`  [INFERRED]
  MISSION.md → GUARDRAILS.md

## Hyperedges (group relationships)
- **ES5 Compliance Checking Pipeline** — es5check_script, es5check_stripstep, es5check_forbiddentokens, es5check_regexgap [EXTRACTED 1.00]
- **Governance Constitution (Four Immutable Files)** — mission_immutability_surface, mission_authority_hierarchy, guardrails_protected_files, claude_hard_rules [EXTRACTED 1.00]
- **Oracle Integrity Constraints** — mission_stdout_oracle, claude_mandatory_blank_line, mission_hard_invariants, guardrails_absolute_prohibitions [INFERRED 0.90]
- **Governance Authority Documents** — claude_mission_md, claude_guardrails_md, claude_claude_md, claude_agents_md, claude_governance_constitution [EXTRACTED 1.00]
- **Oracle Validation System** — claude_src_index_js, claude_src_index_test_js, claude_scripts_es5_check_js, claude_package_json, claude_byte_stable_stdout_oracle [EXTRACTED 1.00]
- **On-Demand Context Suite** — claude_on_demand_context_modules, claude_es5_compliance_traps_md, claude_test_writing_guide_md, claude_lockfile_safety_md, claude_es5_checker_mechanics_md, claude_governance_authority_hierarchy_md [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "Governance Authority Hierarchy"
Cohesion: 0.38
Nodes (11): AGENTS.md, Conflict Resolution Hierarchy, .gitignore, Governance Authority Hierarchy, Governance Constitution, Governance Files Immutable to Automation, graphify-out/, GUARDRAILS.md (+3 more)

### Community 1 - "ES5 Gate & Oracle Test Suite"
Cohesion: 0.29
Nodes (10): Forbidden ES6+ Token List, Known Regex Literal Strip Gap, ES5 Compliance Checker Script, Comment and String Stripping Pipeline, src/index.js Runtime Oracle, Exit Code 0 Assertion in Tests, Byte-Exact Stdout Assertion in Tests, Index Test File (+2 more)

### Community 2 - "Runtime Oracle Invariants"
Cohesion: 0.33
Nodes (10): Byte-Stable Stdout Oracle, ES5 Language Surface, Mandatory Blank Line in Oracle, Runtime Oracle, scripts/es5-check.js, src/index.js, src/index.test.js, Subprocess Isolation Pattern (+2 more)

### Community 3 - "Immutability & Protected Files"
Cohesion: 0.36
Nodes (8): Redirect to CLAUDE.md, Absolute Prohibitions (16 Rules), Auto-Reject Triggers (13 Triggers), Protected Files (Auto-Reject on Modification), Authority Hierarchy (MISSION > GUARDRAILS > CLAUDE > AGENTS), Hard Invariants (7 Non-Tunable Constraints), Immutability Surface (Four Governance Files), Zero-Infrastructure Reproducibility

### Community 4 - "Compliance Traps & Quality Gates"
Cohesion: 0.53
Nodes (6): Known Compliance Traps (8 Traps), Quality Gates for Auto-Merge (11 Gates), Compliance Oracle, Compliance Trap Detection, Automated ES5 Gate (es5-check.js), Stdout Oracle (Hello, AI Coding Agent!)

### Community 5 - "Lockfile Safety & Package Config"
Cohesion: 0.33
Nodes (5): Lockfile Safety, package.json, README.md, False-Pass Test Suite Warning, main()

### Community 6 - "On-Demand Context Modules"
Cohesion: 0.33
Nodes (6): .devox/standards/context/es5-checker-mechanics.md, .devox/standards/context/es5-compliance-traps.md, .devox/standards/context/governance-authority-hierarchy.md, .devox/standards/context/lockfile-safety.md, On-Demand Context Modules, .devox/standards/context/test-writing-guide.md

## Knowledge Gaps
- **16 isolated node(s):** `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim`, `Triage Rules (Accept / Reject / Defer)`, `Out of Scope (Must Never Build)` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Governance Benchmark Instrument` connect `Runtime Oracle Invariants` to `Governance Authority Hierarchy`, `Immutability & Protected Files`, `Compliance Traps & Quality Gates`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md` connect `Governance Authority Hierarchy` to `Immutability & Protected Files`, `Compliance Traps & Quality Gates`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `Stdout Oracle (Hello, AI Coding Agent!)` connect `Compliance Traps & Quality Gates` to `Runtime Oracle Invariants`, `Immutability & Protected Files`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `Byte-Exact Stdout Assertion in Tests`, `Exit Code 0 Assertion in Tests`, `AGENTS.md â€” Discovery Shim` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._