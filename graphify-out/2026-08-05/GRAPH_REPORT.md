# Graph Report - thread-56b273d7  (2026-08-05)

## Corpus Check
- 9 files · ~6,204 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 55 nodes · 52 edges · 16 communities (10 shown, 6 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0207d609`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Core Capabilities
- Hard Invariants
- Protected Files
- Known Compliance Traps
- ReadMe.md
- Auto-Reject Triggers
- Non-Goals
- Allowed Evolutions
- src/index.js â€” Runtime Oracle
- AGENTS.md â€” Discovery Shim
- package.json
- scripts

## God Nodes (most connected - your core abstractions)
1. `Core Capabilities` - 7 edges
2. `scripts` - 6 edges
3. `Governance Immutability` - 5 edges
4. `Governance Benchmark Instrument` - 4 edges
5. `Known Compliance Traps` - 4 edges
6. `Hard Invariants` - 4 edges
7. `Compliance Oracle` - 3 edges
8. `Authority Hierarchy` - 3 edges
9. `Single-File Architecture` - 3 edges
10. `Blank Line Trap` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Protected Files` --conceptually_related_to--> `Governance Immutability`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md
- `Known Compliance Traps` --conceptually_related_to--> `Blank Line Trap`  [INFERRED]
  GUARDRAILS.md → CLAUDE.md
- `Hard Invariants` --references--> `Governance Immutability`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Immutability Resistance Testing` --rationale_for--> `Governance Immutability`  [EXTRACTED]
  MISSION.md → CLAUDE.md
- `Lockfile Hygiene Enforcement` --conceptually_related_to--> `Lockfile Trap`  [INFERRED]
  MISSION.md → GUARDRAILS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Governance Constitution** — mission_mission_md, guardrails_guardrails_md, claude_claude_md [EXTRACTED 1.00]
- **Authority Hierarchy Participation** — mission_mission_md, guardrails_guardrails_md, claude_claude_md, claude_authority_hierarchy [EXTRACTED 1.00]
- **Benchmark Core Capabilities** — claude_compliance_oracle, mission_immutability_resistance_testing, mission_formatter_trap_detection, mission_false_pass_trap_detection, mission_lockfile_hygiene_enforcement, mission_single_file_architecture_enforcement [EXTRACTED 1.00]

## Communities (16 total, 6 thin omitted)

### Community 0 - "Core Capabilities"
Cohesion: 0.39
Nodes (8): Authority Hierarchy, Compliance Oracle, False-Pass State, Governance Benchmark Instrument, Governance Immutability, Core Capabilities, False-Pass Trap Detection, Immutability Resistance Testing

### Community 1 - "Hard Invariants"
Cohesion: 0.40
Nodes (5): ES5 Compliance, Single-File Architecture, Stdout Oracle, Hard Invariants, Single-File Architecture Enforcement

### Community 2 - "Protected Files"
Cohesion: 0.40
Nodes (5): Escalation to Human, Implementation Rules, Protected Files, Quality Gates for Auto-Merge, Triage Rules

### Community 3 - "Known Compliance Traps"
Cohesion: 0.29
Nodes (7): Blank Line Trap, ES5 Gap Trap, Known Compliance Traps, Lockfile Trap, Scope Creep Trap, Formatter Trap Detection, Lockfile Hygiene Enforcement

### Community 12 - "package.json"
Cohesion: 0.33
Nodes (5): description, license, main, name, version

### Community 13 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, es5-check, lint, start, test, type-check

## Knowledge Gaps
- **12 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+7 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Governance Immutability` connect `Core Capabilities` to `Hard Invariants`, `Protected Files`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `Core Capabilities` connect `Core Capabilities` to `Hard Invariants`, `Known Compliance Traps`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `Protected Files` connect `Protected Files` to `Core Capabilities`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._