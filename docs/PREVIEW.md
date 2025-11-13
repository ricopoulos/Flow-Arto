# Flow-Arto Preview URLs

This document tracks all live preview URLs for Flow-Arto projects deployed on GitHub Pages.

**GitHub Pages Base URL**: https://ricopoulos.github.io/Flow-Arto/

---

## Current Projects

### Preview Hub (Main Page)
- **URL**: https://ricopoulos.github.io/Flow-Arto/
- **Source**: `/index.html`
- **Purpose**: Central hub listing all project previews
- **Status**: Live
- **Last Updated**: 2025-11-13

### Carlton Select
- **URL**: https://ricopoulos.github.io/Flow-Arto/web/carlton-select/
- **Source**: `/web/carlton-select/index.html`
- **Purpose**: Luxury real estate micro-landing page
- **Brand**: Luxury Real Estate (navy, gold, champagne)
- **Status**: Testing
- **Last Updated**: 2025-11-12

### Flow Studio
- **URL**: https://ricopoulos.github.io/Flow-Arto/web/flow-studio/
- **Source**: `/web/flow-studio/index.html`
- **Purpose**: Flow Studio platform landing page (token-driven design system demo)
- **Brand**: Technical Elegance (slate, blue)
- **Status**: In Development
- **Last Updated**: 2025-11-13

---

## URL Structure Standard

All site outputs follow this structure:

```
/web/<project-slug>/
  ├── index.html      (main page)
  ├── styles.css      (if separate stylesheet)
  └── assets/         (if needed: images, fonts, etc.)
```

**Preview URL Pattern**: `https://ricopoulos.github.io/Flow-Arto/web/<project-slug>/`

---

## Adding New Projects

When creating a new project:

1. Create directory: `/web/<project-slug>/`
2. Add `index.html` (and `styles.css` if needed)
3. Test locally
4. Commit and push to branch
5. Merge to main for GitHub Pages deployment
6. Update this document with the new preview URL
7. Update root `/index.html` preview hub with project card

---

## Notes

- **GitHub Pages Configuration**: Do NOT modify repository settings. Pages deploy from the main branch automatically.
- **Branch Previews**: Feature branches are not auto-deployed. Test locally or merge to main.
- **Cache**: GitHub Pages may cache for a few minutes. Hard refresh (Ctrl+Shift+R) if needed.
- **HTTPS**: All URLs use HTTPS by default.

---

**Last Updated**: 2025-11-13
