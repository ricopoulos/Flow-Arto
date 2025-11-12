# Flow Studio Bootstrap Guide

Welcome to **Flow Studio** — a natural-language design composer that runs entirely in Claude Code Web.

---

## 🚀 Quick Start

### First Time Setup
1. Open this repository in **Claude Code Web**
2. Ensure you have read access to `FLOW_STUDIO_SPEC.md`
3. All agents and workflows are pre-configured in `.claude/agents/`

### Running a Design Flow
Simply ask Claude:
```
"Create a landing page for [your product/service].
Target audience: [description]
Tone: [professional/friendly/medical/etc]"
```

Claude will orchestrate the flow through all agents automatically.

---

## 📁 Repository Structure

```
Flow-Arto/
├── .claude/
│   ├── agents/
│   │   ├── arto-ui-ux-strategist.md      ← Layout & UX design
│   │   ├── stylist-design-polish.md      ← Design tokens & polish
│   │   ├── builder-components.md         ← HTML/CSS implementation
│   │   └── curator-evaluator.md          ← Evaluation & rationale
│   └── BOOTSTRAP.md                       ← This file
├── docs/
│   └── STYLEGUIDE-UI.md                   ← Brand & design system
├── design/
│   ├── layout.md                          ← Generated layout structure
│   ├── tokens.json                        ← Generated design tokens
│   └── rationale.md                       ← Generated design rationale
├── web/
│   └── mock/
│       ├── index.html                     ← Generated HTML mock
│       └── styles.css                     ← Generated CSS
├── FLOW_STUDIO_SPEC.md                    ← Master specification
└── README.md
```

---

## 🤖 Agent Roles

### 1. Arto (UI/UX Strategist)
- **Input:** User intent, target audience, tone
- **Output:** `design/layout.md` with structure and content hierarchy
- **Reads:** `docs/STYLEGUIDE-UI.md`

### 2. Stylist (Design Polish)
- **Input:** Layout requirements, brand guidelines
- **Output:** `design/tokens.json` with colors, typography, spacing
- **Validates:** Accessibility contrast ratios

### 3. Builder (Components/HTML)
- **Input:** Layout + Design tokens
- **Output:** `web/mock/index.html` and `styles.css`
- **Uses:** Vanilla HTML/CSS or Tailwind CDN

### 4. Curator (Evaluator)
- **Input:** All generated artifacts
- **Output:** `design/rationale.md` with evaluation and next steps
- **Reviews:** Consistency, accessibility, best practices

---

## 🎯 Workflow Phases

### Phase 1: Discovery
Claude will ask clarifying questions about:
- Target audience
- Key messages
- Desired actions (CTAs)
- Tone and brand feel

### Phase 2: Structure (Arto)
Arto creates the layout blueprint:
- Section hierarchy
- Content blocks
- Navigation structure
- Copy hooks

**🚦 GATE:** Review and approve layout before continuing

### Phase 3: Style (Stylist)
Stylist generates design tokens:
- Color palette
- Typography scale
- Spacing system
- Component styles

**🚦 GATE:** Review and approve tokens before continuing

### Phase 4: Build (Builder)
Builder creates working prototype:
- Semantic HTML5
- Responsive CSS
- Accessible markup
- Mobile-first approach

**🚦 GATE:** Review and approve implementation before continuing

### Phase 5: Evaluate (Curator)
Curator provides final assessment:
- Design consistency check
- Accessibility audit
- Improvement suggestions
- Next-step recommendations

**🚦 GATE:** Final review and approval

---

## 🌐 Environment Constraints

### What's Allowed
✅ Vanilla HTML/CSS
✅ Tailwind CDN (no build step)
✅ Google Fonts CDN
✅ Static assets (images via CDN links)
✅ Playwright MCP for screenshots (optional, ≤3 per session)

### What's NOT Allowed (without approval)
❌ npm packages requiring installation
❌ Build tools (Webpack, Vite, etc.)
❌ Heavy JavaScript frameworks (React, Vue, Svelte)
❌ Backend or API integration
❌ CI/CD pipelines

---

## 🎨 Design System

All designs follow the brand guidelines in `docs/STYLEGUIDE-UI.md`:

**Key Principles:**
- **Aesthetic:** Elegant, premium-medical
- **Accessibility:** WCAG AA minimum (AAA for body text)
- **Typography:** Playfair Display + Inter
- **Colors:** `#2B6CB0` (primary), `#B7791F` (accent)
- **Spacing:** 4px base scale

---

## 📸 Screenshot Policy (Playwright MCP)

When using Playwright for visual QA:
- **Format:** JPEG only
- **Quality:** ~60
- **Max dimensions:** 1200×800px
- **Limit:** ≤3 screenshots per design mission
- **Storage:** Save file path only, never inline base64

**Example usage:**
```
"Take a screenshot of the generated page at 1200px width"
```

---

## ✅ Quality Checklist

Before considering a design complete:
- [ ] Layout reviewed and approved at Gate 2
- [ ] Design tokens reviewed and approved at Gate 3
- [ ] HTML/CSS implementation reviewed and approved at Gate 4
- [ ] All text contrast ratios meet WCAG standards
- [ ] Responsive breakpoints tested (mobile/tablet/desktop)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text provided for images
- [ ] Semantic HTML used throughout
- [ ] No console errors or warnings
- [ ] Rationale document explains all design choices

---

## 🛠️ Common Commands

### View Generated Design
Open `web/mock/index.html` in a browser or use:
```
"Open the mock in Playwright and take a screenshot"
```

### Iterate on Design
```
"Adjust the color scheme to be warmer"
"Make the hero section more prominent"
"Improve mobile spacing in the footer"
```

### Export Design Tokens
Tokens are already in JSON format at `design/tokens.json`. To use in CSS:
```css
@import url('design/tokens.json');
```

Or manually copy values to CSS custom properties.

---

## 🐛 Troubleshooting

### "Cannot find STYLEGUIDE-UI.md"
Ensure `docs/STYLEGUIDE-UI.md` exists. Arto agent requires this file.

### "Design tokens validation failed"
Check contrast ratios in `design/tokens.json`. Body text needs ≥7:1, buttons ≥4.5:1.

### "Screenshot failed"
Verify Playwright MCP is available. Try: `browser_navigate` to a simple URL first.

### "HTML not rendering correctly"
Check `web/mock/index.html` for:
- Missing closing tags
- Incorrect CSS paths
- Tailwind CDN link (if used)

---

## 📚 Reference Documents

- **Master Spec:** `FLOW_STUDIO_SPEC.md`
- **Style Guide:** `docs/STYLEGUIDE-UI.md`
- **Agent Definitions:** `.claude/agents/*.md`
- **Generated Artifacts:** `design/` and `web/mock/`

---

## 🎓 Example Sessions

### Example 1: Healthcare Landing Page
```
User: "Create a landing page for a telemedicine app.
       Target: busy professionals aged 30-50.
       Tone: trustworthy and efficient."

Claude: [Runs full flow, creates layout → tokens → HTML/CSS → rationale]
```

### Example 2: Iterate on Existing Design
```
User: "Make the CTA buttons more prominent and adjust
       the color scheme to be slightly warmer."

Claude: [Updates tokens and rebuilds affected components]
```

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-12 | Initial bootstrap setup |

---

## 💡 Pro Tips

1. **Be specific:** The more detail you provide about audience and goals, the better the output
2. **Review at gates:** Don't skip the review gates — they ensure quality
3. **Iterate freely:** You can always ask for adjustments after any phase
4. **Reference the style guide:** All designs inherit from `STYLEGUIDE-UI.md`
5. **Test accessibility:** Use browser dev tools to verify contrast and keyboard nav

---

**Ready to create beautiful, accessible landing pages with natural language? Let's go! 🚀**
