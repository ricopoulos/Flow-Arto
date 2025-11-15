#!/usr/bin/env node

/**
 * Flow Studio CLI - AI-Powered Design System Generator
 * Command-line interface for running agent workflows
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { generateDesignSystem, quickGenerateTokens, quickGenerateThemes } from '../workflows/generate-design-system.js';
import { AgentSwarm } from '../lib/swarm.js';
import { getMemoryStats } from '../lib/memory.js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables
dotenv.config();

const program = new Command();

program
  .name('flow-studio')
  .description('AI-powered design system generator using intelligent agent swarm')
  .version('2.0.0');

// ========================================
// Main Generation Command
// ========================================
program
  .command('generate')
  .description('Generate complete design system from brand configuration')
  .argument('<brand-config>', 'Path to brand configuration JSON file')
  .option('-o, --output <dir>', 'Output directory for generated files', './output')
  .option('-t, --themes <count>', 'Number of theme variations to generate', '20')
  .option('--no-trends', 'Skip trend research phase')
  .option('--no-refine', 'Disable automatic refinement')
  .action(async (brandConfigPath, options) => {
    console.log(chalk.cyan.bold('\n🌊 Flow Studio - AI Design System Generator\n'));

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error(chalk.red('❌ Error: ANTHROPIC_API_KEY not found in environment'));
      console.log(chalk.yellow('\n💡 Create a .env file with your Anthropic API key:'));
      console.log(chalk.gray('   ANTHROPIC_API_KEY=your_key_here\n'));
      process.exit(1);
    }

    const spinner = ora('Initializing agent swarm...').start();

    try {
      // Ensure output directory exists
      await fs.mkdir(options.output, { recursive: true });

      spinner.succeed(chalk.green('Agent swarm initialized'));

      const result = await generateDesignSystem({
        brandConfig: brandConfigPath,
        outputDir: options.output,
        themeCount: parseInt(options.themes),
        includeTrendResearch: options.trends !== false,
        autoRefine: options.refine !== false
      });

      if (result.success) {
        console.log(chalk.green.bold('\n✅ Design system generated successfully!\n'));
        console.log(chalk.cyan(`📁 Output: ${result.outputDir}`));
        console.log(chalk.cyan(`🎨 Themes: ${result.themes.length} variations`));
        console.log(chalk.cyan(`⭐ Quality: ${(result.quality.tokens * 100).toFixed(1)}% (tokens), ${(result.quality.themes * 100).toFixed(1)}% (themes)`));
      } else {
        console.error(chalk.red('\n❌ Generation failed:'), result.error);
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(chalk.red('Generation failed'));
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

// ========================================
// Quick Commands
// ========================================
program
  .command('tokens')
  .description('Generate design tokens only (quick)')
  .argument('<brand-config>', 'Path to brand configuration JSON')
  .option('-o, --output <file>', 'Output file path', './design-tokens.json')
  .action(async (brandConfigPath, options) => {
    const spinner = ora('Generating design tokens...').start();

    try {
      const tokens = await quickGenerateTokens(brandConfigPath, options.output);
      spinner.succeed(chalk.green('Design tokens generated'));
      console.log(chalk.cyan(`📁 Saved to: ${options.output}`));
    } catch (error) {
      spinner.fail(chalk.red('Token generation failed'));
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('themes')
  .description('Generate theme variations from existing tokens')
  .argument('<tokens-file>', 'Path to design tokens JSON')
  .option('-c, --count <number>', 'Number of themes to generate', '20')
  .option('-o, --output <file>', 'Output file path', './themes.json')
  .action(async (tokensPath, options) => {
    const spinner = ora(`Generating ${options.count} theme variations...`).start();

    try {
      const themes = await quickGenerateThemes(tokensPath, parseInt(options.count), options.output);
      spinner.succeed(chalk.green(`${themes.length} themes generated`));
      console.log(chalk.cyan(`📁 Saved to: ${options.output}`));
    } catch (error) {
      spinner.fail(chalk.red('Theme generation failed'));
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

// ========================================
// Swarm Management
// ========================================
program
  .command('swarm')
  .description('Manage agent swarm')
  .argument('<action>', 'Action: init, status, stats')
  .action(async (action) => {
    switch (action) {
      case 'init': {
        console.log(chalk.cyan('\n🐝 Initializing Flow Studio Swarm...\n'));
        const swarm = AgentSwarm.createFlowStudioSwarm();
        const stats = swarm.getStats();
        console.log(chalk.green(`✅ Swarm initialized with ${stats.agentCount} agents`));
        stats.agents.forEach(agent => {
          console.log(chalk.gray(`   • ${agent.name} (${agent.role})`));
        });
        break;
      }

      case 'stats': {
        const agents = ['researcher', 'stylist', 'curator', 'arto', 'builder', 'maestro'];
        console.log(chalk.cyan('\n📊 Agent Memory Statistics\n'));

        for (const agent of agents) {
          const stats = await getMemoryStats(agent);
          if (stats.totalMemories > 0) {
            console.log(chalk.white(`${agent.padEnd(12)} ${stats.totalMemories} memories, avg ${stats.avgDuration.toFixed(0)}ms`));
          }
        }
        break;
      }

      default:
        console.log(chalk.red(`Unknown action: ${action}`));
        console.log(chalk.yellow('Available actions: init, stats'));
    }
  });

// ========================================
// Info Commands
// ========================================
program
  .command('info')
  .description('Show Flow Studio information')
  .action(() => {
    console.log(chalk.cyan.bold('\n🌊 Flow Studio v2.0.0\n'));
    console.log('AI-powered design system generator using intelligent agent swarm\n');
    console.log(chalk.white('Available Agents:'));
    console.log(chalk.gray('  • Researcher  - Design trend analysis & research'));
    console.log(chalk.gray('  • Stylist     - Design token & theme generation'));
    console.log(chalk.gray('  • Arto        - UX strategy & layout design'));
    console.log(chalk.gray('  • Builder     - Component generation'));
    console.log(chalk.gray('  • Curator     - Quality assurance & validation'));
    console.log(chalk.gray('  • Maestro     - Workflow orchestration'));
    console.log();
    console.log(chalk.white('Powered by:'));
    console.log(chalk.gray('  • Claude Sonnet 4.5 (Anthropic)'));
    console.log(chalk.gray('  • Swarm Intelligence Architecture'));
    console.log(chalk.gray('  • SPARC Methodology'));
    console.log();
  });

program
  .command('example')
  .description('Show example usage')
  .action(() => {
    console.log(chalk.cyan.bold('\n📚 Flow Studio Examples\n'));
    console.log(chalk.white('1. Generate complete design system:'));
    console.log(chalk.gray('   flow-studio generate brands/flow-studio.json -o output/flow-studio\n'));
    console.log(chalk.white('2. Generate design tokens only:'));
    console.log(chalk.gray('   flow-studio tokens brands/my-brand.json -o tokens.json\n'));
    console.log(chalk.white('3. Generate 30 theme variations:'));
    console.log(chalk.gray('   flow-studio themes tokens.json -c 30 -o themes.json\n'));
    console.log(chalk.white('4. Initialize and inspect swarm:'));
    console.log(chalk.gray('   flow-studio swarm init\n'));
    console.log(chalk.white('5. View agent statistics:'));
    console.log(chalk.gray('   flow-studio swarm stats\n'));
  });

// Parse command line
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
