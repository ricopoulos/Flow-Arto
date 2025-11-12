# Flow Studio – UI/UX Style Guide

## 🎨 Brand Identity
**Aesthetic:** Elegant, premium-medical with balanced whitespace and a trustworthy tone.

---

## 🎨 Color Palette

### Primary Colors
| Role | Hex | Usage | Notes |
|------|-----|-------|-------|
| **Primary** | `#2B6CB0` | CTA buttons, links, interactive elements | Trust & professionalism |
| **Accent** | `#B7791F` | Highlights, secondary CTAs, emphasis | Warmth & premium feel |

### Neutral Scale
| Role | Hex | Usage |
|------|-----|-------|
| **Neutral-900** | `#0A0A0A` | Headings, high-emphasis text |
| **Neutral-700** | `#333333` | Body text, paragraphs |
| **Neutral-500** | `#6B7280` | Secondary text, labels |
| **Neutral-300** | `#D1D5DB` | Borders, dividers |
| **Neutral-100** | `#F3F4F6` | Subtle backgrounds |

### Surface Colors
| Role | Hex | Usage |
|------|-----|-------|
| **Surface** | `#FFFFFF` | Primary background, cards |
| **Surface-Alt** | `#F7FAFC` | Alternate section backgrounds |

### Semantic Colors
| Role | Hex | Usage |
|------|-----|-------|
| **Error** | `#B00020` | Error states, destructive actions |
| **Success** | `#059669` | Success states, confirmations |
| **Warning** | `#D97706` | Warning states, cautions |
| **Info** | `#0891B2` | Informational messages |

### Accessibility Requirements
- **Body text contrast:** ≥7:1 (WCAG AAA)
- **Buttons & interactive elements:** ≥4.5:1 (WCAG AA)
- Test all color combinations before implementation

---

## ✍️ Typography

### Font Families
```css
--font-heading: "Playfair Display", serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "Fira Code", "Courier New", monospace;
```

### Type Scale
| Level | Size | Line Height | Usage |
|-------|------|-------------|-------|
| **H1** | 32px (2rem) | 1.35 | Page titles |
| **H2** | 24px (1.5rem) | 1.35 | Section headings |
| **H3** | 20px (1.25rem) | 1.35 | Subsection headings |
| **Body** | 16px (1rem) | 1.6 | Paragraphs, content |
| **Small** | 14px (0.875rem) | 1.5 | Captions, labels |

### Font Weights
- **Headings:** 600–700 (Semi-bold to Bold)
- **Body:** 400 (Regular)
- **Emphasis:** 500 (Medium)
- **Strong:** 600 (Semi-bold)

### Best Practices
- Maximum line length: 65–75 characters
- Paragraph spacing: 1.5em between paragraphs
- Letter spacing: -0.01em for headings, 0 for body
- Use `font-variant-numeric: tabular-nums` for data tables

---

## 📐 Layout & Spacing

### Spacing Scale (4px base)
```
4px  → 0.25rem → --space-1
8px  → 0.5rem  → --space-2
12px → 0.75rem → --space-3
16px → 1rem    → --space-4
24px → 1.5rem  → --space-6
32px → 2rem    → --space-8
48px → 3rem    → --space-12
64px → 4rem    → --space-16
```

### Container Widths
- **Max content width:** 1280px
- **Comfortable reading width:** 1024px
- **Text-heavy content:** 720px (65ch)

### Grid System
- **Desktop:** 12-column grid, 24px gutter
- **Tablet:** 8-column grid, 16px gutter
- **Mobile:** 4-column grid, 16px gutter

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Wide desktop */
```

---

## 🧩 Component Guidelines

### Buttons
- **Height:** 48px (comfortable tap target)
- **Padding:** 24px horizontal, 12px vertical
- **Border radius:** 8px
- **Font size:** 16px, weight 500
- **States:**
  - Default: Primary color background
  - Hover: Increase brightness by 6%
  - Active: Decrease brightness by 10%
  - Disabled: 50% opacity, no pointer events
  - Focus: Visible outline with `focus-visible` (2px offset, 3px width)

### Cards
- **Background:** White (`#FFFFFF`)
- **Shadow:** `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- **Border radius:** 12px
- **Padding:** 24px
- **Border:** Optional 1px solid `#E5E7EB`

### Forms
- **Labels:** Always visible, positioned above inputs
- **Input height:** 48px
- **Input padding:** 12px
- **Border:** 1px solid `#D1D5DB`
- **Focus state:** 2px border in primary color
- **Error state:** Border `#B00020`, helper text below
- **Success state:** Border `#059669`, optional checkmark icon
- **Placeholder text:** `#9CA3AF`, never replace labels

### Navigation
- **Link color:** Primary `#2B6CB0`
- **Hover:** Underline with 2px thickness
- **Active state:** Darker shade or accent color
- **Spacing:** Minimum 16px between nav items

---

## 🎭 Shadows & Depth

```css
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
--shadow-lg:  0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
--shadow-xl:  0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
```

Use sparingly: cards use `--shadow-sm`, modals use `--shadow-lg`.

---

## ♿ Accessibility Standards

### Must-Have Features
- ✅ Keyboard navigation support for all interactive elements
- ✅ Focus indicators on all focusable elements
- ✅ ARIA labels for icon-only buttons
- ✅ Alt text for all images
- ✅ Color is never the only means of conveying information
- ✅ Form inputs have associated labels
- ✅ Sufficient touch target sizes (minimum 44×44px)

### Testing Checklist
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test keyboard-only navigation
- [ ] Verify color contrast ratios
- [ ] Check focus order makes logical sense
- [ ] Ensure text can scale to 200% without breaking layout

---

## 🎯 Voice & Tone

### Writing Principles
- **Clear:** Use simple, direct language
- **Professional:** Medical context requires trust
- **Empathetic:** Acknowledge user concerns
- **Concise:** Respect user time

### Example Copy
- ❌ "Click here to submit your information"
- ✅ "Submit application"

- ❌ "Oops! Something went wrong"
- ✅ "Unable to save changes. Please check your connection and try again."

---

## 🔄 Animation & Motion

### Duration
- **Micro-interactions:** 150ms (hover, focus)
- **Transitions:** 250ms (dropdowns, tooltips)
- **Page transitions:** 350ms (modals, drawers)

### Easing
- **Default:** `cubic-bezier(0.4, 0.0, 0.2, 1)` (ease-in-out)
- **Enter:** `cubic-bezier(0.0, 0.0, 0.2, 1)` (ease-out)
- **Exit:** `cubic-bezier(0.4, 0.0, 1, 1)` (ease-in)

### Best Practices
- Respect `prefers-reduced-motion` media query
- Keep animations subtle and purposeful
- Never animate critical content on page load

---

## 📱 Responsive Design

### Mobile-First Approach
Start with mobile layouts and enhance for larger screens.

### Key Considerations
- **Touch targets:** Minimum 44×44px
- **Text size:** Minimum 16px to prevent zoom on iOS
- **Tap spacing:** Minimum 8px between interactive elements
- **Thumb zones:** Place primary actions within easy reach

---

## 🎨 Design Tokens Usage

All values above should be stored in `/design/tokens.json` for programmatic access. Use CSS custom properties for implementation:

```css
:root {
  --color-primary: #2B6CB0;
  --color-neutral-900: #0A0A0A;
  --font-heading: "Playfair Display", serif;
  --space-4: 1rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
}
```

---

## 🚀 Implementation Notes

1. **Load fonts early:** Use `preconnect` and `preload` for Google Fonts
2. **Optimize images:** Use modern formats (WebP, AVIF) with fallbacks
3. **CSS strategy:** Start with Tailwind CDN or custom CSS, normalize first
4. **Validate:** Run Lighthouse, axe DevTools, and manual testing

---

**Version:** 1.0
**Last Updated:** 2025-11-12
**Maintained by:** Flow Studio Team
