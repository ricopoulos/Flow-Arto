# Flow Studio - Claude Session Context

## Repository Identity

**Important: This repository was renamed from "Flow-Arto" to "flow-studio" on 2025-11-13**

### What is Flow Studio?

**Flow Studio** is an intelligent design tool/platform being developed to create systematic, brand-aware web projects using AI design agents.

- **Repository Purpose**: Development workspace for Flow Studio and all projects built with it
- **Main Page Purpose**: Development progress monitor (not public showcase) - tracks all active projects
- **Target Use**: Build client projects with systematic design approach

### Design Philosophy

Flow Studio uses specialized AI agents working from brand configs and design tokens:
- **Arto**: UX Strategist (layout & hierarchy)
- **Stylist**: Design tokens & visual coherence
- **Builder**: Semantic HTML & component implementation
- **Curator**: QA, accessibility, brand alignment
- **Maestro**: Workflow orchestration

---

## Repository Structure

```
flow-studio/                              (renamed from Flow-Arto)
├── index.html                            ← Hub page (dev progress monitor)
├── docs/
│   └── PREVIEW.md                        ← Live URL documentation
├── design/
│   └── tokens.flow-studio.json           ← Design tokens for Flow Studio brand
├── brands/                               ← Brand configs for different projects
├── components/                           ← Reusable component specs
├── curator/                              ← QA and evaluation tools
└── web/                                  ← Live project outputs
    ├── flow-studio/                      ← Flow Studio platform landing page
    │   ├── index.html
    │   └── styles.css
    └── carlton-select/                   ← Example client project (luxury real estate)
        └── index.html
```

---

## GitHub Pages URLs (After Rename)

**Base URL**: `https://ricopoulos.github.io/flow-studio/`

### Projects
- **Hub/Monitor**: `https://ricopoulos.github.io/flow-studio/`
- **Flow Studio Landing**: `https://ricopoulos.github.io/flow-studio/web/flow-studio/`
- **Carlton Select**: `https://ricopoulos.github.io/flow-studio/web/carlton-select/`

### URL Pattern for New Projects
`https://ricopoulos.github.io/flow-studio/web/<project-slug>/`

---

## Current Development Status (as of 2025-11-13)

### ✅ Completed
1. **Flow Studio Landing Page** (`/web/flow-studio/`)
   - Token-driven design system (100% CSS variables)
   - WCAG AAA accessibility (all contrasts 7:1+)
   - Semantic HTML with proper ARIA
   - Fully responsive (375px → desktop)
   - Latest fix: Replaced hardcoded shadow with `--shadow-focus-subtle` token

2. **Carlton Select** (`/web/carlton-select/`)
   - Luxury real estate micro-landing page
   - Navy, gold, champagne palette
   - Completed and live

3. **Design Token System**
   - `design/tokens.flow-studio.json` fully documented
   - Colors, typography, spacing, shadows, motion
   - All contrast ratios validated (WCAG AAA)

---

## Working with Claude on This Project

### Key Principles
1. **Token-driven everything**: No hardcoded colors, spacing, or typography
2. **Accessibility first**: WCAG AAA contrast (7:1+), semantic HTML, keyboard nav
3. **Systematic approach**: Every design decision traceable to tokens/brand config
4. **Documentation**: Keep PREVIEW.md and claude.md current

### Typical Workflow
1. Define/update brand config (in `/brands/`)
2. Generate/refine tokens (in `/design/`)
3. Build project (in `/web/<project-slug>/`)
4. Run Curator QA
5. Update hub page (`/index.html`) with new project card
6. Update PREVIEW.md with live URL
7. Merge to main for GitHub Pages deployment

### Important Files to Know
- **PREVIEW.md**: Canonical source for all live URLs
- **tokens.flow-studio.json**: Complete design token system
- **FLOW_STUDIO_SPEC.md**: Original platform specification
- **claude.md** (this file): Session context and history

---

## Recent Changes (Session 2025-11-13)

### QA & Refinements Completed
- Comprehensive QA of Flow Studio landing page
- Fixed hardcoded shadow value in form input focus state
- Added `--shadow-focus-subtle` token for consistency
- Verified: URLs, assets, token usage, responsive design, accessibility, semantic HTML
- All checks passed ✅

### Repository Rename Decision
- **Old name**: Flow-Arto (confusing - sounded like the project name)
- **New name**: flow-studio (clear - this is the tool/platform workspace)
- **Reason**: Clean foundations, clarity for future development
- **Status**: User will rename on GitHub, then restart session with path fixes

---

## Development Branch Pattern

All development should happen on branches following this pattern:
- Branch name: `claude/<description>-<sessionId>`
- Example: `claude/fix-token-system-011CV65kCFH7T2w2fqmhJJbd`
- Push to feature branch, then create PR to merge to main
- Main branch deploys to GitHub Pages automatically

---

**Last Updated**: 2025-11-13
**Status**: Repository renamed and all URLs updated successfully
