# Flow Studio Multi-Theme System Guide

**Version:** 1.0
**Last Updated:** 2025-11-15

## Overview

The Flow Studio multi-theme system enables any project to support 8 distinct design variations with instant theme switching. This guide explains how to apply the theme system to new or existing projects.

## Architecture

### Core Components

1. **`/shared/themes.js`** - 8 theme definitions with complete design token sets
2. **`/shared/theme-styles.css`** - Theme-aware CSS variables and switcher UI styles
3. **`/shared/theme-switcher.js`** - Automatic theme switcher component injection

### The 8 Themes

1. **Token Pure** - Design token system showcase (default)
2. **Scroll Master** - Parallax & scroll-triggered animations
3. **Micro Magic** - Micro-animations & smart interactions
4. **3D Depth** - Floating UI & depth effects
5. **Type Hero** - Bold, kinetic typography
6. **Grid Artist** - Asymmetric layouts & CSS Grid
7. **Motion Flow** - Smooth animations & spring physics
8. **Dark Vivid** - High-contrast dark mode

## How It Works

### Theme Variables

All themes modify these CSS custom properties:

```css
/* Colors */
--color-primary
--color-primary-light
--color-primary-dark
--color-accent
--color-accent-light
--color-background
--color-background-alt
--color-text
--color-text-light
--color-border

/* Typography */
--font-heading
--font-body
--font-heading-weight
--font-body-weight

/* Spacing */
--spacing-section
--spacing-card-gap

/* Motion */
--motion-duration
--motion-easing

/* Effects */
--gradient-hero
```

### Theme Switching

1. User clicks 🎨 floating button
2. Theme selector panel opens
3. User selects a theme
4. JavaScript updates all CSS variables instantly
5. Preference saved to localStorage
6. Page re-themes without reload

---

## Adding Themes to a New Project

### Step 1: Include Shared Resources

Add these to your `<head>`:

```html
<!-- Google Fonts: Include fonts used by themes -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Shared Theme System -->
<link rel="stylesheet" href="../../shared/theme-styles.css">

<!-- Your Project Styles -->
<link rel="stylesheet" href="styles.css">

<!-- Theme System Scripts -->
<script src="../../shared/themes.js"></script>
<script src="../../shared/theme-switcher.js"></script>
```

**Note:** Adjust paths based on your project location relative to `/shared/`.

### Step 2: Make Your CSS Theme-Aware

#### Option A: Direct Variable Mapping (Recommended)

Map your existing color scheme to theme variables:

```css
:root {
  /* Map to theme system with fallbacks */
  --color-brand-primary: var(--color-primary, #1a365d);
  --color-brand-accent: var(--color-accent, #d4af37);
  --color-bg: var(--color-background, #ffffff);
  --color-text-main: var(--color-text, #1a202c);
}

body {
  font-family: var(--font-body, 'Inter', sans-serif);
  background: var(--color-bg);
  color: var(--color-text-main);
}

h1, h2, h3 {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: var(--font-heading-weight, 600);
  color: var(--color-brand-primary);
}
```

#### Option B: Full Integration

Refactor your CSS to use theme variables directly:

```css
body {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
}

.section--primary {
  background: var(--color-primary);
  color: var(--color-background);
}

.button {
  background: var(--color-accent);
  color: var(--color-background);
}
```

### Step 3: Add Smooth Transitions

Make theme switching smooth by adding transitions to key elements:

```css
body {
  transition: background-color var(--motion-duration, 0.25s) var(--motion-easing, ease),
              color var(--motion-duration, 0.25s) var(--motion-easing, ease);
}

h1, h2, h3, h4, h5, h6 {
  transition: color var(--motion-duration, 0.25s) var(--motion-easing, ease);
}

.section {
  transition: background-color var(--motion-duration, 0.25s) var(--motion-easing, ease);
}
```

### Step 4: Initialize Theme System

Add this to your page scripts (or let theme-switcher.js handle it automatically):

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Theme system auto-initializes via theme-switcher.js
  // Your other page-specific code here
});
```

### Step 5: Test All Themes

1. Open your project in a browser
2. Click the 🎨 theme button
3. Try each of the 8 themes
4. Verify colors, typography, and spacing look coherent
5. Check that transitions are smooth
6. Test on mobile and desktop

---

## Examples

### Example 1: Flow Studio Landing Page

**Location:** `/index.html`

**Integration:**
- Direct use of shared theme resources
- All styles use theme variables
- Theme switcher injected automatically

**See:** `/index.html` for reference implementation

### Example 2: Carlton Select (Luxury Brand)

**Location:** `/web/carlton-select/index.html`

**Integration:**
- Preserves brand identity (navy, gold, champagne palette)
- Maps theme variables to brand-specific tokens
- Adapts to all 8 themes while maintaining luxury aesthetic

**See:** `/web/carlton-select/styles.css` for reference implementation

**Key technique:**
```css
:root {
  /* Theme-aware mapping */
  --color-navy-800: var(--color-primary, #1a365d);
  --color-gold-500: var(--color-accent, #d4af37);
  --color-champagne: var(--color-background-alt, #f7f3e9);
}
```

---

## Best Practices

### 1. **Use Fallback Values**

Always provide fallback values for theme variables:

```css
background: var(--color-primary, #1a365d);
```

This ensures your project works even if theme system fails to load.

### 2. **Preserve Brand Identity**

For client projects, map theme variables to your brand tokens:

```css
:root {
  --brand-primary: var(--color-primary, #your-brand-color);
}
```

### 3. **Add Transitions**

Smooth theme switching improves user experience:

```css
* {
  transition: background-color 0.25s ease,
              color 0.25s ease,
              border-color 0.25s ease;
}
```

### 4. **Test Accessibility**

- Verify contrast ratios in all themes (WCAG AAA: 7:1+)
- Test with screen readers
- Ensure keyboard navigation works with theme switcher
- Support `prefers-reduced-motion`

### 5. **Respect User Preferences**

The theme system:
- Saves preference to localStorage
- Loads saved theme on return visits
- Defaults to "Token Pure" for first-time visitors

---

## Troubleshooting

### Theme Switcher Not Appearing

**Check:**
1. Is `theme-switcher.js` loaded?
2. Is it loaded AFTER `themes.js`?
3. Check browser console for errors

**Solution:**
```html
<script src="shared/themes.js"></script>
<script src="shared/theme-switcher.js"></script>
<!-- Must be in this order -->
```

### Colors Not Changing

**Check:**
1. Are you using theme variables in your CSS?
2. Are paths to shared files correct?
3. Is CSS specificity overriding theme variables?

**Solution:**
```css
/* ❌ Wrong - hardcoded */
background: #1a365d;

/* ✅ Right - theme-aware */
background: var(--color-primary);
```

### Themes Look Broken

**Check:**
1. Are required fonts loaded?
2. Are transitions conflicting with your styles?
3. Is your CSS too specific?

**Solution:**
```html
<!-- Add theme fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Sora:wght@600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

---

## Technical Details

### File Structure

```
flow-studio/
├── shared/
│   ├── themes.js              # 8 theme definitions
│   ├── theme-styles.css       # Theme UI & CSS variables
│   ├── theme-switcher.js      # Switcher component
│   └── THEME_GUIDE.md         # This file
├── index.html                 # Main landing (uses themes)
└── web/
    ├── carlton-select/        # Example: theme-aware project
    │   ├── index.html
    │   └── styles.css
    └── your-project/          # Your new project
        ├── index.html
        └── styles.css
```

### Theme Object Structure

Each theme in `themes.js` follows this structure:

```javascript
'theme-id': {
  name: 'Theme Name',
  description: 'Short description',
  colors: {
    primary: '#hex',
    primaryLight: '#hex',
    primaryDark: '#hex',
    accent: '#hex',
    accentLight: '#hex',
    background: '#hex',
    backgroundAlt: '#hex',
    text: '#hex',
    textLight: '#hex',
    border: '#hex'
  },
  fonts: {
    heading: "'Font', sans-serif",
    body: "'Font', sans-serif",
    headingWeight: '700',
    bodyWeight: '400'
  },
  spacing: {
    section: '96px',
    cardGap: '24px'
  },
  motion: {
    duration: '0.25s',
    easing: 'cubic-bezier(...)'
  },
  effects: {
    gradient: 'linear-gradient(...)',
    // Theme-specific effects
  }
}
```

### localStorage Keys

- `flowStudioTheme` - Stores selected theme ID

---

## Advanced Usage

### Creating Custom Themes

To add a new theme, edit `/shared/themes.js`:

```javascript
const THEMES = {
  // Existing themes...

  'my-custom-theme': {
    name: 'My Custom Theme',
    description: 'Description here',
    colors: { /* ... */ },
    fonts: { /* ... */ },
    spacing: { /* ... */ },
    motion: { /* ... */ },
    effects: { /* ... */ }
  }
};
```

### Project-Specific Theme Overrides

Override specific theme variables in your project CSS:

```css
/* Override for your project */
:root {
  --color-accent: #custom-color !important;
}
```

Use sparingly - breaks theme consistency.

---

## Support

For questions or issues:
1. Check this guide
2. Review example implementations (/, /web/carlton-select/)
3. Check `/docs/PREVIEW.md` for live URLs
4. Review `.claude/claude.md` for development notes

---

**Built with Flow Studio's systematic design approach.**
**Last updated:** 2025-11-15
