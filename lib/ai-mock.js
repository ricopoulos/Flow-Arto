/**
 * Mock AI Layer - For testing without API costs
 * Use this for development/testing, switch to real AI for production
 */

/**
 * Mock Claude call - returns structured responses without API
 * @param {string} prompt - The prompt
 * @param {Object} options - Options
 * @returns {Promise<Object>} Mock response
 */
export async function callClaude(prompt, options = {}) {
  console.log('🔄 MOCK MODE: Simulating AI response...');

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    content: getMockResponse(prompt, options),
    usage: { input_tokens: 1000, output_tokens: 500 },
    model: 'mock-model',
    stopReason: 'end_turn'
  };
}

/**
 * Mock Claude JSON call
 * @param {string} prompt - The prompt
 * @param {Object} options - Options
 * @returns {Promise<Object>} Mock JSON response
 */
export async function callClaudeJSON(prompt, options = {}) {
  const response = await callClaude(prompt, options);
  return getMockJSONResponse(prompt, options);
}

function getMockResponse(prompt, options) {
  if (options.expectJSON) {
    return JSON.stringify(getMockJSONResponse(prompt, options), null, 2);
  }
  return 'This is a mock response. Replace lib/ai.js with lib/ai-mock.js to test without API costs.';
}

function getMockJSONResponse(prompt, options) {
  // Detect what type of response is needed
  if (prompt.includes('trend') || prompt.includes('2025')) {
    return getMockTrendAnalysis();
  }
  if (prompt.includes('brand') && prompt.includes('analysis')) {
    return getMockBrandAnalysis();
  }
  if (prompt.includes('design tokens') || prompt.includes('token')) {
    return getMockDesignTokens();
  }
  if (prompt.includes('theme variations') || prompt.includes('themes')) {
    return getMockThemes();
  }
  if (prompt.includes('evaluate') || prompt.includes('quality')) {
    return getMockEvaluation();
  }

  return { mock: true, message: 'Mock response' };
}

function getMockTrendAnalysis() {
  return {
    year: 2025,
    trends: {
      visual: [
        {
          trend: "OKLCH Perceptual Color",
          description: "Using perceptually uniform color spaces",
          implementation: "Use oklch() in CSS or convert hex to OKLCH",
          examples: ["Smooth gradients", "Accessible palettes"]
        },
        {
          trend: "Glassmorphism",
          description: "Frosted glass effects with blur and transparency",
          implementation: "backdrop-filter: blur() with semi-transparent backgrounds",
          examples: ["macOS Big Sur style", "iOS translucency"]
        }
      ],
      interaction: [
        {
          trend: "Spring Physics",
          description: "Natural motion using spring-based animations",
          implementation: "Use spring physics libraries or custom cubic-bezier",
          examples: ["Smooth interactions", "Bouncy buttons"]
        }
      ],
      technical: [
        {
          trend: "Variable Fonts",
          description: "Single font file with multiple variations",
          implementation: "Use font-variation-settings CSS property",
          examples: ["Inter Variable", "Recursive"]
        }
      ]
    },
    deprecated: ["Flat design extremes", "Hero images with overlay", "Harsh shadows"],
    recommendations: {
      colors: "Use OKLCH, ensure AAA contrast",
      typography: "Variable fonts, bold weights",
      layout: "Asymmetric grids, overlapping elements",
      motion: "Spring physics, subtle micro-interactions"
    }
  };
}

function getMockBrandAnalysis() {
  return {
    brandName: "Flow Studio",
    sector: "AI-Powered Design Tools",
    analysis: {
      voice: "Technical and capable - should use clean, precise design",
      audience: "Design-conscious developers expect quality",
      differentiation: "Stand out through intelligence, not flashiness"
    },
    recommendations: {
      colorPalette: {
        primary: "Cool neutrals (slate/gray) for technical feel",
        accent: "Blue for trust and intelligence",
        mood: "cool-neutral"
      },
      typography: {
        heading: "Inter or similar - clean, technical",
        body: "Inter for consistency",
        style: "modern and precise"
      },
      layout: {
        density: "calm-medium - give content room to breathe",
        hierarchy: "Clear, logical structure",
        grid: "Systematic, not chaotic"
      }
    }
  };
}

function getMockDesignTokens() {
  return {
    project: "Mock Project",
    generatedBy: "Mock Stylist Agent",
    version: "1.0.0",
    aesthetic: "Clean, modern, accessible",
    colors: {
      primary: {
        50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0",
        300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b",
        600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a"
      },
      accent: {
        50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe",
        300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6",
        600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a"
      }
    },
    typography: {
      fonts: {
        heading: { family: "Inter", weight: "700" },
        body: { family: "Inter", weight: "400" }
      },
      scale: {
        xs: "12px", sm: "14px", base: "16px",
        lg: "18px", xl: "20px", "2xl": "24px",
        "3xl": "30px", "4xl": "36px", "5xl": "48px"
      }
    },
    spacing: {
      scale: "4px",
      values: {
        0: "0", 1: "4px", 2: "8px", 3: "12px", 4: "16px",
        5: "20px", 6: "24px", 8: "32px", 10: "40px"
      }
    }
  };
}

function getMockThemes() {
  return [
    {
      id: "mock-professional",
      name: "Professional Blue",
      description: "Clean, trustworthy design",
      mood: "professional",
      colors: {
        primary: "#475569", primaryLight: "#64748b", primaryDark: "#334155",
        accent: "#2563eb", accentLight: "#3b82f6", accentDark: "#1d4ed8",
        background: "#ffffff", surface: "#f8fafc",
        text: "#0f172a", textMuted: "#64748b"
      },
      fonts: {
        heading: "Inter", body: "Inter",
        headingWeight: "700", bodyWeight: "400"
      },
      features: ["Clean", "Professional", "Accessible"]
    },
    {
      id: "mock-dark",
      name: "Dark Mode",
      description: "Modern dark theme",
      mood: "professional",
      colors: {
        primary: "#3b82f6", primaryLight: "#60a5fa", primaryDark: "#2563eb",
        accent: "#06b6d4", accentLight: "#22d3ee", accentDark: "#0891b2",
        background: "#0f172a", surface: "#1e293b",
        text: "#f1f5f9", textMuted: "#94a3b8"
      },
      fonts: {
        heading: "Inter", body: "Inter",
        headingWeight: "700", bodyWeight: "400"
      },
      features: ["Dark", "Modern", "High Contrast"]
    }
  ];
}

function getMockEvaluation() {
  return {
    overallScore: 0.92,
    grade: "A",
    evaluation: {
      accessibility: {
        score: 0.95,
        issues: [],
        recommendations: ["Excellent contrast ratios"],
        wcagCompliance: "AAA"
      },
      consistency: {
        score: 0.90,
        issues: ["Minor spacing inconsistencies"],
        recommendations: ["Review spacing scale"]
      }
    },
    strengths: ["Excellent accessibility", "Clean design", "Good consistency"],
    weaknesses: ["Could explore more creative options"],
    criticalIssues: [],
    improvements: [],
    summary: "High-quality design system with excellent accessibility"
  };
}

export const callClaudeWithRetry = callClaude;
export const callClaudeBatch = async (prompts) => prompts.map(() => callClaude());
