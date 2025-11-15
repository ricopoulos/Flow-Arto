/**
 * Researcher Agent - Analyzes design trends and provides intelligence
 * Brings 2025 design knowledge to the swarm
 */

import { createAgent } from '../lib/agent.js';
import fs from 'fs/promises';

export class ResearcherAgent {
  constructor() {
    this.agent = createAgent('researcher');
  }

  /**
   * Research current design trends for 2025
   * @param {Object} options - Research options
   * @returns {Promise<Object>} Trend analysis
   */
  async analyzeTrends(options = {}) {
    console.log('\n🔬 Researcher: Analyzing 2025 design trends...\n');

    const prompt = `As a design trend researcher, analyze the current state of web design in 2025.

Focus areas:
1. **Visual Aesthetics**
   - Color trends (perceptual color spaces like OKLCH, gradient styles)
   - Typography (variable fonts, kinetic typography, bold weights)
   - Layout patterns (asymmetric grids, 3D layouts, overlapping elements)
   - Textures and effects (glassmorphism, neumorphism, depth)

2. **Interaction Patterns**
   - Micro-interactions (spring physics, playful animations)
   - Scroll effects (parallax, reveal, morphing)
   - Hover states (3D transforms, color shifts)
   - Loading states (skeleton screens, progressive enhancement)

3. **Technical Approaches**
   - CSS features (container queries, :has(), cascade layers)
   - Performance (Core Web Vitals, optimization)
   - Accessibility (WCAG 2.2, inclusive design)
   - Responsive design (fluid typography, clamp())

4. **What's OUT (Outdated)**
   - Flat design extremes
   - Hero images with overlay text
   - Generic stock photos
   - Harsh shadows
   - Overused gradients
   - Cookie-cutter layouts

5. **What's IN (2025)**
   - Glassmorphism and depth
   - Kinetic typography
   - 3D elements and transforms
   - Organic shapes and curves
   - Variable fonts
   - Spring-based animations
   - Asymmetric layouts
   - Bold color blocking

Provide a comprehensive analysis with specific recommendations.

Output JSON:
{
  "year": 2025,
  "trends": {
    "visual": [
      {
        "trend": "Trend name",
        "description": "What it is",
        "implementation": "How to implement",
        "examples": ["Example 1", "Example 2"]
      }
    ],
    "interaction": [...],
    "technical": [...]
  },
  "deprecated": [
    "What not to use anymore"
  ],
  "recommendations": {
    "colors": "Specific color guidance",
    "typography": "Font and type guidance",
    "layout": "Layout guidance",
    "motion": "Animation guidance"
  },
  "tooling": {
    "cssFeatures": ["Feature 1", "Feature 2"],
    "libraries": ["Library 1", "Library 2"],
    "fonts": ["Font 1", "Font 2"]
  }
}`;

    const result = await this.agent.think(prompt, {
      mode: 'trend-analysis'
    }, {
      expectJSON: true,
      temperature: 0.7
    });

    return result.response;
  }

  /**
   * Analyze a brand configuration and provide design recommendations
   * @param {Object} brandConfig - Brand configuration
   * @returns {Promise<Object>} Brand analysis
   */
  async analyzeBrand(brandConfig) {
    console.log(`\n🔬 Researcher: Analyzing brand "${brandConfig.meta?.name}"...\n`);

    const prompt = `Analyze this brand configuration and provide comprehensive design recommendations:

${JSON.stringify(brandConfig, null, 2)}

Consider:
1. Brand voice and how it should translate visually
2. Target audience and their expectations
3. Sector/industry design conventions and opportunities to differentiate
4. Visual attributes and how to achieve them
5. Constraints and what they mean for design decisions

Provide actionable insights for the design team.

Output JSON:
{
  "brandName": "...",
  "sector": "...",
  "analysis": {
    "voice": "How the brand voice should influence design",
    "audience": "What the audience expects and needs",
    "differentiation": "How to stand out in the sector"
  },
  "recommendations": {
    "colorPalette": {
      "primary": "Recommendation and reasoning",
      "accent": "...",
      "mood": "warm/cool/neutral and why"
    },
    "typography": {
      "heading": "Font recommendations with reasoning",
      "body": "...",
      "style": "modern/classic/editorial/etc and why"
    },
    "layout": {
      "density": "spacious/balanced/compact and why",
      "hierarchy": "How to organize information",
      "grid": "Grid recommendations"
    },
    "motion": {
      "energy": "subtle/moderate/energetic and why",
      "style": "Type of animations to use"
    },
    "effects": {
      "shadows": "How to use depth",
      "special": "Glassmorphism, 3D, etc - what fits the brand"
    }
  },
  "mustAvoid": [
    "Things that would contradict the brand"
  ],
  "opportunities": [
    "Creative opportunities unique to this brand"
  ]
}`;

    const result = await this.agent.think(prompt, {
      brandConfig,
      mode: 'brand-analysis'
    }, {
      expectJSON: true,
      temperature: 0.6
    });

    return result.response;
  }

  /**
   * Research color combinations for a specific mood/temperature
   * @param {string} mood - Color mood (warm, cool, neutral, vibrant, etc.)
   * @param {string} sophistication - Sophistication level
   * @returns {Promise<Object>} Color recommendations
   */
  async researchColorPalettes(mood, sophistication) {
    console.log(`\n🔬 Researcher: Finding color palettes (${mood}, ${sophistication})...\n`);

    const prompt = `Research and recommend color palettes for web design with these parameters:

Mood/Temperature: ${mood}
Sophistication Level: ${sophistication}

Requirements:
- Use OKLCH color space for perceptual uniformity
- Provide 3-5 palette options
- Each palette needs primary, accent, and neutral colors
- Ensure WCAG AAA accessibility (7:1 contrast)
- Consider 2025 color trends
- Explain the psychological impact of each palette

Output JSON with palette recommendations including hex values, OKLCH values, and usage guidance.

{
  "palettes": [
    {
      "name": "Palette name",
      "description": "What mood/feeling it creates",
      "primary": {
        "hex": "#...",
        "oklch": "oklch(L C H)",
        "usage": "Where to use it"
      },
      "accent": { ... },
      "neutral": { ... },
      "psychology": "Color psychology explanation",
      "bestFor": ["Use case 1", "Use case 2"]
    }
  ]
}`;

    const result = await this.agent.think(prompt, {
      mood,
      sophistication,
      mode: 'color-research'
    }, {
      expectJSON: true
    });

    return result.response;
  }

  /**
   * Research typography pairings
   * @param {Array<string>} toneKeywords - Brand tone keywords
   * @returns {Promise<Object>} Typography recommendations
   */
  async researchTypography(toneKeywords) {
    console.log(`\n🔬 Researcher: Researching typography for tone: ${toneKeywords.join(', ')}...\n`);

    const prompt = `Research font pairings that match these tone keywords: ${toneKeywords.join(', ')}

Consider:
- 2025 typography trends (variable fonts, kinetic typography)
- Pairing principles (contrast, harmony, hierarchy)
- Performance (web font loading, variable fonts)
- Accessibility (readability, legibility)

Focus on modern, high-quality fonts available via Google Fonts or similar.

Output JSON:
{
  "pairings": [
    {
      "name": "Pairing name",
      "heading": {
        "font": "Font name",
        "variable": true/false,
        "weights": [300, 400, 700],
        "characteristics": "What makes it good for headings"
      },
      "body": {
        "font": "Font name",
        "variable": true/false,
        "weights": [400, 500],
        "characteristics": "What makes it good for body text"
      },
      "rationale": "Why this pairing works",
      "tone": "Tone conveyed",
      "bestFor": ["Use case 1", "Use case 2"]
    }
  ],
  "recommendations": "General guidance for using these pairings"
}`;

    const result = await this.agent.think(prompt, {
      toneKeywords,
      mode: 'typography-research'
    }, {
      expectJSON: true
    });

    return result.response;
  }

  /**
   * Save research results to file
   * @param {Object} research - Research results
   * @param {string} outputPath - Output path
   */
  async saveResearch(research, outputPath) {
    const output = {
      ...research,
      generatedBy: 'Researcher',
      generatedAt: new Date().toISOString()
    };

    await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
    console.log(`💾 Research saved to: ${outputPath}`);
  }
}
