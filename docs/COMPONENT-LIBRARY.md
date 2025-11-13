# Flow Studio Component Library – Blueprint

**Purpose**:
Define how Flow Studio should organize and build reusable components so that generated pages are consistent, maintainable, and composable.

This is a **meta-guide**. Actual implementation lives in `/components` and HTML/CSS files.

---

## 1. Component Categories

We organize components into:

- **Primitives** – buttons, inputs, labels, badges, tags.
- **Content Blocks** – hero sections, feature rows, testimonials, FAQ blocks.
- **Layout Blocks** – navbars, footers, sidebars, sections, grids.
- **Forms** – single CTA forms, multi-step flows.
- **Utilities** – spacing helpers, dividers, cards.

Each component should be:

- **Responsive** - works across mobile, tablet, desktop
- **Accessible** - meets WCAG AA minimum
- **Token-driven** - no hardcoded colors or fonts
- **Brand-agnostic** - style comes from tokens + brand config

---

## 2. File Structure

```
components/
  primitives/
    button.html
    input.html
    card.html
    badge.html
    tag.html
  blocks/
    hero-basic.html
    hero-split.html
    hero-with-media.html
    features-three-column.html
    features-alternating.html
    testimonial-quote.html
    testimonial-card.html
    faq-accordion.html
    stats-row.html
  layout/
    navbar-simple.html
    navbar-with-cta.html
    footer-minimal.html
    footer-detailed.html
    section-wrapper.html
    grid-two-column.html
    grid-three-column.html
  forms/
    cta-simple.html
    cta-inline.html
    cta-invite-request.html
    contact-form.html
  utilities/
    spacer.html
    divider.html
    container.html
```

(Exact structure can evolve, but must remain logical and documented.)

---

## 3. Implementation Rules

### HTML

- Use **semantic HTML** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- No `<div>` soup - use semantic elements where appropriate
- Every interactive element must be keyboard accessible
- All images must have `alt` text (or `alt=""` for decorative images)
- Forms must have proper `<label>` associations

### CSS

- Use **CSS variables** linked to `design/tokens.*.json`
- No inline styles (except in rare dynamic cases)
- Components must not hardcode brand - styling comes from tokens
- Use modern CSS (Grid, Flexbox, Container Queries where supported)
- Mobile-first responsive design

### Token Usage

Components reference tokens via CSS variables:

```css
.button-primary {
  background-color: var(--color-accent);
  color: var(--color-accent-text);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--type-size-base);
  font-weight: var(--type-weight-bold);
}
```

Token files (`design/tokens.*.json`) are converted to CSS variables in a generated stylesheet.

### Documentation

Every component must declare at the top of the file:

```html
<!--
Component: hero-basic
Purpose: Primary hero for landing pages with centered content
Category: blocks
Version: 1.0.0

Slots:
  - eyebrow: Optional small text above title
  - title: Main headline (required)
  - subtitle: Supporting text below title
  - primaryCTA: Main call-to-action (required)
  - secondaryCTA: Secondary action (optional)

Tokens Used:
  - color.background
  - color.text.primary
  - color.accent
  - type.scale.hero
  - spacing.section.desktop
  - spacing.section.mobile

Behavior:
  - Centered text on all screen sizes
  - Max width 720px for readability
  - Buttons stack vertically on mobile (<640px)
  - Section padding adjusts via spacing tokens

Accessibility:
  - Heading uses <h1> (page title)
  - Focus states on all interactive elements
  - Touch targets min 44x44px on mobile

Example Usage:
  See: /examples/hero-basic-example.html
-->
```

---

## 4. Component Variants

Components may have variants for different use cases:

**Hero Variants:**
- `hero-basic.html` - Centered, text only
- `hero-split.html` - Text left, image/media right
- `hero-with-media.html` - Background image or video
- `hero-minimal.html` - Very simple, single CTA

**Button Variants:**
- `button-primary.html` - Main action
- `button-secondary.html` - Secondary action
- `button-ghost.html` - Subtle, outline style
- `button-link.html` - Text link styled as button

Variants should share a base and only differ in specific styling/structure.

---

## 5. Responsive Behavior

All components must define responsive breakpoints:

**Standard Breakpoints** (defined in tokens):
- `mobile`: < 640px
- `tablet`: 640px - 1024px
- `desktop`: > 1024px

**Common Patterns:**
- Stack on mobile, side-by-side on tablet+
- Reduce font sizes on mobile via token scale
- Adjust spacing via responsive spacing tokens
- Hide/show elements based on screen size only when necessary

Use CSS Grid and Flexbox with `gap` for spacing instead of margin hacks.

---

## 6. Accessibility Standards

Every component must meet **WCAG AA** minimum:

**Color Contrast:**
- Text contrast ratio: 4.5:1 minimum (normal text)
- Large text contrast ratio: 3:1 minimum (18pt+ or 14pt+ bold)
- UI component contrast: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Focus states must be clearly visible
- Tab order must be logical
- No keyboard traps

**Screen Reader Support:**
- Use ARIA labels where semantic HTML isn't sufficient
- Provide `aria-label` or `aria-labelledby` for icon-only buttons
- Use `aria-live` for dynamic content updates
- Use `role` attributes appropriately

**Touch Targets:**
- Minimum 44x44px on mobile
- Adequate spacing between interactive elements

---

## 7. Agent Responsibilities

### Builder (Components)

**Responsibilities:**
- Creates and maintains components under `/components`
- Reuses existing components instead of rebuilding from scratch
- Wires pages (like Carlton Select) by composing components
- Ensures all components follow implementation rules
- Documents components properly
- Creates new components when existing ones don't fit the need

**When to create a new component:**
- Pattern is used 2+ times across different pages
- Pattern is complex enough to warrant encapsulation
- Existing components can't be easily adapted

**When to adapt existing component:**
- Need is 80%+ similar to existing component
- Difference is purely stylistic (handled by tokens)
- Creating variant is simpler than new component

### Arto (UX Strategist)

**Responsibilities:**
- Chooses which components to combine for a given page layout
- Requests new components when necessary for UX goals
- Ensures component composition creates coherent experience
- Validates that component choices align with brand

**Process:**
1. Read brand config to understand tone/density/hierarchy needs
2. Select appropriate hero variant
3. Choose content block components that fit brand density
4. Specify component composition in layout.md
5. Flag to Builder if new component is needed

### Curator (Evaluator)

**Responsibilities:**
- Flags misused components (e.g. wrong hero for the goal)
- Checks visual consistency between components
- Validates component accessibility
- Ensures components respect token usage (no hardcoded values)

**Evaluation checklist:**
- Are components used appropriately for their purpose?
- Do components compose into a coherent visual system?
- Are there repeated patterns that should be extracted to components?
- Do components meet accessibility standards?
- Do components properly use tokens?

### Maestro (Orchestrator)

**Responsibilities:**
- Ensures new projects start by reusing the library
- Triggers "component extraction" pass when repetitive markup detected
- Coordinates between Arto and Builder for new component needs
- Maintains component library health (no duplication, proper organization)

---

## 8. Component Testing

Components should be testable for:

1. **Visual Consistency**
   - Screenshot testing across breakpoints
   - Token usage validation
   - Brand alignment check

2. **Accessibility**
   - Automated a11y testing (axe, pa11y)
   - Keyboard navigation testing
   - Screen reader compatibility

3. **Responsiveness**
   - Test at all standard breakpoints
   - Test at edge cases (very narrow, very wide)
   - Test with different content lengths

4. **Token Integration**
   - Validate no hardcoded colors
   - Validate no hardcoded fonts
   - Validate no hardcoded spacing

---

## 9. Component Composition Patterns

### Page Structure Example

```html
<!-- navbar -->
<navbar-simple brand="flow-studio"></navbar-simple>

<!-- hero -->
<hero-basic>
  <eyebrow>AI Design Agents</eyebrow>
  <title>Build brand-coherent web experiences</title>
  <subtitle>Flow Studio understands your brand and generates systematic, polished designs</subtitle>
  <primaryCTA href="/start">Start building</primaryCTA>
  <secondaryCTA href="/learn">Learn how it works</secondaryCTA>
</hero-basic>

<!-- features -->
<features-three-column>
  <!-- feature content -->
</features-three-column>

<!-- testimonial -->
<testimonial-quote>
  <!-- testimonial content -->
</testimonial-quote>

<!-- CTA -->
<cta-simple>
  <!-- CTA content -->
</cta-simple>

<!-- footer -->
<footer-minimal></footer-minimal>
```

### Token-Driven Variants

Instead of creating 10 button components, create one with CSS classes driven by tokens:

```html
<!-- button.html -->
<button class="btn btn--{{ variant }}">{{ label }}</button>
```

```css
/* Driven by tokens */
.btn--primary {
  background: var(--color-accent);
  color: var(--color-accent-text);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn--ghost {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}
```

---

## 10. Future Extensions

### Short Term
- Component variants JSON schema (for visual editors)
- Automated accessibility testing in CI
- Screenshot regression testing
- Component usage analytics

### Medium Term
- Interactive component preview gallery
- Component prop validation
- Brand-specific component overrides
- Animation/motion variants

### Long Term
- Visual component editor
- Component marketplace/sharing
- Framework exports (React, Vue, Svelte)
- Design tool integration (Figma, Sketch)

---

## 11. Migration Strategy

For existing pages:

1. **Audit** - Identify repeated patterns
2. **Extract** - Create component from pattern
3. **Replace** - Swap inline code with component
4. **Validate** - Ensure visual consistency maintained
5. **Document** - Add component documentation
6. **Iterate** - Refine based on usage

**Priority for extraction:**
1. Primitives (buttons, inputs) - highest reuse
2. Layout blocks (navbar, footer) - consistent structure
3. Content blocks (heroes, features) - design consistency
4. Forms - UX consistency
5. Utilities - convenience

---

## 12. Best Practices

**Do:**
- Start with semantic HTML
- Use tokens for all styling
- Document component purpose and usage
- Test across breakpoints and browsers
- Validate accessibility
- Compose components into pages
- Reuse before creating new

**Don't:**
- Hardcode colors, fonts, or spacing
- Create one-off components for single use
- Skip documentation
- Ignore accessibility
- Create overly complex components
- Duplicate existing patterns
- Mix component concerns

---

## 13. Component Review Checklist

Before a component is considered "done":

- [ ] Semantic HTML used appropriately
- [ ] All styling via CSS variables (tokens)
- [ ] Responsive behavior defined and tested
- [ ] Accessibility validated (WCAG AA minimum)
- [ ] Documentation block at top of file
- [ ] Example usage provided
- [ ] Works with multiple brands (via tokens)
- [ ] No hardcoded values
- [ ] Keyboard navigation works
- [ ] Touch targets appropriate on mobile
- [ ] Focus states visible and clear
- [ ] Tested in multiple browsers

---

## Example Component: Button

See `/components/primitives/button.html` for a complete, production-ready example demonstrating all principles above.

---

**Remember**: Components are the building blocks of consistent, maintainable, brand-aware web experiences. Invest in them early, and the system compounds.
