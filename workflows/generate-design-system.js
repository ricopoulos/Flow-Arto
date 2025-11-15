/**
 * Complete Design System Generation Workflow
 * Orchestrates Researcher, Stylist, and Curator agents
 * Implements the SPARC methodology (Specification, Pseudocode, Architecture, Refinement, Code)
 */

import { AgentSwarm } from '../lib/swarm.js';
import { ResearcherAgent } from '../agents/researcher.js';
import { StylistAgent } from '../agents/stylist.js';
import { CuratorAgent } from '../agents/curator.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Complete design system generation pipeline
 * @param {Object} config - Workflow configuration
 * @returns {Promise<Object>} Complete design system
 */
export async function generateDesignSystem(config) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🌊 FLOW STUDIO - AI Design System Generation              ║
║                                                              ║
║   Intelligent agent swarm creating your design system...    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

  const startTime = Date.now();

  // Load brand configuration
  const brandConfig = typeof config.brandConfig === 'string'
    ? JSON.parse(await fs.readFile(config.brandConfig, 'utf-8'))
    : config.brandConfig;

  console.log(`\n📋 Brand: ${brandConfig.meta?.name || 'Unnamed Project'}`);
  console.log(`📋 Sector: ${brandConfig.meta?.sector || 'General'}\n`);

  // Initialize agents
  const researcher = new ResearcherAgent();
  const stylist = new StylistAgent();
  const curator = new CuratorAgent();

  const results = {
    brandConfig,
    steps: {},
    timestamps: {}
  };

  try {
    // ========================================
    // PHASE 1: SPECIFICATION (Research)
    // ========================================
    console.log('\n📊 PHASE 1: SPECIFICATION\n');

    if (config.includeTrendResearch !== false) {
      const trendAnalysis = await researcher.analyzeTrends();
      results.steps.trendAnalysis = trendAnalysis;
      results.timestamps.trendAnalysis = new Date();

      if (config.outputDir) {
        await researcher.saveResearch(
          trendAnalysis,
          path.join(config.outputDir, 'trend-analysis.json')
        );
      }
    }

    const brandAnalysis = await researcher.analyzeBrand(brandConfig);
    results.steps.brandAnalysis = brandAnalysis;
    results.timestamps.brandAnalysis = new Date();

    if (config.outputDir) {
      await researcher.saveResearch(
        brandAnalysis,
        path.join(config.outputDir, 'brand-analysis.json')
      );
    }

    // ========================================
    // PHASE 2: ARCHITECTURE (Design Tokens)
    // ========================================
    console.log('\n🏗️  PHASE 2: ARCHITECTURE\n');

    const tokenResult = await stylist.generateTokensFromBrand(brandConfig, {
      trendAnalysis: results.steps.trendAnalysis,
      brandAnalysis: brandAnalysis
    });

    results.steps.designTokens = tokenResult.tokens;
    results.timestamps.designTokens = new Date();

    if (config.outputDir) {
      await stylist.saveTokens(
        tokenResult.tokens,
        path.join(config.outputDir, 'design-tokens.json')
      );
    }

    // ========================================
    // PHASE 3: CODE (Theme Generation)
    // ========================================
    console.log('\n💻 PHASE 3: CODE (Theme Generation)\n');

    const themeCount = config.themeCount || 20;
    const themes = await stylist.generateThemeVariations(
      tokenResult.tokens,
      themeCount
    );

    results.steps.themes = themes;
    results.timestamps.themes = new Date();

    if (config.outputDir) {
      await stylist.saveThemes(
        themes,
        path.join(config.outputDir, 'themes.json')
      );
    }

    // ========================================
    // PHASE 4: REFINEMENT (Quality Check)
    // ========================================
    console.log('\n🎯 PHASE 4: REFINEMENT (Quality Assurance)\n');

    // Evaluate tokens
    const tokenEvaluation = await curator.evaluateTokens(
      tokenResult.tokens,
      brandConfig
    );

    results.steps.tokenEvaluation = tokenEvaluation;
    results.timestamps.tokenEvaluation = new Date();

    console.log(`\n📊 Token Quality Score: ${(tokenEvaluation.overallScore * 100).toFixed(1)}% (${tokenEvaluation.grade})\n`);

    if (config.outputDir) {
      await curator.saveReport(
        tokenEvaluation,
        path.join(config.outputDir, 'token-evaluation.json')
      );
    }

    // Evaluate themes
    const themeEvaluation = await curator.evaluateThemes(
      themes,
      tokenResult.tokens,
      brandConfig
    );

    results.steps.themeEvaluation = themeEvaluation;
    results.timestamps.themeEvaluation = new Date();

    console.log(`\n📊 Theme Quality Score: ${(themeEvaluation.overallScore * 100).toFixed(1)}%`);
    console.log(`📊 Top 3 Themes: ${themeEvaluation.topThemes.slice(0, 3).join(', ')}\n`);

    if (config.outputDir) {
      await curator.saveReport(
        themeEvaluation,
        path.join(config.outputDir, 'theme-evaluation.json')
      );
    }

    // ========================================
    // ITERATIVE REFINEMENT (if issues found)
    // ========================================
    if (tokenEvaluation.criticalIssues?.length > 0 && config.autoRefine !== false) {
      console.log('\n🔄 Critical issues detected, refining...\n');

      const refinedTokens = await stylist.agent.think(
        `Refine these design tokens to fix these critical issues: ${tokenEvaluation.criticalIssues.join(', ')}`,
        {
          currentTokens: tokenResult.tokens,
          issues: tokenEvaluation.criticalIssues,
          improvements: tokenEvaluation.improvements
        },
        { expectJSON: true }
      );

      results.steps.refinedTokens = refinedTokens.response;
      results.timestamps.refinedTokens = new Date();

      if (config.outputDir) {
        await stylist.saveTokens(
          refinedTokens.response,
          path.join(config.outputDir, 'design-tokens-refined.json')
        );
      }
    }

    // ========================================
    // FINAL SUMMARY
    // ========================================
    const duration = Date.now() - startTime;

    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ✅ DESIGN SYSTEM GENERATION COMPLETE                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📦 Deliverables:
   • Design Tokens: ${Object.keys(tokenResult.tokens).length} categories
   • Themes Generated: ${themes.length} variations
   • Token Quality: ${tokenEvaluation.grade} (${(tokenEvaluation.overallScore * 100).toFixed(1)}%)
   • Theme Quality: ${(themeEvaluation.overallScore * 100).toFixed(1)}%
   • Top Themes: ${themeEvaluation.topThemes.slice(0, 3).join(', ')}

⏱️  Total Time: ${(duration / 1000).toFixed(2)}s

📁 Output Directory: ${config.outputDir || 'Not specified'}

🎨 Next Steps:
   1. Review generated design tokens
   2. Explore theme variations
   3. Read evaluation reports for insights
   4. Generate components (coming soon)
   5. Deploy to your project!

`);

    // Save complete workflow result
    if (config.outputDir) {
      const workflowSummary = {
        project: brandConfig.meta?.name,
        generatedAt: new Date().toISOString(),
        duration: `${(duration / 1000).toFixed(2)}s`,
        quality: {
          tokens: {
            score: tokenEvaluation.overallScore,
            grade: tokenEvaluation.grade
          },
          themes: {
            score: themeEvaluation.overallScore,
            count: themes.length,
            topThemes: themeEvaluation.topThemes
          }
        },
        files: {
          brandConfig: 'brand-config.json',
          trendAnalysis: 'trend-analysis.json',
          brandAnalysis: 'brand-analysis.json',
          designTokens: 'design-tokens.json',
          themes: 'themes.json',
          tokenEvaluation: 'token-evaluation.json',
          themeEvaluation: 'theme-evaluation.json'
        }
      };

      await fs.writeFile(
        path.join(config.outputDir, 'workflow-summary.json'),
        JSON.stringify(workflowSummary, null, 2)
      );

      // Copy brand config for reference
      await fs.writeFile(
        path.join(config.outputDir, 'brand-config.json'),
        JSON.stringify(brandConfig, null, 2)
      );
    }

    return {
      success: true,
      duration,
      brandName: brandConfig.meta?.name,
      tokens: tokenResult.tokens,
      themes,
      topThemes: themeEvaluation.topThemes,
      quality: {
        tokens: tokenEvaluation.overallScore,
        themes: themeEvaluation.overallScore
      },
      outputDir: config.outputDir,
      results
    };

  } catch (error) {
    console.error('\n❌ Workflow failed:', error.message);
    console.error(error.stack);

    return {
      success: false,
      error: error.message,
      results
    };
  }
}

/**
 * Quick workflow - generate tokens only
 * @param {string} brandConfigPath - Path to brand config
 * @param {string} outputPath - Where to save tokens
 * @returns {Promise<Object>} Design tokens
 */
export async function quickGenerateTokens(brandConfigPath, outputPath) {
  const brandConfig = JSON.parse(await fs.readFile(brandConfigPath, 'utf-8'));
  const stylist = new StylistAgent();

  const result = await stylist.generateTokensFromBrand(brandConfig);

  if (outputPath) {
    await stylist.saveTokens(result.tokens, outputPath);
  }

  return result.tokens;
}

/**
 * Quick workflow - generate themes from existing tokens
 * @param {string} tokensPath - Path to tokens file
 * @param {number} count - Number of themes
 * @param {string} outputPath - Where to save themes
 * @returns {Promise<Array>} Themes
 */
export async function quickGenerateThemes(tokensPath, count, outputPath) {
  const tokens = JSON.parse(await fs.readFile(tokensPath, 'utf-8'));
  const stylist = new StylistAgent();

  const themes = await stylist.generateThemeVariations(tokens, count);

  if (outputPath) {
    await stylist.saveThemes(themes, outputPath);
  }

  return themes;
}
