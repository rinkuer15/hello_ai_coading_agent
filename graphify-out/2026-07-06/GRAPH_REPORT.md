# Graph Report - thread-3134effc  (2026-07-06)

## Corpus Check
- 7 files · ~5,312 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 81 nodes · 59 edges · 25 communities (8 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7a2da1b8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Code Style & Conventions|Code Style & Conventions]]
- [[_COMMUNITY_Build & Architecture Docs|Build & Architecture Docs]]
- [[_COMMUNITY_Guardrails & Quality Gates|Guardrails & Quality Gates]]
- [[_COMMUNITY_Mission Scope Definitions|Mission Scope Definitions]]
- [[_COMMUNITY_Project Core Identity|Project Core Identity]]
- [[_COMMUNITY_Scope & Quality Gates|Scope & Quality Gates]]
- [[_COMMUNITY_Protected Files & Rejections|Protected Files & Rejections]]
- [[_COMMUNITY_Runtime & ES5 Rules|Runtime & ES5 Rules]]
- [[_COMMUNITY_Triage & Decision Rules|Triage & Decision Rules]]
- [[_COMMUNITY_Hello AI Coding Agent — Agent Instructions|Hello AI Coding Agent — Agent Instructions]]
- [[_COMMUNITY_package.json|package.json]]
- [[_COMMUNITY_1. Triage Rules|1. Triage Rules]]
- [[_COMMUNITY_Architecture & Key Patterns|Architecture & Key Patterns]]
- [[_COMMUNITY_Code Style Conventions|Code Style Conventions]]
- [[_COMMUNITY_ES5-Only JavaScript|ES5-Only JavaScript]]
- [[_COMMUNITY_ES5 Only Rule|ES5 Only Rule]]
- [[_COMMUNITY_Governance File Immutability|Governance File Immutability]]
- [[_COMMUNITY_Governance Files Are the Architecture|Governance Files Are the Architecture]]
- [[_COMMUNITY_Governance Layer|Governance Layer]]
- [[_COMMUNITY_Module System One-Way Door|Module System One-Way Door]]
- [[_COMMUNITY_Single Execution Point|Single Execution Point]]
- [[_COMMUNITY_Single-File Constraint|Single-File Constraint]]
- [[_COMMUNITY_Stdout Contract|Stdout Contract]]
- [[_COMMUNITY_Zero Dependencies|Zero Dependencies]]
- [[_COMMUNITY_Auto-Reject Triggers|Auto-Reject Triggers]]

## God Nodes (most connected - your core abstractions)
1. `Guardrails` - 10 edges
2. `Hello AI Coding Agent — Agent Instructions` - 9 edges
3. `Mission` - 9 edges
4. `6. Known Traps (Read Before Every Run)` - 6 edges
5. `scripts` - 5 edges
6. `1. Triage Rules` - 5 edges
7. `Hello AI Coding Agent` - 5 edges
8. `Architecture & Key Patterns` - 4 edges
9. `2. Implementation Rules` - 3 edges
10. `main` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Governance Conflict Resolution Hierarchy** — mission_mission, guardrails_guardrails, claude_agentinstructions [EXTRACTED 1.00]
- **Hard Invariants Enforcement Surface** — mission_hardinvariants, guardrails_autorejecttriggers, guardrails_protectedfiles [EXTRACTED 1.00]
- **Agent Compliance Measurement** — mission_governancebenchmark, guardrails_knowntraps, claude_es5constraint [INFERRED 0.85]

## Communities (25 total, 17 thin omitted)

### Community 0 - "Code Style & Conventions"
Cohesion: 0.18
Nodes (10): 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 7. Escalation to Human, 8. Communication Style, 9. Changes to This File, Absolute Prohibitions (+2 more)

### Community 2 - "Guardrails & Quality Gates"
Cohesion: 0.18
Nodes (10): description, license, main, name, scripts, lint, start, test (+2 more)

### Community 4 - "Project Core Identity"
Cohesion: 0.20
Nodes (9): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done), What Hello AI Coding Agent Is (+1 more)

### Community 6 - "Protected Files & Rejections"
Cohesion: 0.22
Nodes (8): Build, Test & Lint, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Project Overview, Repository Layout, Tech Stack, What NOT to Do

### Community 8 - "Triage & Decision Rules"
Cohesion: 0.33
Nodes (5): Contributing, Hello AI Coding Agent, Running Tests, Setup, Usage

### Community 9 - "Hello AI Coding Agent — Agent Instructions"
Cohesion: 0.33
Nodes (6): 6. Known Traps (Read Before Every Run), Trap 1 — Empty-Suite False Pass, Trap 2 — `node --check` False ES5 Clearance, Trap 3 — Blank-Line Formatter Collapse, Trap 4 — `npm install` No-Op Masquerade, Trap 5 — `package-lock.json` Silent Generation

### Community 10 - "package.json"
Cohesion: 0.40
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

### Community 11 - "1. Triage Rules"
Cohesion: 0.50
Nodes (4): Architecture & Key Patterns, Coding Rules, Core Architecture, Key Conventions

## Knowledge Gaps
- **52 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Guardrails` connect `Code Style & Conventions` to `Hello AI Coding Agent — Agent Instructions`, `package.json`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `6. Known Traps (Read Before Every Run)` connect `Hello AI Coding Agent — Agent Instructions` to `Code Style & Conventions`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `1. Triage Rules` connect `package.json` to `Code Style & Conventions`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._