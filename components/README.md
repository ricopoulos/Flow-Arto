# Flow Studio Component Library

This directory contains reusable, brand-agnostic components for building web experiences with Flow Studio.

## Structure

- `primitives/` - Basic building blocks (buttons, inputs, badges, etc.)
- `blocks/` - Content sections (heroes, features, testimonials, etc.)
- `layout/` - Structural elements (navbars, footers, grids, etc.)
- `forms/` - Form components (CTAs, contact forms, etc.)
- `utilities/` - Helper components (spacers, dividers, containers, etc.)

## Usage

Components are designed to be:
- Token-driven (all styling via CSS variables)
- Brand-agnostic (works with any brand via token system)
- Accessible (WCAG AA minimum)
- Responsive (mobile-first design)
- Composable (combine to create complete pages)

## Documentation

See `/docs/COMPONENT-LIBRARY.md` for:
- Implementation rules
- Responsive patterns
- Accessibility standards
- Agent responsibilities
- Best practices

## Creating Components

1. Choose appropriate category
2. Follow naming convention: `{purpose}-{variant}.html`
3. Add documentation block at top of file
4. Use only CSS variables for styling
5. Ensure accessibility compliance
6. Test across breakpoints
7. Add example usage

## Examples

This directory includes example components demonstrating the pattern:
- `primitives/button.html` - Primary interactive element
- `blocks/hero-basic.html` - Centered hero section
- `layout/section-wrapper.html` - Semantic section container
- `forms/cta-simple.html` - Single CTA form

These are starting points. Adapt and extend as needed for your projects.
