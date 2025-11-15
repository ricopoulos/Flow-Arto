/**
 * Memory System - Persistent storage for agent learning
 * Enables agents to remember and learn from past interactions
 */

import fs from 'fs/promises';
import path from 'path';

const MEMORY_DIR = '.flow-studio/memory';
const MEMORY_FILE = 'agent-memory.json';

/**
 * Ensure memory directory exists
 */
async function ensureMemoryDir() {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists, ignore
  }
}

/**
 * Save agent memory to persistent storage
 * @param {string} agentName - Name of the agent
 * @param {Object} memory - Memory object to save
 */
export async function saveMemory(agentName, memory) {
  await ensureMemoryDir();

  const memoryPath = path.join(MEMORY_DIR, MEMORY_FILE);
  let allMemories = {};

  try {
    const existing = await fs.readFile(memoryPath, 'utf-8');
    allMemories = JSON.parse(existing);
  } catch (error) {
    // File doesn't exist yet, start fresh
  }

  if (!allMemories[agentName]) {
    allMemories[agentName] = [];
  }

  allMemories[agentName].push({
    ...memory,
    timestamp: new Date().toISOString()
  });

  // Keep only last 100 memories per agent to manage file size
  if (allMemories[agentName].length > 100) {
    allMemories[agentName] = allMemories[agentName].slice(-100);
  }

  await fs.writeFile(memoryPath, JSON.stringify(allMemories, null, 2));
}

/**
 * Get agent memories from persistent storage
 * @param {string} agentName - Name of the agent
 * @param {number} limit - Maximum number of memories to retrieve
 * @returns {Promise<Array>} Array of memories
 */
export async function getMemory(agentName, limit = 10) {
  await ensureMemoryDir();

  const memoryPath = path.join(MEMORY_DIR, MEMORY_FILE);

  try {
    const data = await fs.readFile(memoryPath, 'utf-8');
    const allMemories = JSON.parse(data);

    if (!allMemories[agentName]) {
      return [];
    }

    return allMemories[agentName].slice(-limit);
  } catch (error) {
    return [];
  }
}

/**
 * Search memories by keywords
 * @param {string} agentName - Name of the agent
 * @param {string} query - Search query
 * @param {number} limit - Maximum results
 * @returns {Promise<Array>} Matching memories
 */
export async function searchMemory(agentName, query, limit = 10) {
  const memories = await getMemory(agentName, 100);
  const queryLower = query.toLowerCase();

  const matches = memories.filter(memory => {
    const taskMatch = memory.task?.toLowerCase().includes(queryLower);
    const responseMatch = JSON.stringify(memory.response).toLowerCase().includes(queryLower);
    return taskMatch || responseMatch;
  });

  return matches.slice(-limit);
}

/**
 * Get statistics about agent memory
 * @param {string} agentName - Name of the agent
 * @returns {Promise<Object>} Memory statistics
 */
export async function getMemoryStats(agentName) {
  const memories = await getMemory(agentName, 1000);

  if (memories.length === 0) {
    return {
      agentName,
      totalMemories: 0,
      oldestMemory: null,
      newestMemory: null,
      avgDuration: 0
    };
  }

  const durations = memories
    .filter(m => m.duration)
    .map(m => m.duration);

  return {
    agentName,
    totalMemories: memories.length,
    oldestMemory: memories[0]?.timestamp,
    newestMemory: memories[memories.length - 1]?.timestamp,
    avgDuration: durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0
  };
}

/**
 * Clear all memories for an agent
 * @param {string} agentName - Name of the agent
 */
export async function clearMemory(agentName) {
  await ensureMemoryDir();

  const memoryPath = path.join(MEMORY_DIR, MEMORY_FILE);

  try {
    const data = await fs.readFile(memoryPath, 'utf-8');
    const allMemories = JSON.parse(data);

    if (allMemories[agentName]) {
      delete allMemories[agentName];
      await fs.writeFile(memoryPath, JSON.stringify(allMemories, null, 2));
    }
  } catch (error) {
    // File doesn't exist, nothing to clear
  }
}

/**
 * Export memories to a file
 * @param {string} agentName - Name of the agent
 * @param {string} outputPath - Where to export
 */
export async function exportMemory(agentName, outputPath) {
  const memories = await getMemory(agentName, 1000);

  await fs.writeFile(
    outputPath,
    JSON.stringify({
      agent: agentName,
      exportedAt: new Date().toISOString(),
      memoryCount: memories.length,
      memories
    }, null, 2)
  );

  console.log(`📦 Exported ${memories.length} memories to ${outputPath}`);
}

/**
 * Save workflow result (multi-agent collaboration)
 * @param {string} workflowName - Name of the workflow
 * @param {Object} result - Workflow result
 */
export async function saveWorkflowResult(workflowName, result) {
  await ensureMemoryDir();

  const workflowPath = path.join(MEMORY_DIR, 'workflows.json');
  let workflows = {};

  try {
    const existing = await fs.readFile(workflowPath, 'utf-8');
    workflows = JSON.parse(existing);
  } catch (error) {
    // File doesn't exist yet
  }

  if (!workflows[workflowName]) {
    workflows[workflowName] = [];
  }

  workflows[workflowName].push({
    ...result,
    timestamp: new Date().toISOString()
  });

  // Keep only last 50 workflow results
  if (workflows[workflowName].length > 50) {
    workflows[workflowName] = workflows[workflowName].slice(-50);
  }

  await fs.writeFile(workflowPath, JSON.stringify(workflows, null, 2));
}

/**
 * Get workflow history
 * @param {string} workflowName - Name of the workflow
 * @param {number} limit - Maximum results
 * @returns {Promise<Array>} Workflow results
 */
export async function getWorkflowHistory(workflowName, limit = 10) {
  await ensureMemoryDir();

  const workflowPath = path.join(MEMORY_DIR, 'workflows.json');

  try {
    const data = await fs.readFile(workflowPath, 'utf-8');
    const workflows = JSON.parse(data);

    if (!workflows[workflowName]) {
      return [];
    }

    return workflows[workflowName].slice(-limit);
  } catch (error) {
    return [];
  }
}
