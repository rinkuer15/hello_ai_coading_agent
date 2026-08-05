# Graph Report - .  (2026-08-05)

## Corpus Check
- 6 files · ~5,768 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 41 nodes · 41 edges · 12 communities (6 shown, 6 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Compliance Trap Patterns|Compliance Trap Patterns]]
- [[_COMMUNITY_Governance Authority System|Governance Authority System]]
- [[_COMMUNITY_Process and Quality Rules|Process and Quality Rules]]
- [[_COMMUNITY_Known Compliance Traps|Known Compliance Traps]]
- [[_COMMUNITY_README Documentation|README Documentation]]
- [[_COMMUNITY_Auto-Reject Meta Rules|Auto-Reject Meta Rules]]
- [[_COMMUNITY_Scope Boundaries|Scope Boundaries]]
- [[_COMMUNITY_Evolution and Standards|Evolution and Standards]]
- [[_COMMUNITY_Index.js Reference|Index.js Reference]]
- [[_COMMUNITY_Agents Discovery Shim|Agents Discovery Shim]]

## God Nodes (most connected - your core abstractions)
1. `Core Capabilities` - 7 edges
2. `Governance Immutability` - 5 edges
3. `Governance Benchmark Instrument` - 4 edges
4. `Known Compliance Traps` - 4 edges
5. `Hard Invariants` - 4 edges
6. `Compliance Oracle` - 3 edges
7. `Authority Hierarchy` - 3 edges
8. `Single-File Architecture` - 3 edges
9. `Blank Line Trap` - 3 edges
10. `Protected Files` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Known Compliance Traps` --conceptually_related_to--> `Blank Line Trap`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md
- `Protected Files` --conceptually_related_to--> `Governance Immutability`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md
- `Lockfile Hygiene Enforcement` --conceptually_related_to--> `Lockfile Trap`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Core Capabilities` --references--> `Authority Hierarchy`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Hard Invariants` --references--> `Single-File Architecture`  [EXTRACTED]
  MISSION.md → CLAUDE.md

## Hyperedges (group relationships)
- **Governance Constitution** — mission_mission_md, guardrails_guardrails_md, claude_claude_md [EXTRACTED 1.00]
- **Authority Hierarchy Participation** — mission_mission_md, guardrails_guardrails_md, claude_claude_md, claude_authority_hierarchy [EXTRACTED 1.00]
- **Benchmark Core Capabilities** — claude_compliance_oracle, mission_immutability_resistance_testing, mission_formatter_trap_detection, mission_false_pass_trap_detection, mission_lockfile_hygiene_enforcement, mission_single_file_architecture_enforcement [EXTRACTED 1.00]

## Communities (12 total, 6 thin omitted)

### Community 0 - "Compliance Trap Patterns"
Cohesion: 0.28
Nodes (9): Blank Line Trap, Compliance Oracle, False-Pass State, Single-File Architecture, Core Capabilities, False-Pass Trap Detection, Formatter Trap Detection, Lockfile Hygiene Enforcement (+1 more)

### Community 1 - "Governance Authority System"
Cohesion: 0.38
Nodes (7): Authority Hierarchy, ES5 Compliance, Governance Benchmark Instrument, Governance Immutability, Stdout Oracle, Hard Invariants, Immutability Resistance Testing

### Community 2 - "Process and Quality Rules"
Cohesion: 0.4
Nodes (5): Escalation to Human, Implementation Rules, Protected Files, Quality Gates for Auto-Merge, Triage Rules

### Community 3 - "Known Compliance Traps"
Cohesion: 0.5
Nodes (4): ES5 Gap Trap, Known Compliance Traps, Lockfile Trap, Scope Creep Trap

## Knowledge Gaps
- **15 isolated node(s):** `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Usage`, `Running Tests`, `Stdout Oracle` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Governance Immutability` connect `Governance Authority System` to `Process and Quality Rules`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `Core Capabilities` connect `Compliance Trap Patterns` to `Governance Authority System`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `Protected Files` connect `Process and Quality Rules` to `Governance Authority System`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `src/index.js â€” Runtime Oracle`, `AGENTS.md â€” Discovery Shim`, `Usage` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._