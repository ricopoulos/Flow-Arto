/**
 * Curator Agent - Quality assurance and validation
 * Ensures design quality, accessibility, and brand alignment
 */

import { createAgent } from '../lib/agent.js';
import fs from 'fs/promises';

export class CuratorAgent {
  constructor() {
    this.agent = createAgent('curator');
  }

  /**
   * Evaluate design tokens for quality and compliance
   * @param {Object} tokens - Design tokens to evaluate
   * @param {Object} brandConfig - Original brand configuration
   * @returns {Promise<Object>} Evaluation report
   */
  async evaluateTokens(tokens, brandConfig) {
    console.log('\n🎯 Curator: Evaluating design tokens...\n');

    const prompt = `Evaluate these design tokens for quality, accessibility, and brand alignment:

Design Tokens:
${JSON.stringify(tokens, null, 2)}

Brand Configuration:
${JSON.stringify(brandConfig, null, 2)}

Evaluation Criteria:
1. **Accessibility**
   - WCAG AAA contrast ratios (7:1 for text, 4.5:1 for UI)
   - Font sizes (minimum 16px for body)
   - Touch targets (minimum 44x44px)
   - Color blindness considerations

2. **Consistency**
   - Color palette coherence
   - Typography scale harmony
   - Spacing system consistency
   - Motion parameters alignment

3. **Brand Alignment**
   - Does the aesthetic match brand voice?
   - Are visual attributes properly expressed?
   - Constraints properly respected?
   - Target audience appropriately addressed?

4. **Technical Quality**
   - Complete token coverage
   - Proper naming conventions
   - Valid CSS values
   - Performance considerations

5. **Modern Standards**
   - 2025 design trends incorporated
   - Progressive enhancement
   - Responsive design support
   - Browser compatibility

Output JSON:
{
  "overallScore": 0.0-1.0,
  "grade": "A+" | "A" | "B" | "C" | "D" | "F",
  "evaluation": {
    "accessibility": {
      "score": 0.0-1.0,
      "issues": ["Issue 1", "Issue 2"],
      "recommendations": ["Recommendation 1"],
      "wcagCompliance": "AAA" | "AA" | "A" | "Fail"
    },
    "consistency": { ... },
    "brandAlignment": { ... },
    "technicalQuality": { ... },
    "modernStandards": { ... }
  },
  "strengths": [
    "What's working well"
  ],
  "weaknesses": [
    "What needs improvement"
  ],
  "criticalIssues": [
    "Must-fix items"
  ],
  "improvements": [
    {
      "category": "accessibility" | "consistency" | "brand" | "technical",
      "priority": "high" | "medium" | "low",
      "issue": "What's wrong",
      "fix": "How to fix it",
      "impact": "Why it matters"
    }
  ],
  "summary": "Overall assessment and recommendations"
}`;

    const result = await this.agent.think(prompt, {
      tokens,
      brandConfig,
      mode: 'token-evaluation'
    }, {
      expectJSON: true,
      temperature: 0.3 // Low temperature for objective evaluation
    });

    return result.response;
  }

  /**
   * Evaluate theme variations
   * @param {Array} themes - Themes to evaluate
   * @param {Object} tokens - Base tokens
   * @param {Object} brandConfig - Brand configuration
   * @returns {Promise<Object>} Theme evaluation
   */
  async evaluateThemes(themes, tokens, brandConfig) {
    console.log(`\n🎯 Curator: Evaluating ${themes.length} themes...\n`);

    const prompt = `Evaluate these theme variations for quality, diversity, and brand alignment:

Themes:
${JSON.stringify(themes, null, 2)}

Base Tokens:
${JSON.stringify(tokens, null, 2)}

Brand Configuration:
${JSON.stringify(brandConfig, null, 2)}

Evaluation Criteria:
1. **Diversity** - Do themes explore different design directions?
2. **Quality** - Is each theme well-executed?
3. **Accessibility** - Do all themes meet WCAG AAA?
4. **Brand Alignment** - Do themes stay true to the brand?
5. **Creativity** - Are 2025 design trends incorporated?
6. **Usability** - Are themes practical and functional?

For each theme, provide:
- Individual score
- Strengths and weaknesses
- Specific recommendations

Then rank themes from best to worst.

Output JSON:
{
  "overallScore": 0.0-1.0,
  "diversityScore": 0.0-1.0,
  "averageQuality": 0.0-1.0,
  "themeEvaluations": [
    {
      "themeId": "...",
      "themeName": "...",
      "score": 0.0-1.0,
      "grade": "A+" | "A" | "B" | "C" | "D",
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1"],
      "accessibility": "pass" | "fail",
      "brandAlignment": "excellent" | "good" | "fair" | "poor",
      "creativity": "innovative" | "solid" | "conventional" | "derivative",
      "recommendations": ["Improvement 1"]
    }
  ],
  "rankedThemes": [
    {
      "rank": 1,
      "themeId": "...",
      "score": 0.95,
      "reason": "Why it ranked here"
    }
  ],
  "topThemes": ["theme-id-1", "theme-id-2", "theme-id-3"],
  "insights": {
    "bestAspects": ["What's working across themes"],
    "commonIssues": ["Recurring problems"],
    "opportunities": ["What could be explored more"]
  },
  "summary": "Overall assessment and recommendations"
}`;

    const result = await this.agent.think(prompt, {
      themes,
      tokens,
      brandConfig,
      mode: 'theme-evaluation'
    }, {
      expectJSON: true,
      temperature: 0.3,
      maxTokens: 8000
    });

    return result.response;
  }

  /**
   * Validate contrast ratios (helper function)
   * @param {string} foreground - Foreground color (hex)
   * @param {string} background - Background color (hex)
   * @returns {Object} Contrast analysis
   */
  calculateContrast(foreground, background) {
    // Simplified contrast calculation
    // In production, use a proper WCAG contrast library
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const getLuminance = (rgb) => {
      const { r, g, b } = rgb;
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);

    if (!fg || !bg) return { ratio: 0, wcag: 'fail' };

    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: ratio.toFixed(2),
      wcagAA: ratio >= 4.5 ? 'pass' : 'fail',
      wcagAAA: ratio >= 7 ? 'pass' : 'fail'
    };
  }

  /**
   * Generate markdown report from evaluation
   * @param {Object} evaluation - Evaluation results
   * @param {string} title - Report title
   * @returns {string} Markdown report
   */
  generateMarkdownReport(evaluation, title) {
    let report = `# ${title}\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n`;
    report += `**By:** Curator Agent\n`;
    report += `**Overall Score:** ${(evaluation.overallScore * 100).toFixed(1)}% (${evaluation.grade})\n\n`;

    report += `## Summary\n\n${evaluation.summary}\n\n`;

    if (evaluation.strengths?.length > 0) {
      report += `## Strengths\n\n`;
      evaluation.strengths.forEach(s => report += `- ${s}\n`);
      report += `\n`;
    }

    if (evaluation.weaknesses?.length > 0) {
      report += `## Weaknesses\n\n`;
      evaluation.weaknesses.forEach(w => report += `- ${w}\n`);
      report += `\n`;
    }

    if (evaluation.criticalIssues?.length > 0) {
      report += `## Critical Issues\n\n`;
      evaluation.criticalIssues.forEach(i => report += `- ⚠️ ${i}\n`);
      report += `\n`;
    }

    if (evaluation.improvements?.length > 0) {
      report += `## Recommended Improvements\n\n`;
      evaluation.improvements.forEach(imp => {
        report += `### ${imp.priority.toUpperCase()}: ${imp.issue}\n`;
        report += `**Fix:** ${imp.fix}\n`;
        report += `**Impact:** ${imp.impact}\n\n`;
      });
    }

    return report;
  }

  /**
   * Save evaluation report
   * @param {Object} evaluation - Evaluation results
   * @param {string} outputPath - Output path
   */
  async saveReport(evaluation, outputPath) {
    const report = {
      ...evaluation,
      generatedBy: 'Curator',
      generatedAt: new Date().toISOString()
    };

    // Save JSON
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    console.log(`💾 Evaluation report saved to: ${outputPath}`);

    // Also save markdown version
    const mdPath = outputPath.replace('.json', '.md');
    const markdown = this.generateMarkdownReport(evaluation, 'Design Evaluation Report');
    await fs.writeFile(mdPath, markdown);
    console.log(`💾 Markdown report saved to: ${mdPath}`);
  }
}
