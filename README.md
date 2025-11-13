# Flow Studio

**Intelligent design tool for systematic, brand-aware web projects**

Flow Studio is a development platform using AI design agents to create web projects from brand configs and design tokens. Built for designers and developers who value systematic design over magic templates.

---

## What is Flow Studio?

Flow Studio uses specialized AI agents that work together to transform brand definitions into production-ready web experiences:

- **Arto** - UX Strategist: Layout, hierarchy, information architecture
- **Stylist** - Design System: Generates design tokens from brand configs
- **Builder** - Implementation: Semantic HTML, accessible components
- **Curator** - QA: Brand alignment, accessibility, consistency checks
- **Maestro** - Orchestration: Coordinates workflow and refinement

### Philosophy

**Systematic, not magical.** Every design decision is traceable to a brand config or design token. No hardcoded values, no black-box generation, no "AI made this look weird and I don't know why."

---

## Repository Structure

```
flow-studio/
├── index.html                    # Development progress hub
├── docs/
│   └── PREVIEW.md               # Live URL documentation
├── design/
│   └── tokens.*.json            # Design token definitions
├── brands/
│   └── *.brand.json             # Brand configuration files
├── components/
│   └── *.component.json         # Reusable component specs
├── curator/
│   └── evaluation rules         # QA and validation
└── web/                         # Live project outputs
    ├── flow-studio/             # Flow Studio platform landing page
    └── carlton-select/          # Example: Luxury real estate project
```

---

## Current Projects

### Flow Studio Landing Page
**Path**: `/web/flow-studio/`
**URL**: https://ricopoulos.github.io/flow-studio/web/flow-studio/
**Status**: In Development

The platform's own landing page. Demonstrates:
- 100% token-driven CSS (no hardcoded values)
- WCAG AAA accessibility (7:1+ contrast ratios)
- Semantic HTML with proper ARIA
- Fully responsive design (375px → desktop)

### Carlton Select
**Path**: `/web/carlton-select/`
**URL**: https://ricopoulos.github.io/flow-studio/web/carlton-select/
**Status**: Complete

Luxury real estate micro-landing page showcasing the Flow Studio approach with a navy/gold/champagne palette.

---

## Design Token System

Flow Studio projects are built from design tokens, not arbitrary CSS:

**`design/tokens.flow-studio.json`** defines:
- **Colors**: Primary (slate), accent (blue), neutral (stone), semantic
- **Typography**: Inter font system, type scale, line heights, letter spacing
- **Spacing**: 4px base scale with component-specific values
- **Shadows**: Elevation system with focus states
- **Motion**: Duration and easing curves
- **Components**: Pre-defined button, input, card specs

All color pairings are validated for WCAG AAA contrast (7:1+).

---

## Getting Started

### Prerequisites
- Node.js (if using build tools)
- Git
- A text editor or IDE

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ricopoulos/flow-studio.git
   cd flow-studio
   ```

2. **Open projects locally**
   - Main hub: `index.html`
   - Projects: `web/flow-studio/index.html`, `web/carlton-select/index.html`

3. **Create a new project**
   ```bash
   mkdir web/new-project
   # Add index.html and styles.css
   ```

### Deployment

Projects deploy via **GitHub Pages** from the `main` branch:
- Merge to main → Automatic deployment
- Live at: `https://ricopoulos.github.io/flow-studio/`

---

## Workflow

### Adding a New Project

1. **Define the brand** (in `/brands/<project>.brand.json`)
2. **Generate design tokens** (in `/design/tokens.<project>.json`)
3. **Build the project** (in `/web/<project-slug>/`)
   - Create `index.html`
   - Create `styles.css` (token-driven)
4. **Run Curator QA**
   - Verify token usage (no hardcoded values)
   - Check accessibility (contrast, semantic HTML, ARIA)
   - Test responsive design
5. **Update hub page** (`/index.html`) with project card
6. **Update docs** (`/docs/PREVIEW.md`) with live URL
7. **Merge to main** for deployment

---

## Quality Standards

### Token Usage
- ✅ All colors use CSS variables
- ✅ All spacing uses CSS variables
- ✅ All typography uses CSS variables
- ❌ No hardcoded hex values outside `:root`

### Accessibility
- ✅ WCAG AAA contrast (7:1+) for all text
- ✅ Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`)
- ✅ ARIA labels where needed
- ✅ Keyboard navigation with visible focus states
- ✅ 44px minimum touch targets
- ✅ `prefers-reduced-motion` support

### Responsive Design
- ✅ Mobile-first approach (375px base)
- ✅ Tablet breakpoint (≥640px)
- ✅ Desktop breakpoint (≥1024px)
- ✅ No layout breaks at any width

---

## Documentation

- **PREVIEW.md**: Canonical source for all live URLs
- **claude.md**: Session context for AI development
- **FLOW_STUDIO_SPEC.md**: Original platform specification

---

## Tech Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Token-driven design system with CSS variables
- **JavaScript**: Minimal (only where needed)
- **Fonts**: Google Fonts (Inter, Playfair Display, etc.)
- **Hosting**: GitHub Pages
- **Deployment**: Automatic from main branch

---

## Development Principles

1. **Systematic over magical**: Every decision traceable to config/tokens
2. **Token-driven**: No hardcoded values
3. **Accessibility first**: WCAG AAA by default
4. **Performance**: Minimal dependencies, fast load times
5. **Maintainable**: Clear structure, documented decisions
6. **Iterative**: Curator feedback → refinement loop

---

## License

Private development project. Not yet open source.

---

## Contact

For questions or collaboration: [Your contact info]

---

**Built with systematic design, not magic.**
