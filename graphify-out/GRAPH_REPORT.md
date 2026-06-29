# Graph Report - thread-d9c207b9  (2026-06-29)

## Corpus Check
- 6 files · ~5,703 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 212 nodes · 225 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7eec2096`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Update Delta (vs previous run)
- **Removed:** 3 stale nodes (`Coding Conventions (Summary)`, `8. Known Traps — Read Before Any Validation`, stale code block)
- **Added:** 18 new nodes (2 GUARDRAILS, 1 CLAUDE `graphify`, 15 MISSION subsections)
- **Added:** 24 new links (19 containment + 5 semantic cross-file)
- **Net change:** +15 nodes, +21 links

## Community Hubs (Navigation)
- [[_COMMUNITY_Core Governance Concepts|Core Governance Concepts]]
- [[_COMMUNITY_Process Rules & Quality Gates|Process Rules & Quality Gates]]
- [[_COMMUNITY_Agent Instructions Detail|Agent Instructions Detail]]
- [[_COMMUNITY_Project Setup & Usage|Project Setup & Usage]]
- [[_COMMUNITY_Mission & Scope Detail|Mission & Scope Detail]]
- [[_COMMUNITY_Issue Triage Rules|Issue Triage Rules]]
- [[_COMMUNITY_Application Code|Application Code]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `Guardrails` - 10 edges
2. `Hello AI Coding Agent — Agent Instructions` - 10 edges
3. `Guardrails` - 10 edges
4. `Mission` - 10 edges
5. `Hello AI Coding Agent — Agent Instructions` - 10 edges
6. `Guardrails` - 10 edges
7. `MISSION.md` - 10 edges
8. `Hello AI Coding Agent — Agent Instructions` - 9 edges
9. `Mission` - 9 edges
10. `Hello AI Coding Agent — Agent Instructions` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Governance Layer` --semantically_similar_to--> `Governance Files Are the Architecture`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Quality Standards` --semantically_similar_to--> `Quality Gates`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Knowledge Graph Integration` --semantically_similar_to--> `graphify`  [INFERRED] [semantically similar]
  MISSION.md → CLAUDE.md
- `Automated Quality Gates` --semantically_similar_to--> `3. Quality Gates for Auto-Merge`  [INFERRED] [semantically similar]
  MISSION.md → GUARDRAILS.md
- `Hard Invariants` --conceptually_related_to--> `Protected Files`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Governance File Modification` --conceptually_related_to--> `4. Protected Files (Auto-Reject on Any Modification)`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Zero Dependencies` --rationale_for--> `Hello AI Coding Agent`  [EXTRACTED]
  CLAUDE.md → MISSION.md
- `Module System Changes` --conceptually_related_to--> `5. Auto-Reject Triggers (No Fix Attempts)`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Dependency Introduction` --conceptually_related_to--> `5. Auto-Reject Triggers (No Fix Attempts)`  [INFERRED]
  MISSION.md → GUARDRAILS.md
- `Single Execution Point` --conceptually_related_to--> `Hard Invariants`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **Governance Constraint System** — mission_mission_md, guardrails_guardrails_md, agents_agents_md, claude_claude_md, mission_governance_layer [EXTRACTED 1.00]

## Communities (15 total, 2 thin omitted)

### Community 0 - "Core Governance Concepts"
Cohesion: 0.10
Nodes (32): Allowed Evolutions, Automated Quality Gates, Coding Convention Enforcement, Core Capabilities (In Scope), Dependency Introduction, Gate 1 — Static Checks Pass, Gate 2 — Feature Is Discoverable Without Docs, Gate 3 — End-to-End Regression, Governance Authority Hierarchy, Governance File Modification, Hard Invariants (Not Tunable by Issues), Knowledge Graph Integration, Language Modernisation, Mission, Module System Changes, Non-Goals (+16 more)

### Community 1 - "Process Rules & Quality Gates"
Cohesion: 0.17
Nodes (23): Gate 1 — Static Checks Pass, Gate 2 — Feature Is Discoverable Without Docs, Gate 3 — End-to-End Regression, Governance Files Are the Architecture, Module System One-Way Door, Single Execution Point, Zero Dependencies, Meta-rule, Protected Files, Quality Gates, Allowed Evolutions (+12 more)

### Community 2 - "Agent Instructions Detail"
Cohesion: 0.11
Nodes (18): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Stack-Specific Traps (Read Before Any Validation) (+10 more)

### Community 3 - "Project Setup & Usage"
Cohesion: 0.11
Nodes (18): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Codebase-Specific Notes (+10 more)

### Community 4 - "Mission & Scope Detail"
Cohesion: 0.12
Nodes (17): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Changes to This File (+9 more)

### Community 5 - "Issue Triage Rules"
Cohesion: 0.12
Nodes (16): 1. Triage Rules, 2. Implementation Rules, 3. Quality Gates for Auto-Merge, 4. Protected Files (Auto-Reject on Any Modification), 5. Auto-Reject Triggers (No Fix Attempts), 6. Escalation to Human, 7. Communication Style, 8. Changes to This File (+8 more)

### Community 6 - "Application Code"
Cohesion: 0.15
Nodes (13): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Key Conventions (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (13): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Key Conventions (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (14): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, graphify, Hello AI Coding Agent — Agent Instructions, Important Files (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (12): Architecture & Key Patterns, Build, Test & Lint, Coding Rules, Core Architecture, Development Notes, Hello AI Coding Agent — Agent Instructions, Important Files, Key Conventions (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (10): code:bash (npm install), code:bash (npm start), code:bash (npm test), Contributing, Hello AI Coding Agent, Running Tests, Setup, Usage (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (10): Allowed Evolutions, Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done), What Hello AI Coding Agent Is (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (10): Allowed Evolutions, code:bash (npm run lint && npm run type-check && npm test), Core Capabilities (In Scope), Hard Invariants (Not Tunable by Issues), Mission, Non-Goals, Out of Scope (Must Never Build), Quality Standards (Definition of Done) (+2 more)

## Knowledge Gaps
- **144 isolated node(s):** `index.js`, `AGENTS.md`, `Project Overview`, `Repository Layout`, `Build, Test & Lint` (+139 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Guardrails` bridge `Agent Instructions Detail`, `Project Setup & Usage`, and `Mission & Scope Detail` simultaneously?**
  _High betweenness centrality (0.055) — this node is the primary cross-community bridge._
- **What is the difference between `Knowledge Graph Integration` (MISSION.md) and `graphify` (CLAUDE.md)?**
  _INFERRED semantically_similar_to edge (0.95) — two representations of the same concept across governance documents._
- **Why do `Automated Quality Gates` (MISSION.md) and `3. Quality Gates for Auto-Merge` (GUARDRAILS.md) both exist?**
  _INFERRED semantically_similar_to edge (0.90) — MISSION defines what they are, GUARDRAILS defines how they operate._
- **What connects `Project Overview`, `Tech Stack`, `Repository Layout` to the rest of the system?**
  _144 weakly-connected nodes found — possible documentation gaps or missing edges._
- **Should `Core Governance Concepts` (32 nodes, cohesion 0.10) be split into smaller focused modules?**
  _Low cohesion indicates the MISSION.md subsections are loosely interconnected — consider linking them more explicitly._
- **Which Out-of-Scope categories (`Runtime Complexity`, `Dependency Introduction`, `Module System Changes`, etc.) map directly to auto-reject triggers?**
  _Three new INFERRED edges bridge MISSION.md Out of Scope → GUARDRAILS.md Section 5._
