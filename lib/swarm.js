/**
 * Swarm Coordination System - Multi-agent orchestration
 * Implements the "hive-mind" intelligence from Ruv's methodology
 */

import { createAgent } from './agent.js';
import { saveWorkflowResult } from './memory.js';

/**
 * Agent Swarm - Coordinates multiple agents working together
 */
export class AgentSwarm {
  /**
   * Create a new agent swarm
   * @param {Object} config - Swarm configuration
   */
  constructor(config = {}) {
    this.agents = new Map();
    this.topology = config.topology || 'hierarchical'; // hierarchical, mesh, adaptive
    this.name = config.name || 'Flow Studio Swarm';
    this.tasks = [];
    this.results = [];
    this.createdAt = new Date();
  }

  /**
   * Add an agent to the swarm
   * @param {string} type - Agent type
   * @returns {Agent} The created agent
   */
  addAgent(type) {
    const agent = createAgent(type);
    this.agents.set(type, agent);
    console.log(`🐝 ${agent.name} joined the swarm`);
    return agent;
  }

  /**
   * Get an agent by type
   * @param {string} type - Agent type
   * @returns {Agent} The agent
   */
  getAgent(type) {
    return this.agents.get(type);
  }

  /**
   * Execute a task using the swarm
   * @param {string} task - Task description
   * @param {Object} options - Execution options
   * @returns {Promise<Object>} Task result
   */
  async execute(task, options = {}) {
    console.log(`\n🎯 Swarm executing: ${task}\n`);

    const startTime = Date.now();

    // Decompose task into subtasks
    const decomposition = await this.decompose(task, options);

    // Execute based on topology
    let result;
    switch (this.topology) {
      case 'hierarchical':
        result = await this.executeHierarchical(decomposition, options);
        break;
      case 'mesh':
        result = await this.executeMesh(decomposition, options);
        break;
      case 'adaptive':
        result = await this.executeAdaptive(decomposition, options);
        break;
      default:
        throw new Error(`Unknown topology: ${this.topology}`);
    }

    const totalTime = Date.now() - startTime;

    const finalResult = {
      task,
      topology: this.topology,
      agentsInvolved: Array.from(this.agents.keys()),
      result,
      duration: totalTime,
      timestamp: new Date()
    };

    // Save to workflow history
    if (options.workflowName) {
      await saveWorkflowResult(options.workflowName, finalResult);
    }

    console.log(`\n✅ Swarm completed task in ${totalTime}ms\n`);

    return finalResult;
  }

  /**
   * Decompose a task into subtasks (using Maestro if available)
   * @param {string} task - Main task
   * @param {Object} options - Options
   * @returns {Promise<Object>} Decomposition plan
   */
  async decompose(task, options = {}) {
    // If we have a Maestro agent, use it for decomposition
    if (this.agents.has('maestro')) {
      const maestro = this.agents.get('maestro');
      const result = await maestro.think(
        `Decompose this task into subtasks for the swarm: ${task}`,
        {
          availableAgents: Array.from(this.agents.keys()),
          topology: this.topology
        },
        { expectJSON: true }
      );

      return result.response;
    }

    // Simple decomposition without Maestro
    return {
      task,
      subtasks: options.subtasks || [{ task, agents: Array.from(this.agents.keys()) }]
    };
  }

  /**
   * Execute tasks hierarchically (queen-led)
   * @param {Object} plan - Decomposition plan
   * @param {Object} options - Options
   * @returns {Promise<Object>} Combined result
   */
  async executeHierarchical(plan, options = {}) {
    const results = {};

    // Execute subtasks in order
    for (const subtask of plan.subtasks || [plan]) {
      const agentTypes = Array.isArray(subtask.agents) ? subtask.agents : [subtask.agents];

      for (const agentType of agentTypes) {
        const agent = this.agents.get(agentType);
        if (!agent) {
          console.warn(`⚠️  Agent ${agentType} not found in swarm`);
          continue;
        }

        const result = await agent.think(
          subtask.task || subtask,
          {
            swarmContext: plan.task,
            previousResults: results,
            ...options.context
          },
          options
        );

        results[agentType] = result.response;
      }
    }

    return results;
  }

  /**
   * Execute tasks in mesh topology (parallel collaboration)
   * @param {Object} plan - Decomposition plan
   * @param {Object} options - Options
   * @returns {Promise<Object>} Combined result
   */
  async executeMesh(plan, options = {}) {
    const subtasks = plan.subtasks || [plan];

    // Execute all subtasks in parallel
    const results = await Promise.all(
      subtasks.map(async (subtask) => {
        const agentTypes = Array.isArray(subtask.agents) ? subtask.agents : [subtask.agents];

        const subtaskResults = await Promise.all(
          agentTypes.map(async (agentType) => {
            const agent = this.agents.get(agentType);
            if (!agent) return null;

            const result = await agent.think(
              subtask.task || subtask,
              {
                swarmContext: plan.task,
                topology: 'mesh',
                ...options.context
              },
              options
            );

            return { agentType, result: result.response };
          })
        );

        return subtaskResults.filter(r => r !== null);
      })
    );

    // Flatten and organize results
    const organized = {};
    results.flat().forEach(({ agentType, result }) => {
      organized[agentType] = result;
    });

    return organized;
  }

  /**
   * Execute with adaptive topology (intelligent routing)
   * @param {Object} plan - Decomposition plan
   * @param {Object} options - Options
   * @returns {Promise<Object>} Combined result
   */
  async executeAdaptive(plan, options = {}) {
    // Analyze task complexity and choose execution strategy
    const complexity = this.analyzeComplexity(plan);

    if (complexity > 0.7) {
      console.log('🔄 High complexity detected, using mesh topology');
      return this.executeMesh(plan, options);
    } else {
      console.log('🔄 Standard complexity, using hierarchical topology');
      return this.executeHierarchical(plan, options);
    }
  }

  /**
   * Analyze task complexity (simple heuristic)
   * @param {Object} plan - Task plan
   * @returns {number} Complexity score 0-1
   */
  analyzeComplexity(plan) {
    const subtaskCount = plan.subtasks?.length || 1;
    const agentCount = this.agents.size;

    // More subtasks and agents = higher complexity
    return Math.min((subtaskCount * agentCount) / 20, 1);
  }

  /**
   * Synthesize results from multiple agents
   * @param {Object} results - Agent results
   * @param {string} goal - Overall goal
   * @returns {Promise<Object>} Synthesized result
   */
  async synthesize(results, goal) {
    // If we have a Maestro, use it to synthesize
    if (this.agents.has('maestro')) {
      const maestro = this.agents.get('maestro');
      return await maestro.think(
        `Synthesize these agent results into a coherent output for: ${goal}`,
        { results },
        { expectJSON: true }
      );
    }

    // Simple synthesis without Maestro
    return results;
  }

  /**
   * Get swarm statistics
   * @returns {Object} Swarm stats
   */
  getStats() {
    const agentStats = Array.from(this.agents.values()).map(agent => agent.getStats());

    return {
      name: this.name,
      topology: this.topology,
      agentCount: this.agents.size,
      agents: agentStats,
      tasksCompleted: this.results.length,
      uptime: Date.now() - this.createdAt.getTime()
    };
  }

  /**
   * Create a standard Flow Studio swarm with all agents
   * @returns {AgentSwarm} Configured swarm
   */
  static createFlowStudioSwarm() {
    const swarm = new AgentSwarm({
      name: 'Flow Studio Design Swarm',
      topology: 'hierarchical'
    });

    // Add all core agents
    swarm.addAgent('maestro');
    swarm.addAgent('researcher');
    swarm.addAgent('arto');
    swarm.addAgent('stylist');
    swarm.addAgent('builder');
    swarm.addAgent('curator');

    console.log('🐝 Flow Studio swarm initialized with 6 agents');

    return swarm;
  }
}

/**
 * Create a minimal swarm for quick tasks
 * @param {Array<string>} agentTypes - Agent types to include
 * @param {Object} config - Swarm config
 * @returns {AgentSwarm} Configured swarm
 */
export function createQuickSwarm(agentTypes, config = {}) {
  const swarm = new AgentSwarm(config);

  agentTypes.forEach(type => {
    swarm.addAgent(type);
  });

  return swarm;
}
