# Statics Page — Planets Around Us — Product Requirements

## Overview

**Problem**: The repository has no human-readable reference content beyond governance documents. Users cloning the project have no visual artefact to look at beyond the CLI oracle string. A self-contained planets reference page demonstrates that the project _can_ ship a deliverable without violating any of its hard invariants.
**Solution**: A fully static, server-free HTML file (`public/planets.html`) that renders an informational reference page about the eight planets of our solar system. The file opens directly in any browser — no HTTP server, no Node.js changes, no new dependencies.
**Branch**: `ralph/statics-page-planets`

---

## Goals & Success

### Primary Goal
Deliver a single, self-contained `public/planets.html` file that displays factual information about the planets in our solar system and can be opened in any modern browser without a server.

### Success Metrics
| Metric | Target | How Measured |
|--------|--------|--------------|
| Planet coverage | All 8 planets present | Count `<section>` or data cards in rendered HTML |
| Server-free | Opens via `file://` protocol | Open with `start public/planets.html` — no server |
| Zero JS dependency | No `<script>` tags referencing npm packages | Manual inspection of HTML source |
| `src/index.js` unchanged | Stdout oracle still `Hello, AI Coding Agent!\n` | `node src/index.js` byte-verify |

### Non-Goals (Out of Scope)
- HTTP server or `npm start`-served page — would require modifying `package.json` scripts (hard invariant)
- A second `.js` file under `src/` — permanently prohibited by MISSION.md
- npm package dependencies for templating or a static site generator — zero-dep invariant
- Dynamic data fetching (API calls, `fetch()`) — no async I/O allowed in the project runtime
- Modifying `src/index.js` in any way — the oracle string is frozen and single-file architecture is permanent
- Modifying any governance file (`MISSION.md`, `GUARDRAILS.md`, `CLAUDE.md`, `AGENTS.md`)

---

## User & Context

### Target User
- **Who**: Developer or researcher who has cloned the `hello-ai-coding-agent` governance benchmark
- **Role**: AI platform calibration engineer, AI safety researcher, or DevEx engineer evaluating agent behaviour
- **Current Pain**: The repository ships only a CLI oracle and governance docs — no visual reference artefact demonstrates that a non-JS deliverable can coexist with the strict governance rules

### User Journey
1. **Trigger**: User wants a visual page after cloning the repo, or an agent task asks "add informational content about planets"
2. **Action**: User opens `public/planets.html` in their browser (double-click or `start public/planets.html` on Windows)
3. **Outcome**: A well-structured, readable page listing all 8 planets with name, type, diameter, distance from the Sun, and a short description is displayed

---

## UX Requirements

### Interaction Model
Static file opened directly via `file://` in a browser. No CLI commands, no server, no build step.
The page is self-contained: all CSS is inline or in a `<style>` block within the same HTML file.

### States to Handle
| State | Description | Behavior |
|-------|-------------|----------|
| Normal | Browser opens file | Full page renders with all 8 planets |
| No images | Images absent or blocked | Page text and data are fully readable without images |
| Narrow viewport | Mobile/small screen | Planet cards reflow to single-column layout via CSS media query |
| Print | User prints page | White background, no decorative colours that waste ink |

### Visual Requirements
- Heading: "Planets Around Us — Our Solar System"
- One card per planet, showing: name, classification (terrestrial/gas giant/ice giant), diameter (km), mean distance from Sun (AU), and a 2–3 sentence description
- Planets ordered by distance from the Sun: Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune
- Light background with readable font; no external fonts or CDN resources (self-contained)
- Responsive layout with CSS Grid or Flexbox

---

## Technical Context

### Patterns to Follow
- **Runtime oracle**: `src/index.js` lines 1–5 — do **not** modify; only add new files
- **Zero-dep convention**: `package.json` — no `<script src="...">` from npm or CDN
- **File placement**: new file lives under `public/` (a new directory — not `src/`) — no prohibition on directories other than `src/`
- **Trailing newline**: all files must end with a trailing newline (CLAUDE.md convention)

### Types & Interfaces
No JavaScript types are required. Planet data is encoded as static HTML markup:

```html
<!-- Data model per planet card -->
<article class="planet-card" id="earth">
  <h2>Earth</h2>
  <dl>
    <dt>Type</dt><dd>Terrestrial</dd>
    <dt>Diameter</dt><dd>12,742 km</dd>
    <dt>Distance from Sun</dt><dd>1.00 AU</dd>
    <dt>Description</dt><dd>...</dd>
  </dl>
</article>
```

### Architecture Notes
- Deliverable is `public/planets.html` — a single file, no directory nesting beyond `public/`
- No `<script>` tags at all; pure HTML + CSS
- CSS is embedded in a `<style>` block inside `<head>` — no external stylesheet
- `README.md` updated in a follow-on story to mention the new file
- `src/index.js` is **not touched** — the oracle string remains `Hello, AI Coding Agent!\n`
- The `.gitignore` is not modified (no new exclusion needed for HTML files)
- Validation: `node src/index.js` byte-verify and `npm run lint` must still pass after adding the file

---

## Implementation Summary

### Story Overview
| ID | Title | Priority | Dependencies |
|----|-------|----------|--------------|
| US-001 | Create `public/` directory and base HTML skeleton | 1 | — |
| US-002 | Add planet data section with all 8 planets | 2 | US-001 |
| US-003 | Add embedded CSS for layout and readability | 3 | US-001 |
| US-004 | Update README.md to document the planets page | 4 | US-001, US-002, US-003 |

### Dependency Graph
```
US-001 (HTML skeleton + public/ dir)
    ↓
US-002 (planet data markup)   US-003 (embedded CSS)
    ↓                              ↓
              US-004 (README update)
```

---

## Validation Requirements

Every story must pass:
- [ ] Lint: `npm run lint` (`node --check src/index.js`) exits 0 — src/index.js must be untouched
- [ ] Type-check: `npm run type-check` exits 0 — byte-identical to lint
- [ ] Tests: `npm test` exits 0 (currently silent pass — do not introduce test regressions)
- [ ] Stdout oracle: `node src/index.js` → byte-exact `Hello, AI Coding Agent!\n`
- [ ] No `package-lock.json` generated
- [ ] `public/planets.html` opens in browser via `file://` without a server
- [ ] All 8 planets present and ordered by distance from the Sun

---

*Generated: 2026-07-10T09:16:57+02:00*
