/**
 * AI Integration Layer - Anthropic Claude API
 * Provides intelligent capabilities for Flow Studio agents
 */

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TOKENS = 4096;

/**
 * Call Claude API with a prompt
 * @param {string} prompt - The prompt to send to Claude
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} Claude's response
 */
export async function callClaude(prompt, options = {}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  const requestBody = {
    model: options.model || DEFAULT_MODEL,
    max_tokens: options.maxTokens || MAX_TOKENS,
    messages: [{
      role: 'user',
      content: prompt
    }],
    temperature: options.temperature || 1.0,
    system: options.systemPrompt || undefined
  };

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.content[0].text,
      usage: data.usage,
      model: data.model,
      stopReason: data.stop_reason
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

/**
 * Call Claude with structured JSON output
 * @param {string} prompt - The prompt requesting JSON output
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} Parsed JSON response
 */
export async function callClaudeJSON(prompt, options = {}) {
  const enhancedPrompt = `${prompt}

CRITICAL: You must respond with valid JSON only. No markdown, no explanations, just pure JSON.`;

  const response = await callClaude(enhancedPrompt, options);

  try {
    // Extract JSON from potential markdown code blocks
    let jsonText = response.content.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse JSON from Claude response:', response.content);
    throw new Error(`Invalid JSON response from Claude: ${error.message}`);
  }
}

/**
 * Call Claude with retry logic for reliability
 * @param {string} prompt - The prompt to send
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Claude's response
 */
export async function callClaudeWithRetry(prompt, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const retryDelay = options.retryDelay || 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callClaude(prompt, options);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      console.warn(`Claude API call failed (attempt ${attempt}/${maxRetries}), retrying...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
}

/**
 * Batch process multiple prompts in parallel
 * @param {Array<string>} prompts - Array of prompts to process
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<Object>>} Array of responses
 */
export async function callClaudeBatch(prompts, options = {}) {
  const maxConcurrent = options.maxConcurrent || 3;
  const results = [];

  for (let i = 0; i < prompts.length; i += maxConcurrent) {
    const batch = prompts.slice(i, i + maxConcurrent);
    const batchResults = await Promise.all(
      batch.map(prompt => callClaude(prompt, options))
    );
    results.push(...batchResults);

    // Add delay between batches to avoid rate limits
    if (i + maxConcurrent < prompts.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return results;
}

/**
 * Stream Claude's response (for future implementation)
 * @param {string} prompt - The prompt to send
 * @param {Function} onChunk - Callback for each chunk
 * @param {Object} options - Configuration options
 */
export async function streamClaude(prompt, onChunk, options = {}) {
  // TODO: Implement streaming support when needed
  throw new Error('Streaming not yet implemented');
}
