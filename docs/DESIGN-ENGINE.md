# Flow Studio – Design Engine

## 🎯 Purpose
The **Design Engine** is Flow Studio's systematic approach to generating consistent, accessible, and elegant design outputs. This document defines the core design tokens, principles, and rules that power all generated artifacts.

---

## 🧩 Design System Architecture

### Token-First Philosophy
All design decisions flow from a foundational token system:
- **Colors** → Palette with semantic roles
- **Typography** → Scale, families, and rhythm
- **Spacing** → 4px base scale for consistency
- **Elevation** → Shadows for depth and hierarchy
- **Radii** → Border radius system for component styling

### Design Principles
1. **Systematic:** Every value derives from the token system
2. **Accessible:** WCAG AAA for body text, AA for interactive elements
3. **Responsive:** Mobile-first, gracefully scaling to desktop
4. **Elegant:** Premium-medical aesthetic with balanced whitespace
5. **Trustworthy:** Professional tone with clear hierarchy

---

## 🎨 Core Design Tokens

### Color System

#### Brand Colors
| Token | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| `primary` | `#2B6CB0` | Trust & action | CTA buttons, links, focus states |
| `accent` | `#B7791F` | Warmth & emphasis | Highlights, secondary CTAs, premium elements |

#### Neutral Scale
| Token | Hex | Purpose |
|-------|-----|---------|
| `neutral-900` | `#0A0A0A` | High emphasis | Headings, critical text |
| `neutral-700` | `#333333` | Medium emphasis | Body text, paragraphs |
| `neutral-500` | `#6B7280` | Low emphasis | Secondary text, labels |
| `neutral-300` | `#D1D5DB` | Borders | Dividers, input borders |
| `neutral-100` | `#F3F4F6` | Subtle backgrounds | Alternate sections |

#### Surface Colors
| Token | Hex | Purpose |
|-------|-----|---------|
| `surface-base` | `#FFFFFF` | Primary surface | Main background, cards |
| `surface-alt` | `#F7FAFC` | Alternate surface | Section backgrounds for contrast |

#### Semantic Colors
| Token | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| `error` | `#B00020` | Destructive | Error states, validation failures |
| `success` | `#059669` | Positive | Success states, confirmations |
| `warning` | `#D97706` | Caution | Warning states, alerts |
| `info` | `#0891B2` | Informational | Info messages, tips |

#### Contrast Requirements
- **Body text (16px):** ≥7:1 (WCAG AAA)
- **Interactive elements:** ≥4.5:1 (WCAG AA)
- **Large text (24px+):** ≥4.5:1 (WCAG AAA)
- Validate all combinations before implementation

---

### Typography System

#### Font Families
```css
--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "Fira Code", "Courier New", monospace;
```

**Rationale:**
- **Playfair Display:** Elegant serif for authority and premium feel
- **Inter:** Modern sans-serif optimized for screen readability
- **System fallbacks:** Ensure graceful degradation

#### Type Scale (1.25 ratio)
| Token | Size (px) | Size (rem) | Line Height | Usage |
|-------|-----------|------------|-------------|-------|
| `h1` | 32px | 2rem | 1.35 | Page titles, hero headlines |
| `h2` | 24px | 1.5rem | 1.35 | Section headings |
| `h3` | 20px | 1.25rem | 1.35 | Subsection headings |
| `body` | 16px | 1rem | 1.6 | Paragraphs, content |
| `small` | 14px | 0.875rem | 1.5 | Captions, labels, meta |
| `caption` | 12px | 0.75rem | 1.4 | Fine print, footnotes |

#### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `regular` | 400 | Body text |
| `medium` | 500 | Emphasis, button text |
| `semibold` | 600 | Subheadings, strong emphasis |
| `bold` | 700 | Headings, high emphasis |

#### Typography Rules
- **Line length:** 65-75 characters maximum for readability
- **Paragraph spacing:** 1.5em between paragraphs
- **Letter spacing:** -0.01em for headings, 0 for body
- **Heading hierarchy:** Always use logical order (H1 → H2 → H3)
- **One H1 per page:** Ensures proper document structure

---

### Spacing System (4px base)

| Token | Value (px) | Value (rem) | Usage |
|-------|------------|-------------|-------|
| `space-1` | 4px | 0.25rem | Micro spacing, icon padding |
| `space-2` | 8px | 0.5rem | Tight spacing, compact layouts |
| `space-3` | 12px | 0.75rem | Input padding, small gaps |
| `space-4` | 16px | 1rem | Standard spacing, base unit |
| `space-6` | 24px | 1.5rem | Component padding, section gaps |
| `space-8` | 32px | 2rem | Large spacing, component separation |
| `space-12` | 48px | 3rem | Section padding, major separations |
| `space-16` | 64px | 4rem | Hero padding, page-level spacing |

**Spacing Philosophy:**
- Use multiples of 4px for all spacing decisions
- Larger screens = more generous spacing
- Maintain vertical rhythm throughout layouts

---

### Elevation System (Shadows)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards, subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Hover states, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Modals, popovers |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Page overlays, critical UI |

**Shadow Usage:**
- Use sparingly for hierarchy and focus
- Avoid excessive shadows (maintains elegance)
- Consider `prefers-reduced-motion` for animations

---

### Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Input fields, small buttons |
| `radius-md` | 8px | Standard buttons, cards |
| `radius-lg` | 12px | Large cards, feature blocks |
| `radius-xl` | 16px | Hero sections, prominent containers |
| `radius-full` | 9999px | Pills, circular avatars |

---

## 🧩 Component Specifications

### Buttons
```
Height: 48px
Padding: 12px vertical, 24px horizontal
Font: 16px, weight 500
Border radius: 8px (radius-md)
Shadow: shadow-sm

States:
- Default: primary color background, white text
- Hover: brightness +6% (filter: brightness(1.06))
- Active: brightness -10% (filter: brightness(0.9))
- Focus: 2px outline, 2px offset, primary color
- Disabled: opacity 50%, no pointer events
```

### Cards
```
Background: surface-base (#FFFFFF)
Padding: 24px (space-6)
Border radius: 12px (radius-lg)
Shadow: shadow-md
Border: optional 1px solid neutral-300

Variations:
- Default: shadow-md
- Elevated: shadow-lg
- Flat: no shadow, border only
```

### Forms
```
Input Height: 48px
Input Padding: 12px (space-3)
Font size: 16px (body)
Border: 1px solid neutral-300
Border radius: 8px (radius-md)

States:
- Default: neutral-300 border
- Focus: 2px solid primary border
- Error: 2px solid error border + helper text
- Success: 2px solid success border + optional checkmark
- Disabled: opacity 50%, neutral-100 background

Labels:
- Always visible above input
- Font weight: 500 (medium)
- Color: neutral-900
- Required indicator: asterisk or "(required)"
```

### Navigation
```
Link color: primary
Link hover: underline (2px thickness)
Link active: darker shade or accent color
Link focus: 2px outline, 2px offset

Spacing: minimum 16px (space-4) between nav items
Touch targets: minimum 44×44px for mobile
```

---

## 📐 Layout System

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape, small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Wide desktop */
```

### Container Widths
- **Max content width:** 1280px
- **Comfortable reading:** 1024px
- **Text-heavy content:** 720px (≈65 characters)

### Grid System
- **Mobile (default):** 4 columns, 16px gutter
- **Tablet (768px+):** 8 columns, 16px gutter
- **Desktop (1024px+):** 12 columns, 24px gutter

### Responsive Strategy
**Mobile-First Approach:**
1. Design for 375px viewport first
2. Scale up with min-width media queries
3. Stack elements vertically on small screens
4. Use multi-column layouts on larger screens
5. Increase spacing generously on desktop

---

## ♿ Accessibility Standards

### Requirements
- ✅ Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Logical heading hierarchy (one H1, proper nesting)
- ✅ All images have descriptive alt text
- ✅ Form inputs have associated labels
- ✅ Interactive elements have focus indicators
- ✅ Minimum touch targets: 44×44px
- ✅ Color is never the sole differentiator
- ✅ ARIA labels for icon-only buttons
- ✅ Keyboard navigation for all interactive elements

### Testing Checklist
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Keyboard-only navigation
- [ ] Color contrast validation
- [ ] Focus order verification
- [ ] Text scaling to 200%
- [ ] `prefers-reduced-motion` respected

---

## 🎭 Animation & Motion

### Duration Tokens
```css
--duration-fast: 150ms;    /* Micro-interactions, hover */
--duration-base: 250ms;    /* Transitions, dropdowns */
--duration-slow: 350ms;    /* Modals, page transitions */
```

### Easing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);  /* Default */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);     /* Enter */
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);        /* Exit */
```

### Animation Principles
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` media query
- Never animate critical content on page load
- Use transforms and opacity for performance

---

## 🎨 Brand Voice & Tone

### Core Attributes
- **Clear:** Simple, direct language
- **Professional:** Medical context requires trust
- **Empathetic:** Acknowledge user concerns
- **Concise:** Respect user time

### Writing Guidelines
**Buttons & CTAs:**
- ✅ "Submit application"
- ❌ "Click here to submit your information"

**Error Messages:**
- ✅ "Unable to save changes. Please check your connection and try again."
- ❌ "Oops! Something went wrong"

**Headings:**
- Lead with benefits, not features
- Use active voice
- Keep under 10 words when possible

---

## 🔄 Design Token Implementation

### CSS Custom Properties
All tokens should be implemented as CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #2B6CB0;
  --color-accent: #B7791F;
  --color-neutral-900: #0A0A0A;
  --color-neutral-700: #333333;
  --color-surface-base: #FFFFFF;
  --color-surface-alt: #F7FAFC;
  --color-error: #B00020;
  --color-success: #059669;

  /* Typography */
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-body: 16px;
  --line-height-tight: 1.35;
  --line-height-normal: 1.6;

  /* Spacing */
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);

  /* Radii */
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### JSON Format (for design/tokens.json)
```json
{
  "_meta": {
    "version": "1.0",
    "engine": "Flow Studio Design Engine"
  },
  "colors": {
    "brand": {
      "primary": "#2B6CB0",
      "accent": "#B7791F"
    },
    "neutral": { ... },
    "semantic": { ... }
  },
  "typography": { ... },
  "spacing": { ... },
  "shadows": { ... },
  "radii": { ... }
}
```

---

## 🚀 Performance Best Practices

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Image Optimization
- Use modern formats (WebP, AVIF) with fallbacks
- Implement lazy loading for below-fold images
- Specify width and height to prevent layout shift
- Use responsive images with `srcset` and `sizes`

### CSS Strategy
- Load critical CSS inline (above-fold styles)
- Defer non-critical CSS
- Use CSS containment for performance
- Minimize specificity wars (prefer classes over IDs)

---

## 📊 Design System Validation

### Pre-Launch Checklist
- [ ] All colors validated for contrast ratios
- [ ] Typography scale tested at all breakpoints
- [ ] Spacing system applied consistently
- [ ] Components match specifications
- [ ] Accessibility standards met
- [ ] Responsive design tested (375px → 1440px)
- [ ] Performance budget met (<3s load time)
- [ ] No console errors or warnings

### Continuous Validation
- Run Lighthouse audits (aim for 90+ in all categories)
- Use axe DevTools for accessibility testing
- Test with real screen readers
- Validate HTML5 with W3C validator
- Monitor Core Web Vitals in production

---

## 🎯 Agent Integration

### For Arto (UI/UX Strategist)
- Reference color tokens for brand alignment
- Use spacing system for layout decisions
- Follow typography hierarchy for content structure
- Consider accessibility requirements in layout planning

### For Stylist (Design Polish)
- Generate `tokens.json` based on this engine
- Validate all contrast ratios against standards
- Customize tokens while maintaining system integrity
- Document any deviations with rationale

### For Builder (Components/HTML)
- Implement CSS variables from tokens
- Use semantic HTML as specified
- Follow component specifications exactly
- Ensure responsive breakpoints match system

### For Curator (Evaluator)
- Validate outputs against this design engine
- Check token consistency across artifacts
- Verify accessibility compliance
- Ensure brand alignment

---

## 📚 Reference & Resources

### Internal Documents
- `FLOW_STUDIO_SPEC.md` — Overall system specification
- `.claude/BOOTSTRAP.md` — Workflow and quick start
- `.claude/agents/*.md` — Agent-specific instructions

### External Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Version:** 1.0
**Last Updated:** 2025-11-12
**Status:** Active
**Maintained by:** Flow Studio Team

---

## 🔮 Future Enhancements

### Planned Additions
- Dark mode token variants
- Extended component library (tables, tabs, accordions)
- Advanced animation patterns
- Iconography system
- Illustration guidelines

### Under Consideration
- Theme customization API
- Design token documentation generator
- Automated accessibility testing integration
- Visual regression testing setup

---

**This design engine powers all Flow Studio outputs. All agents must reference and adhere to these specifications.**
