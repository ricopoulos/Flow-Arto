/**
 * Stylist Agent - Transforms brand configurations into design tokens
 * Uses AI to generate intelligent, accessible, on-trend design systems
 */

import { createAgent } from '../lib/agent.js';
import fs from 'fs/promises';

/**
 * Enhanced Stylist with specialized design generation capabilities
 */
export class StylistAgent {
  constructor() {
    this.agent = createAgent('stylist');
  }

  /**
   * Generate complete design tokens from a brand configuration
   * @param {Object} brandConfig - Brand configuration object
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Complete design tokens
   */
  async generateTokensFromBrand(brandConfig, options = {}) {
    console.log(`\n🎨 Stylist: Generating design tokens for "${brandConfig.meta?.name || 'project'}"...\n`);

    const prompt = this.buildTokenGenerationPrompt(brandConfig, options);

    const result = await this.agent.think(prompt, {
      brandConfig,
      mode: 'token-generation',
      targetYear: 2025
    }, {
      expectJSON: true,
      temperature: 0.8 // Slightly creative for design
    });

    const tokens = result.response;

    // Validate the generated tokens
    this.validateTokens(tokens);

    console.log('✅ Design tokens generated successfully');

    return {
      tokens,
      metadata: {
        generatedBy: 'Stylist',
        brandName: brandConfig.meta?.name,
        generatedAt: new Date().toISOString(),
        duration: result.duration
      }
    };
  }

  /**
   * Build comprehensive prompt for token generation
   * @param {Object} brandConfig - Brand configuration
   * @param {Object} options - Options
   * @returns {string} Prompt
   */
  buildTokenGenerationPrompt(brandConfig, options) {
    return `You are an expert design system architect specializing in 2025 web design trends.

Generate comprehensive design tokens for this brand:

${JSON.stringify(brandConfig, null, 2)}

Requirements:
1. **Color Palette:**
   - Use OKLCH color space for perceptual uniformity (provide hex equivalents)
   - Generate primary, accent, neutral, success, warning, error palettes
   - Each palette needs shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - Match brand's colorTemperature (${brandConfig.visual?.colorTemperature || 'neutral'})
   - Match sophistication level (${brandConfig.visual?.sophistication || 'standard'})
   - CRITICAL: Ensure WCAG AAA contrast ratios (7:1 for text, 4.5:1 for UI)
   - Validate: primary-600 on white >= 7:1, accent-600 on white >= 7:1

2. **Typography:**
   - Select 2-3 font families that match brand voice: ${JSON.stringify(brandConfig.voice?.tone || [])}
   - Consider variable fonts for 2025 (Inter Variable, Outfit Variable, etc.)
   - Create type scale using modular scale (1.25 ratio - major third)
   - Base size: 16px
   - Sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px)
   - Line heights: tight (1.25), normal (1.5), relaxed (1.75)
   - Font weights: 300, 400, 500, 600, 700, 800

3. **Spacing System:**
   - Base unit: 4px
   - Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
   - Match density: ${brandConfig.visual?.density || 'medium'}
   - Section spacing based on density

4. **Motion & Animation:**
   - Duration scale: 75ms, 100ms, 150ms, 200ms, 300ms, 500ms, 700ms
   - Easing functions (cubic-bezier): ease-in, ease-out, ease-in-out, spring
   - Spring physics: mass, stiffness, damping (for smooth interactions)
   - Match brand energy level

5. **Effects:**
   - Shadows: Realistic depth (2025 trend - softer, more subtle)
   - Blur values for glassmorphism
   - Border radius scale (0, 2, 4, 8, 12, 16, 24, full)
   - Opacity scale (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

6. **Components (Token-level):**
   - Button sizes and padding
   - Input field dimensions
   - Card spacing and borders
   - Navigation heights

7. **Accessibility:**
   - Focus ring colors and widths
   - Min touch target: 44x44px
   - Min contrast ratios enforced
   - Reduced motion alternatives

8. **2025 Design Trends to Consider:**
   - Perceptual color (OKLCH)
   - Glassmorphism (blur + transparency)
   - Kinetic typography (variable fonts)
   - Micro-interactions (spring physics)
   - Asymmetric layouts (if brand allows)
   - 3D depth (shadows, transforms)

Output a complete, production-ready design token JSON with this structure:

{
  "project": "Brand Name",
  "generatedBy": "Stylist Agent",
  "version": "1.0.0",
  "aesthetic": "Brief description of the visual approach",
  "colors": {
    "primary": { "50": "#...", "100": "#...", ..., "900": "#..." },
    "accent": { ... },
    "neutral": { ... },
    "success": { ... },
    "warning": { ... },
    "error": { ... },
    "contrast-validation": {
      "primary-on-white": { "ratio": "7.2:1", "wcag-aaa": "pass" },
      "accent-on-white": { "ratio": "7.5:1", "wcag-aaa": "pass" }
    }
  },
  "typography": {
    "fonts": {
      "heading": { "family": "...", "weight": "...", "variable": true/false },
      "body": { ... },
      "mono": { ... }
    },
    "scale": {
      "xs": "12px",
      ...
      "5xl": "48px"
    },
    "lineHeight": { ... },
    "letterSpacing": { ... }
  },
  "spacing": {
    "scale": "4px",
    "values": { "0": "0", "1": "4px", ..., "96": "384px" }
  },
  "motion": {
    "duration": { "fast": "150ms", ..., "slow": "700ms" },
    "easing": {
      "ease-in": "cubic-bezier(...)",
      "spring": "cubic-bezier(...)"
    },
    "spring": {
      "default": { "mass": 1, "stiffness": 170, "damping": 26 },
      "gentle": { ... },
      "bouncy": { ... }
    }
  },
  "effects": {
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      ...
      "2xl": "..."
    },
    "blur": { "sm": "4px", "md": "8px", "lg": "16px", "xl": "24px" },
    "borderRadius": { "none": "0", ..., "full": "9999px" },
    "opacity": { ... }
  },
  "components": {
    "button": {
      "padding": { "sm": "8px 16px", "md": "12px 24px", "lg": "16px 32px" },
      "fontSize": { ... },
      "borderRadius": "..."
    },
    "input": { ... },
    "card": { ... }
  },
  "accessibility": {
    "focusRing": {
      "width": "2px",
      "offset": "2px",
      "color": "accent-500"
    },
    "minTouchTarget": "44px",
    "reducedMotion": true
  }
}

Make it comprehensive, consistent, and aligned with the brand configuration.`;
  }

  /**
   * Generate multiple theme variations from design tokens
   * @param {Object} tokens - Base design tokens
   * @param {number} count - Number of variations to generate
   * @returns {Promise<Array>} Array of theme variations
   */
  async generateThemeVariations(tokens, count = 8) {
    console.log(`\n🎨 Stylist: Generating ${count} theme variations...\n`);

    const prompt = `You are a creative design system architect generating theme variations.

Base Design Tokens:
${JSON.stringify(tokens, null, 2)}

Generate ${count} distinct theme variations that explore different design approaches while maintaining brand coherence.

Each theme should have:
1. **Unique Visual Identity** - Different color combinations, typography styles, spacing approaches
2. **2025 Design Trends** - Glassmorphism, kinetic typography, micro-interactions, 3D depth, etc.
3. **Accessibility** - All themes must maintain WCAG AAA standards
4. **Use Cases** - Different moods/contexts (professional, playful, elegant, bold, minimal, etc.)

Variation approaches:
- Light/Dark modes with unique accent colors
- Different typography hierarchies (type-hero, minimal, editorial)
- Motion variations (subtle, springy, dramatic)
- Layout approaches (grid-heavy, asymmetric, flowing)
- Effect styles (glassmorphism, neumorphism, flat, depth)

Output JSON array of themes:

[
  {
    "id": "theme-slug",
    "name": "Theme Name",
    "description": "What makes this theme unique",
    "mood": "professional" | "playful" | "elegant" | "bold" | "minimal",
    "colors": {
      "primary": "#hex",
      "primaryLight": "#hex",
      "primaryDark": "#hex",
      "accent": "#hex",
      "accentLight": "#hex",
      "accentDark": "#hex",
      "background": "#hex",
      "surface": "#hex",
      "text": "#hex",
      "textMuted": "#hex"
    },
    "fonts": {
      "heading": "Font Family",
      "body": "Font Family",
      "headingWeight": "700",
      "bodyWeight": "400"
    },
    "spacing": {
      "section": "120px",
      "cardGap": "32px",
      "contentPadding": "40px"
    },
    "motion": {
      "duration": "0.3s",
      "easing": "cubic-bezier(...)",
      "springPhysics": { ... }
    },
    "effects": {
      "glassmorphism": true/false,
      "shadows": "dramatic" | "subtle" | "none",
      "borderRadius": "sharp" | "rounded" | "pill",
      "gradient": "linear-gradient(...)",
      "blur": "8px"
    },
    "features": ["Glassmorphism", "Kinetic Typography", "3D Depth", etc.]
  },
  ...
]

Make each theme distinctly different and creatively explore the design space.`;

    const result = await this.agent.think(prompt, {
      tokens,
      mode: 'theme-generation',
      count
    }, {
      expectJSON: true,
      temperature: 0.9, // High creativity
      maxTokens: 8000 // More tokens for multiple themes
    });

    const themes = result.response;

    console.log(`✅ Generated ${themes.length} theme variations`);

    return themes;
  }

  /**
   * Refine a theme based on feedback
   * @param {Object} theme - Theme to refine
   * @param {string} feedback - Refinement feedback
   * @returns {Promise<Object>} Refined theme
   */
  async refineTheme(theme, feedback) {
    const result = await this.agent.refine(theme, feedback);
    return result.response;
  }

  /**
   * Validate design tokens structure and values
   * @param {Object} tokens - Tokens to validate
   * @throws {Error} If validation fails
   */
  validateTokens(tokens) {
    const required = ['colors', 'typography', 'spacing'];

    for (const field of required) {
      if (!tokens[field]) {
        throw new Error(`Missing required token field: ${field}`);
      }
    }

    // Validate color structure
    if (!tokens.colors.primary || !tokens.colors.accent) {
      throw new Error('Missing required color palettes: primary, accent');
    }

    console.log('✓ Token validation passed');
  }

  /**
   * Save design tokens to file
   * @param {Object} tokens - Tokens to save
   * @param {string} outputPath - Output file path
   */
  async saveTokens(tokens, outputPath) {
    await fs.writeFile(outputPath, JSON.stringify(tokens, null, 2));
    console.log(`💾 Design tokens saved to: ${outputPath}`);
  }

  /**
   * Save theme variations to file
   * @param {Array} themes - Themes to save
   * @param {string} outputPath - Output file path
   */
  async saveThemes(themes, outputPath) {
    await fs.writeFile(outputPath, JSON.stringify(themes, null, 2));
    console.log(`💾 Themes saved to: ${outputPath}`);
  }
}

/**
 * Convenience function to create stylist and generate tokens
 * @param {string} brandConfigPath - Path to brand config JSON
 * @param {string} outputPath - Where to save tokens
 * @returns {Promise<Object>} Generated tokens
 */
export async function generateTokens(brandConfigPath, outputPath) {
  const brandConfig = JSON.parse(await fs.readFile(brandConfigPath, 'utf-8'));

  const stylist = new StylistAgent();
  const result = await stylist.generateTokensFromBrand(brandConfig);

  if (outputPath) {
    await stylist.saveTokens(result.tokens, outputPath);
  }

  return result.tokens;
}

/**
 * Convenience function to generate theme variations
 * @param {string} tokensPath - Path to tokens JSON
 * @param {number} count - Number of themes
 * @param {string} outputPath - Where to save themes
 * @returns {Promise<Array>} Generated themes
 */
export async function generateThemes(tokensPath, count = 8, outputPath) {
  const tokens = JSON.parse(await fs.readFile(tokensPath, 'utf-8'));

  const stylist = new StylistAgent();
  const themes = await stylist.generateThemeVariations(tokens, count);

  if (outputPath) {
    await stylist.saveThemes(themes, outputPath);
  }

  return themes;
}
