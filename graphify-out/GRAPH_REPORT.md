# Graph Report - .  (2026-07-03)

## Corpus Check
- Corpus is ~5,263 words - fits in a single context window. You may not need a graph.

## Summary
- 110 nodes · 154 edges · 9 communities
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `Hello AI Coding Agent` - 11 edges
2. `Hello AI Coding Agent — Agent Instructions` - 10 edges
3. `Mission` - 9 edges
4. `Quality Standards (Definition of Done)` - 8 edges
5. `Core Capabilities (In Scope)` - 7 edges
6. `Out of Scope (Must Never Build)` - 7 edges
7. `Hard Invariants` - 6 edges
8. `Quality Gates` - 6 edges
9. `Governance Layer` - 6 edges
10. `1. Triage Rules` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Hard Invariants` --semantically_similar_to--> `Auto-Reject Triggers`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Governance File Immutability` --semantically_similar_to--> `Protected Files`  [INFERRED] [semantically similar]
  CLAUDE.md → GUARDRAILS.md
- `Byte-Stable Stdout Contract` --semantically_similar_to--> `Stdout Contract Verification`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Byte-Stable Stdout Contract` --semantically_similar_to--> `Stdout Contract`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md

## Hyperedges (group relationships)
- **Governance Hierarchy** — mission_document, guardrails_document, claude_document, mission_governance_rule_hierarchy [EXTRACTED 1.00]
- **Stdout Oracle** — mission_stdout_contract, guardrails_stdout_contract, claude_stdout_contract [INFERRED 0.95]
- **Immutability Enforcement Pattern** — mission_document, guardrails_protected_files, claude_governance_file_immutability [INFERRED 0.85]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Code Style & Conventions"
Cohesion: 0.14
Nodes (21): Blank-Line Rule, Code Style Conventions, ES5 Only Rule, Governance File Immutability, Governance Files Are the Architecture, Governance Layer, Single Execution Point, Single-File Constraint (+13 more)

### Community 1 - "Build & Architecture Docs"
Cohesion: 0.13
Nodes (16): code:js (var assert = require('node:assert');), graphify, Architecture & Key Patterns, Build, Test & Lint, code:js (// src/index.test.js), Coding Rules, Core Architecture, Development Notes (+8 more)

### Community 2 - "Guardrails & Quality Gates"
Cohesion: 0.15
Nodes (12): Empty-Suite Trap, Meta-rule, 8. Codebase-Specific Notes, 2. Implementation Rules, 6. Known Traps for AI Agents, 7. Escalation to Human, 8. Communication Style, 9. Changes to This File (+4 more)

### Community 3 - "Mission Scope Definitions"
Cohesion: 0.15
Nodes (13): Allowed Evolutions, code:block2 (Hello, AI Coding Agent!), code:bash (npm run lint          # exits 0), code:bash (node src/index.js), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Quality Standards (Definition of Done) (+5 more)

### Community 4 - "Project Core Identity"
Cohesion: 0.2
Nodes (11): Module System One-Way Door, Zero Dependencies, Hello AI Coding Agent, Minimal Node.js Scaffold, Running Tests, Usage, code:bash (npm install), code:bash (npm start) (+3 more)

### Community 5 - "Scope & Quality Gates"
Cohesion: 0.22
Nodes (10): code:bash (npm run lint && npm test), 3. Quality Gates for Auto-Merge, code:bash (npm run lint && npm run type-check && npm test), Core Capabilities (In Scope), Automated Quality Gates, Coding Convention Enforcement, Governance Authority Hierarchy, Runtime Contract (+2 more)

### Community 6 - "Protected Files & Rejections"
Cohesion: 0.25
Nodes (9): 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), Out of Scope (Must Never Build), Dependency Introduction, Governance File Modification, Language Modernisation, Module System Changes, Production Application Infrastructure (+1 more)

### Community 7 - "Runtime & ES5 Rules"
Cohesion: 0.25
Nodes (7): ES5-Only JavaScript, Auto-Reject Triggers, console.log, main, Byte-Stable Regression Contract, Zero-Blast-Radius Sandbox, Zero External Dependencies

### Community 8 - "Triage & Decision Rules"
Cohesion: 0.4
Nodes (5): 1. Triage Rules, Accept, Defer to Human, Priority Assignment, Reject (close with comment)

## Knowledge Gaps
- **50 isolated node(s):** `AI Agent Instructions`, `Project Overview`, `Repository Layout`, `Build, Test & Lint`, `Core Architecture` (+45 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Mission` connect `Mission Scope Definitions` to `Code Style & Conventions`, `Scope & Quality Gates`, `Protected Files & Rejections`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **Why does `Hello AI Coding Agent — Agent Instructions` connect `Build & Architecture Docs` to `Code Style & Conventions`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **Why does `Quality Standards (Definition of Done)` connect `Mission Scope Definitions` to `Scope & Quality Gates`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **What connects `AI Agent Instructions`, `Project Overview`, `Repository Layout` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Code Style & Conventions` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Build & Architecture Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._