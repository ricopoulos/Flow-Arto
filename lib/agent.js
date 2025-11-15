/**
 * Base Agent Class - Foundation for all Flow Studio agents
 * Implements the core agent intelligence pattern
 */

import { callClaude, callClaudeJSON } from './ai.js';
import { saveMemory, getMemory } from './memory.js';

export class Agent {
  /**
   * Create a new agent
   * @param {string} name - Agent name (e.g., "Stylist", "Arto")
   * @param {string} role - Agent's primary role
   * @param {Array<string>} capabilities - What this agent can do
   * @param {string} personality - Agent's communication style
   */
  constructor(name, role, capabilities, personality = 'professional') {
    this.name = name;
    this.role = role;
    this.capabilities = capabilities;
    this.personality = personality;
    this.memory = [];
    this.createdAt = new Date();
    this.taskCount = 0;
  }

  /**
   * Build system prompt that defines the agent's identity and capabilities
   * @returns {string} System prompt for Claude
   */
  buildSystemPrompt() {
    return `You are ${this.name}, a ${this.role} in the Flow Studio design system.

Your Role: ${this.role}

Your Capabilities:
${this.capabilities.map(cap => `- ${cap}`).join('\n')}

Personality: ${this.personality}

Your task is to leverage your expertise to provide the highest quality output. You understand design systems, modern web aesthetics, accessibility, and 2025 design trends. You always consider:
- Brand alignment and consistency
- WCAG AAA accessibility standards
- Modern design trends (glassmorphism, kinetic typography, perceptual color)
- Performance and maintainability
- User experience excellence

Approach every task systematically and provide detailed, actionable output.`;
  }

  /**
   * Execute a task using AI
   * @param {string} task - The task description
   * @param {Object} context - Additional context for the task
   * @param {Object} options - Execution options
   * @returns {Promise<Object>} Task result
   */
  async think(task, context = {}, options = {}) {
    const startTime = Date.now();
    this.taskCount++;

    console.log(`🤖 ${this.name} is thinking about: ${task.substring(0, 100)}...`);

    try {
      const prompt = this.buildPrompt(task, context);
      const systemPrompt = this.buildSystemPrompt();

      const response = options.expectJSON
        ? await callClaudeJSON(prompt, { systemPrompt, ...options })
        : await callClaude(prompt, { systemPrompt, ...options });

      const result = {
        agent: this.name,
        task,
        context,
        response: options.expectJSON ? response : response.content,
        timestamp: new Date(),
        duration: Date.now() - startTime,
        usage: response.usage
      };

      // Store in memory
      this.memory.push({
        task,
        result: result.response,
        timestamp: result.timestamp
      });

      // Persist to disk if enabled
      if (options.persistMemory !== false) {
        await saveMemory(this.name, result);
      }

      console.log(`✅ ${this.name} completed task in ${result.duration}ms`);

      return result;
    } catch (error) {
      console.error(`❌ ${this.name} failed:`, error.message);
      throw error;
    }
  }

  /**
   * Build the complete prompt for a task
   * @param {string} task - Task description
   * @param {Object} context - Additional context
   * @returns {string} Complete prompt
   */
  buildPrompt(task, context) {
    let prompt = `Task: ${task}\n\n`;

    if (Object.keys(context).length > 0) {
      prompt += `Context:\n${JSON.stringify(context, null, 2)}\n\n`;
    }

    // Add relevant memories if available
    if (this.memory.length > 0) {
      const recentMemories = this.memory.slice(-3);
      prompt += `Recent Experience:\n`;
      recentMemories.forEach((mem, i) => {
        prompt += `${i + 1}. ${mem.task.substring(0, 100)}...\n`;
      });
      prompt += `\n`;
    }

    return prompt;
  }

  /**
   * Collaborate with another agent
   * @param {Agent} otherAgent - Agent to collaborate with
   * @param {string} task - Collaborative task
   * @param {Object} context - Shared context
   * @returns {Promise<Object>} Combined result
   */
  async collaborateWith(otherAgent, task, context = {}) {
    console.log(`🤝 ${this.name} collaborating with ${otherAgent.name}`);

    // This agent does their part first
    const myResult = await this.think(task, {
      ...context,
      collaboration: `Working with ${otherAgent.name}`
    });

    // Other agent builds on this result
    const theirResult = await otherAgent.think(task, {
      ...context,
      collaboration: `Building on ${this.name}'s work`,
      previousWork: myResult.response
    });

    return {
      agents: [this.name, otherAgent.name],
      task,
      results: {
        [this.name]: myResult.response,
        [otherAgent.name]: theirResult.response
      },
      timestamp: new Date()
    };
  }

  /**
   * Review and refine previous work
   * @param {Object} previousWork - Work to review
   * @param {string} criteria - Review criteria
   * @returns {Promise<Object>} Refined result
   */
  async refine(previousWork, criteria) {
    const task = `Review and refine this work based on the following criteria: ${criteria}`;

    return await this.think(task, {
      previousWork,
      mode: 'refinement'
    });
  }

  /**
   * Get agent statistics
   * @returns {Object} Agent stats
   */
  getStats() {
    return {
      name: this.name,
      role: this.role,
      taskCount: this.taskCount,
      memorySize: this.memory.length,
      uptime: Date.now() - this.createdAt.getTime(),
      capabilities: this.capabilities.length
    };
  }

  /**
   * Clear agent's in-memory cache (persistent memory remains)
   */
  clearMemory() {
    this.memory = [];
    console.log(`🧹 ${this.name}'s memory cleared`);
  }

  /**
   * Load historical memory from disk
   * @param {number} limit - Maximum memories to load
   */
  async loadHistory(limit = 10) {
    const history = await getMemory(this.name, limit);
    this.memory = history;
    console.log(`📚 ${this.name} loaded ${history.length} memories`);
  }
}

/**
 * Create a specialized agent with predefined configuration
 * @param {string} type - Agent type (researcher, stylist, etc.)
 * @returns {Agent} Configured agent
 */
export function createAgent(type) {
  const configs = {
    researcher: {
      name: 'Researcher',
      role: 'Design Trend Analyst',
      capabilities: [
        'Analyze current web design trends',
        'Research color theory and modern palettes',
        'Identify typography trends',
        'Study motion design patterns',
        'Understand accessibility best practices'
      ],
      personality: 'analytical and thorough'
    },
    arto: {
      name: 'Arto',
      role: 'UX Strategist',
      capabilities: [
        'Design layout hierarchies',
        'Create responsive grid systems',
        'Define spacing and rhythm',
        'Plan component architecture',
        'Optimize user flows'
      ],
      personality: 'thoughtful and user-focused'
    },
    stylist: {
      name: 'Stylist',
      role: 'Visual Design Specialist',
      capabilities: [
        'Generate design tokens from brand configurations',
        'Create color palettes with WCAG compliance',
        'Select typography pairings',
        'Define motion and animation parameters',
        'Ensure visual coherence'
      ],
      personality: 'creative and precise'
    },
    builder: {
      name: 'Builder',
      role: 'Component Engineer',
      capabilities: [
        'Generate semantic HTML structures',
        'Create token-driven CSS',
        'Build accessible components',
        'Implement responsive patterns',
        'Optimize for performance'
      ],
      personality: 'technical and detail-oriented'
    },
    curator: {
      name: 'Curator',
      role: 'Quality Assurance Specialist',
      capabilities: [
        'Validate WCAG contrast ratios',
        'Check brand alignment',
        'Audit token usage',
        'Verify semantic HTML',
        'Generate quality reports'
      ],
      personality: 'meticulous and objective'
    },
    maestro: {
      name: 'Maestro',
      role: 'Workflow Orchestrator',
      capabilities: [
        'Coordinate multi-agent workflows',
        'Decompose complex tasks',
        'Synthesize agent outputs',
        'Manage dependencies',
        'Optimize execution order'
      ],
      personality: 'strategic and organized'
    }
  };

  const config = configs[type.toLowerCase()];
  if (!config) {
    throw new Error(`Unknown agent type: ${type}`);
  }

  return new Agent(config.name, config.role, config.capabilities, config.personality);
}
