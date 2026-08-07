# Graph Report - .  (2026-08-07)

## Corpus Check
- 8 files · ~6,372 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 34 nodes · 29 edges · 8 communities
- Extraction: 83% EXTRACTED · 14% INFERRED · 3% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ES5 Code Conventions|ES5 Code Conventions]]
- [[_COMMUNITY_ES5 Compliance Gate|ES5 Compliance Gate]]
- [[_COMMUNITY_Authority Hierarchy|Authority Hierarchy]]
- [[_COMMUNITY_Stdout Oracle Verification|Stdout Oracle Verification]]
- [[_COMMUNITY_Process Safety Rules|Process Safety Rules]]

## God Nodes (most connected - your core abstractions)
1. `ES5 compliance checker` - 4 edges
2. `authority hierarchy` - 3 edges
3. `ES5 language surface only` - 3 edges
4. `allowed evolutions` - 3 edges
5. `src/index.test.js` - 3 edges
6. `stdout oracle outputs exact bytes and exits 0` - 2 edges
7. `stdout oracle` - 2 edges
8. `src/index.js` - 2 edges
9. `src/index.test.js` - 2 edges
10. `false-pass test state` - 2 edges

## Surprising Connections (you probably didn't know these)
- `compliance oracle` --semantically_similar_to--> `stdout oracle`  [INFERRED] [semantically similar]
  MISSION.md → src/index.test.js
- `ES5 compliance checker` --rationale_for--> `ES5 language surface only`  [INFERRED]
  scripts/es5-check.js → CLAUDE.md
- `ES5 compliance checker` --conceptually_related_to--> `allowed evolutions`  [AMBIGUOUS]
  scripts/es5-check.js → MISSION.md
- `false-pass test state` --semantically_similar_to--> `known compliance traps`  [INFERRED] [semantically similar]
  CLAUDE.md → GUARDRAILS.md
- `authority hierarchy` --conceptually_related_to--> `governance constitution`  [INFERRED]
  CLAUDE.md → MISSION.md

## Hyperedges (group relationships)
- **governance hierarchy** — claude_authority_hierarchy, claude_mission_md, claude_guardrails_md [EXTRACTED 1.00]
- **oracle verification flow** — mission_stdout_oracle, index_test_stdout_oracle_test, index_test_index_js [INFERRED 0.85]
- **false-pass test compliance trap** — claude_false_pass_test_state, guardrails_known_compliance_traps, readme_npm_test_false_pass [INFERRED 0.85]

## Communities (8 total, 0 thin omitted)

### Community 0 - "ES5 Code Conventions"
Cohesion: 0.25
Nodes (8): ES5 language surface only, false-pass test state, mandatory blank line, src/index.js, src/index.test.js, known compliance traps, quality gates for auto-merge, src/index.test.js

### Community 1 - "ES5 Compliance Gate"
Cohesion: 0.25
Nodes (8): ES5 compliance checker, forbidden ES6+ tokens, src/index.js, allowed evolutions, scripts/es5-check.js, npm test false-pass, src/index.test.js, Validation

### Community 2 - "Authority Hierarchy"
Cohesion: 0.33
Nodes (6): authority hierarchy, GUARDRAILS.md, MISSION.md, governance benchmark instrument, governance constitution, src/index.js

### Community 3 - "Stdout Oracle Verification"
Cohesion: 0.5
Nodes (4): index.js, stdout oracle, stdout oracle outputs exact bytes and exits 0, compliance oracle

### Community 4 - "Process Safety Rules"
Cohesion: 0.67
Nodes (4): CLAUDE.md, MISSION.md, process safety rules, protected files

## Ambiguous Edges - Review These
- `ES5 compliance checker` → `allowed evolutions`  [AMBIGUOUS]
  scripts/es5-check.js · relation: conceptually_related_to

## Knowledge Gaps
- **10 isolated node(s):** `src/index.js`, `forbidden ES6+ tokens`, `index.js`, `MISSION.md`, `GUARDRAILS.md` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ES5 compliance checker` and `allowed evolutions`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `ES5 compliance checker` connect `ES5 Compliance Gate` to `ES5 Code Conventions`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `ES5 language surface only` connect `ES5 Code Conventions` to `ES5 Compliance Gate`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `src/index.js`, `forbidden ES6+ tokens`, `index.js` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._