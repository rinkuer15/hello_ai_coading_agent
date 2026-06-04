# Landing Page — Product Requirements

## Overview

**Problem**: Running `npm start` outputs only `Hello, AI Coding Agent!` — a bare string that gives users (and AI agents arriving at the repo for the first time) no orientation about what the project is, what commands are available, or how to extend it. First contact with the repo is a dead end.
**Solution**: Replace the bare `console.log` with a structured, multi-line ASCII landing page rendered to stdout — a "welcome screen" that surfaces project identity, available npm commands, and the extend-me invitation — all within the existing `main()` orchestrator and zero new dependencies.
**Branch**: `ralph/landing-page`

---

## Goals & Success

### Primary Goal
When a user or AI agent runs `npm start`, they see a self-describing landing page that tells them the project name, its purpose, available commands, and where to start extending it — without reading any external docs.

### Success Metrics
| Metric | Target | How Measured |
|--------|--------|--------------|
| `npm start` exit code | 0 | `echo $?` after run |
| Landing page renders | All sections visible | Manual / test assertion on stdout |
| `npm run lint` passes | 0 syntax errors | `node --check src/index.js` |
| `npm test` discovers and passes tests | ≥ 1 test file executed | `node --test` output |

### Non-Goals (Out of Scope)
- Interactive menus or prompts — this is a read-only informational display
- Colour/ANSI escape codes — keep output plain-text for maximum terminal compatibility
- Reading from a config file or environment variables — all content is hardcoded constants
- HTTP server, web browser landing page — this is strictly CLI stdout

---

## User & Context

### Target User
- **Who**: AI coding agents and developers first cloning or running the scaffold
- **Role**: Experimenter evaluating the repo as a test substrate for AI tooling
- **Current Pain**: `npm start` outputs a single opaque line with no context; the user must read README/MISSION.md to understand what to do next

### User Journey
1. **Trigger**: User clones the repo and runs `npm start` (or an AI agent executes the entry point)
2. **Action**: Node runs `src/index.js`, `main()` is invoked
3. **Outcome**: A formatted landing page prints to stdout; the user knows the project name, purpose, and the four npm commands available, then exits cleanly with code 0

---

## UX Requirements

### Interaction Model
Stdout-only CLI output. No stdin, no flags, no prompts. Single invocation: `node src/index.js`.

### Landing Page Content (all sections required)
```
========================================
  Hello, AI Coding Agent!
  A minimal scaffold for AI experiments
========================================

  Commands:
    npm start        Run the application
    npm test         Run tests (node --test)
    npm run lint     Syntax check
    npm run type-check  Syntax check

  Extend me:
    Add functions to src/index.js
    Co-locate tests in src/*.test.js

========================================
```

### States to Handle
| State | Description | Behavior |
|-------|-------------|----------|
| Normal run | Standard `npm start` | Print landing page, exit 0 |
| No edge cases | Pure stdout, no I/O | N/A — no error states possible |

---

## Technical Context

### Patterns to Follow
- **Entry point**: `src/index.js` lines 1–5 — all logic lives inside `main()`, invoked at bottom of file
- **Output**: `console.log()` — established output mechanism; use multiple calls or a single multi-line template literal
- **Test pattern**: `src/*.test.js` — Node.js built-in `node --test` runner; use `assert` from `node:assert`; no external test libraries

### Types & Interfaces
```javascript
// No types in use — plain JavaScript (no TypeScript, no JSDoc required for trivial functions)
// New helper function signature (optional extraction):
// function renderLandingPage() { /* returns void, writes to stdout */ }
```

### Architecture Notes
- All new logic must be called from `main()` — do not execute at module top level
- No module system (`require`/`import`) exists yet; do NOT introduce one for this feature — all code stays in `src/index.js`
- No new dependencies — `console.log` + string literals are sufficient
- If a `renderLandingPage()` helper is extracted, it must be declared as a named `function` (hoisted declaration style matches existing `main()`)
- Test file: `src/index.test.js` — use Node.js built-in `node:assert` and `node:test`

---

## Implementation Summary

### Story Overview
| ID | Title | Priority | Dependencies |
|----|-------|----------|--------------|
| US-001 | Implementing landing page output | 1 | — |
| US-002 | Writing landing page tests | 2 | US-001 |

### Dependency Graph
```
US-001 (landing page implementation)
    ↓
US-002 (tests)
```

---

## Validation Requirements

Every story must pass:
- [ ] Lint: `npm run lint` (node --check src/index.js) exits 0
- [ ] Type-check: `npm run type-check` exits 0
- [ ] Tests: `npm test` exits 0 AND discovers ≥ 1 test file
- [ ] Start: `npm start` prints the landing page and exits 0

---

*Generated: 2026-06-04T15:01:28.792+02:00*
