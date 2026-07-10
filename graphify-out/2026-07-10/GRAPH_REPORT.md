# Graph Report - thread-e95bd1f4  (2026-07-10)

## Corpus Check
- 7 files · ~5,506 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 80 nodes · 55 edges · 27 communities (7 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cf2fb2b9`
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
- [[_COMMUNITY_Scope Authority (MISSION.md)|Scope Authority (MISSION.md)]]
- [[_COMMUNITY_console.log|console.log]]

## God Nodes (most connected - your core abstractions)
1. `Guardrails` - 11 edges
2. `Hello AI Coding Agent — Agent Instructions` - 9 edges
3. `Mission` - 9 edges
4. `scripts` - 5 edges
5. `1. Triage Rules` - 5 edges
6. `Hello AI Coding Agent` - 5 edges
7. `Architecture & Key Patterns` - 4 edges
8. `2. Implementation Rules` - 3 edges
9. `main` - 1 edges
10. `test` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Total-Order Authority Hierarchy Chain** — mission_scopeauthority, guardrails_processrules, claude_agentinstructions, claude_agentsmd [EXTRACTED 1.00]
- **Hard Invariants Enforcement Cluster** — mission_hardinvariants, guardrails_autorejecttriggers, guardrails_absoluteprohibitions, claude_immutabilityprinciple [EXTRACTED 1.00]
- **Stdout Oracle Validation Flow** — claude_indexjs, claude_stdoutoracle, guardrails_qualitygates [EXTRACTED 1.00]

## Communities (27 total, 20 thin omitted)

### Community 3 - "Mission Scope Definitions"
Cohesion: 0.15
Nodes (12): 10. Changes to This File, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Known Traps (Read Before Validating), 7. Escalation to Human, 8. Communication Style (+4 more)

### Community 4 - "Project Core Identity"
Cohesion: 0.18
Nodes (10): description, license, main, name, scripts, lint, start, test (+2 more)

### Community 6 - "Protected Files & Rejections"
Cohesion: 0.20
Nodes (9): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done), What Hello AI Coding Agent Is (+1 more)

### Community 7 - "Runtime & ES5 Rules"
Cohesion: 0.22
Nodes (8): Build, Test & Lint, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Project Overview, Repository Layout, Tech Stack, What NOT to Do

### Community 8 - "Triage & Decision Rules"
Cohesion: 0.33
Nodes (5): Contributing, Hello AI Coding Agent, Running Tests, Setup, Usage

### Community 9 - "Hello AI Coding Agent — Agent Instructions"
Cohesion: 0.40
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

### Community 10 - "package.json"
Cohesion: 0.50
Nodes (4): Architecture & Key Patterns, Coding Rules, Core Architecture, Key Conventions

## Knowledge Gaps
- **53 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Guardrails` connect `Mission Scope Definitions` to `Hello AI Coding Agent — Agent Instructions`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent — Agent Instructions` connect `Runtime & ES5 Rules` to `package.json`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `1. Triage Rules` connect `Hello AI Coding Agent — Agent Instructions` to `Mission Scope Definitions`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._