# Planets Static Page — Product Requirements

## Overview

**Problem**: Users have no way to view educational content about planets from within
or alongside this project. There is currently no static reference page explaining the
planets of our solar system.

**Solution**: A standalone static HTML page (`planets.html`) at the project root that
presents factual content about the planets in our solar system — readable in any browser
without a server, requiring zero runtime dependencies.

**Branch**: `ralph/planets-static-page`

> ⚠️ **Scope Conflict Notice**: This feature requires human authorisation before
> implementation. The current project governance (`MISSION.md`) explicitly classifies
> this project as "intentionally feature-free at the application layer" and lists
> "Any change to runtime behaviour" and web server / HTML artefacts as out-of-scope.
> Placing `planets.html` at the **project root** (not under `src/`) avoids violating
> the single-file `src/` architecture rule, but still constitutes a scope expansion
> beyond the current mission definition. A human PR review explicitly authorising this
> scope expansion is required before any story may be implemented.

---

## Goals & Success

### Primary Goal

Provide a zero-dependency, browser-openable static HTML reference page that explains
the 8 planets of our solar system with key facts (name, type, distance from Sun,
notable characteristics).

### Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Page opens in browser | Opens correctly with no console errors | Manual: `open planets.html` |
| Planet data completeness | All 8 planets present with ≥3 facts each | Manual inspection |
| Zero runtime deps | No `<script src="...">`, no CDN links | Manual HTML review |
| Lint gate still passes | `npm run lint` exits 0 unchanged | CI / `npm run lint` |
| Stdout oracle unchanged | `node src/index.js` still outputs exactly `Hello, AI Coding Agent!\n` | `node src/index.js \| xxd` |

### Non-Goals (Out of Scope)

- **HTTP server** — no `http.createServer`, no `npm start` changes; file opened directly
- **Interactive features** — no JavaScript, no animations, no search/filter
- **Modifying `src/index.js`** — the stdout oracle must remain byte-exact and untouched
- **npm dependencies** — zero new packages; HTML + inline CSS only
- **Second `.js` file under `src/`** — architecture constraint remains intact
- **CI/CD or build pipeline** — static file, no compilation step

---

## User & Context

### Target User

- **Who**: Developers, researchers, or educators evaluating this benchmark project
- **Role**: Someone who has cloned the repository and wants supplementary educational
  content provided alongside it
- **Current Pain**: No reference documentation about planets exists; they must look
  elsewhere for content

### User Journey

1. **Trigger**: User opens the project directory and wants to view planet information
2. **Action**: User opens `planets.html` directly in a browser (`open planets.html`
   on macOS/Linux, double-click on Windows) — no server required
3. **Outcome**: A readable, well-structured static page with all 8 solar system planets,
   key facts, and educational content

---

## UX Requirements

### Interaction Model

- **Delivery**: Static HTML file at project root — `planets.html`
- **Access**: File opened directly in browser (no server, no npm script)
- **Structure**: Single HTML file with inline `<style>` block; no external dependencies

### States to Handle

| State | Description | Behavior |
|-------|-------------|----------|
| Nominal | Browser opens file | Page renders with planet grid/list |
| No browser | User views raw HTML | Content readable as plain text in terminal |
| Missing file | File not present | N/A — file is static; cannot be "missing" once committed |
| JS disabled | User has JS off | Full content still visible — zero JavaScript required |

### Visual Layout (Minimal)

- `<h1>` title: "Planets of Our Solar System"
- One section per planet: name as heading, facts as a definition list or `<ul>`
- Inline CSS only — no external stylesheet, no CDN fonts
- Accessible colour contrast; no images (zero binary assets)

---

## Technical Context

### Patterns to Follow

- **Runtime entry point**: `src/index.js` (lines 1–5) — **do not touch**; this file is the
  byte-stable oracle and is immutable in structure
- **No module system**: `src/index.js` has zero `require`/`import`; the new HTML file has
  zero `<script>` tags by design
- **ES5 compliance**: Only applies to `.js` files; HTML/CSS have no ES5 constraint
- **Naming convention**: lowercase filename — `planets.html` (matches `index.js` convention)
- **No lockfile**: `npm install --no-package-lock` must still be used; this HTML file has
  no effect on npm

### Types & Interfaces

```
Not applicable — this is a pure static HTML file with no JavaScript or TypeScript.
Planet data is embedded as HTML markup only.
```

### Architecture Notes

- File lives at **project root** (`./planets.html`), not under `src/` — this is the only
  placement that avoids violating the single-file `src/` architecture invariant
- Zero runtime coupling to `src/index.js` — the two files are completely independent
- `npm run lint` (`node --check src/index.js`) is unaffected by the HTML file
- `npm test` (`node --test`) will not discover `planets.html` — no test changes needed
- `.gitignore` does not exclude `.html` files at root — no `.gitignore` changes needed

### Governance Blockers (Must Resolve Before Implementation)

| Rule | Source | Impact |
|------|--------|--------|
| Project is "intentionally feature-free at the application layer" | `MISSION.md` §"Who It's For" | Requires human scope expansion authorisation |
| "Not an application scaffold or starter template" | `MISSION.md` §"Non-Goals" | Same as above |
| Any PR requires human review for scope changes | `GUARDRAILS.md` §7 Escalation | Human PR approval gate |

---

## Implementation Summary

### Story Overview

| ID | Title | Priority | Dependencies |
|----|-------|----------|--------------|
| US-001 | Define planet data as HTML content | 1 | — |
| US-002 | Create styled planets.html static page | 2 | US-001 |
| US-003 | Validate governance gates post-addition | 3 | US-002 |

### Dependency Graph

```
US-001 (planet content authoring)
    ↓
US-002 (HTML file creation with inline CSS)
    ↓
US-003 (validation: lint + oracle + manual review)
```

---

## Validation Requirements

Every story must pass:

- [ ] Stdout oracle: `node src/index.js` → exactly `Hello, AI Coding Agent!\n` (unchanged)
- [ ] Lint: `npm run lint` exits 0 (unchanged — `node --check src/index.js`)
- [ ] Type-check: `npm run type-check` exits 0 (unchanged)
- [ ] Tests: `npm test` exits 0 (unchanged — no new `.test.js` files added)
- [ ] No `package-lock.json` generated
- [ ] `src/index.js` untouched — blank line between `}` and `main();` preserved
- [ ] `planets.html` opens in browser with zero console errors
- [ ] `planets.html` contains all 8 solar system planets

---

*Generated: 2026-07-10T09:47:45.968+02:00*
