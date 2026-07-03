# Graph Report - .  (2026-07-03)

## Corpus Check
- 6 files · ~5,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 32 nodes · 58 edges · 10 communities (5 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance & Compliance Rules|Governance & Compliance Rules]]
- [[_COMMUNITY_Process & Quality Gates|Process & Quality Gates]]
- [[_COMMUNITY_Testing & Tooling|Testing & Tooling]]
- [[_COMMUNITY_README & Docs|README & Docs]]
- [[_COMMUNITY_Main Function Logic|Main Function Logic]]
- [[_COMMUNITY_Code Block 1|Code Block 1]]
- [[_COMMUNITY_Code Block 2|Code Block 2]]
- [[_COMMUNITY_Code Block 3|Code Block 3]]

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md â€” Agent Instructions` - 14 edges
2. `MISSION.md â€” Mission` - 13 edges
3. `GUARDRAILS.md â€” Guardrails` - 10 edges
4. `src/index.js â€” Runtime Entry Point` - 7 edges
5. `Auto-Reject Triggers (14 items)` - 7 edges
6. `src/index.test.js â€” Canonical Test File` - 6 edges
7. `Stdout Oracle â€” Byte-Stable Compliance Signal` - 5 edges
8. `Blank-Line Rule â€” Hard Invariant` - 5 edges
9. `Protected Files â€” Auto-Reject on Modification` - 5 edges
10. `AGENTS.md â€” Agent Redirect Shim` - 4 edges

## Surprising Connections (you probably didn't know these)
- `GUARDRAILS.md â€” Guardrails` --references--> `CLAUDE.md â€” Agent Instructions`  [EXTRACTED]
  GUARDRAILS.md → CLAUDE.md
- `CLAUDE.md â€” Agent Instructions` --references--> `Stdout Oracle â€” Byte-Stable Compliance Signal`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `CLAUDE.md â€” Agent Instructions` --references--> `ES5 Calibration Trap`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `MISSION.md â€” Mission` --references--> `GUARDRAILS.md â€” Guardrails`  [EXTRACTED]
  MISSION.md → GUARDRAILS.md
- `GUARDRAILS.md â€” Guardrails` --references--> `src/index.test.js â€” Canonical Test File`  [EXTRACTED]
  GUARDRAILS.md → CLAUDE.md

## Hyperedges (group relationships)
- **Constitutional Governance Document Set** — missionmd_mission, guardrailsmd_guardrails, claudemd_agent_instructions, agentsmd_agents_redirect [EXTRACTED 1.00]
- **Hard Invariants â€” Not Tunable by Issues** — concept_stdout_oracle, concept_zero_dependency, concept_single_file_architecture, concept_blank_line_rule, concept_es5_calibration_trap [EXTRACTED 1.00]
- **Auto-Merge Quality Gate Checks** — concept_quality_gates, concept_stdout_oracle, concept_blank_line_rule, src_index_test_js, concept_es5_calibration_trap [EXTRACTED 1.00]

## Communities (10 total, 5 thin omitted)

### Community 0 - "Governance & Compliance Rules"
Cohesion: 0.56
Nodes (9): AGENTS.md â€” Agent Redirect Shim, CLAUDE.md â€” Agent Instructions, Auto-Reject Triggers (14 items), Blank-Line Rule â€” Hard Invariant, Constitutional Governance Document Hierarchy, Protected Files â€” Auto-Reject on Modification, Single-File Source Architecture Invariant, Zero-Dependency Design Invariant (+1 more)

### Community 1 - "Process & Quality Gates"
Cohesion: 0.43
Nodes (7): Absolute Prohibitions (13 items), ES5 Calibration Trap, Escalation to Human Rules, Quality Gates for Auto-Merge (9 gates), Stdout Oracle â€” Byte-Stable Compliance Signal, GUARDRAILS.md â€” Guardrails, src/index.js â€” Runtime Entry Point

### Community 2 - "Testing & Tooling"
Cohesion: 0.5
Nodes (5): Allowed Evolutions, Empty-Suite Trap â€” Silent Exit 0 Failure, Node.js Built-in Test Runner, graphify-out/ â€” Generated Knowledge Graph Artefacts, src/index.test.js â€” Canonical Test File

## Knowledge Gaps
- **8 isolated node(s):** `code:bash (npm install)`, `code:bash (npm start)`, `code:bash (npm test)`, `main`, `console.log` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md â€” Agent Instructions` connect `Governance & Compliance Rules` to `Process & Quality Gates`, `Testing & Tooling`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `GUARDRAILS.md â€” Guardrails` connect `Process & Quality Gates` to `Governance & Compliance Rules`, `Testing & Tooling`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `MISSION.md â€” Mission` connect `Governance & Compliance Rules` to `Process & Quality Gates`, `Testing & Tooling`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `code:bash (npm install)`, `code:bash (npm start)`, `code:bash (npm test)` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._