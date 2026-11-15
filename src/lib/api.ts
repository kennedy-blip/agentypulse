import type { AgentRun, Telemetry, ToolConfig } from '../types'

const API_BASE = '/api'

async function readJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''
  const body = await response.text()
  if (!contentType.includes('application/json')) {
    throw new Error(body.slice(0, 180) || `Expected JSON but received ${contentType || 'an unknown content type'}`)
  }
  try {
    return JSON.parse(body) as T
  } catch {
    throw new Error('The API returned malformed JSON.')
  }
}

export async function startAgentRun(input: { goal: string; agentModel: string; maxSteps: number; toolsEnabled: string[] }): Promise<AgentRun> {
  const response = await fetch(`${API_BASE}/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(input)
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(body.slice(0, 240) || `Agent API returned ${response.status}`)
  }
  const result = await readJson<AgentRun>(response)
  if (!result || !Array.isArray(result.steps) || !Array.isArray(result.nodes) || typeof result.totalTokens !== 'number') {
    throw new Error('The agent API response is missing required run data.')
  }
  return result
}

export async function getTelemetry(): Promise<Telemetry | null> {
  try {
    const response = await fetch(`${API_BASE}/telemetry`, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    if (!response.ok) return null
    const data = await readJson<Partial<Telemetry>>(response)
    if (typeof data.totalTokens !== 'number' || typeof data.averageLatency !== 'number' || typeof data.toolSuccessRate !== 'number' || typeof data.completedRuns !== 'number' || typeof data.activeAgents !== 'number') return null
    return data as Telemetry
  } catch {
    return null
  }
}

export async function testTool(tool: ToolConfig): Promise<{ success: boolean; message: string; latency: number }> {
  const started = performance.now()
  await new Promise(resolve => window.setTimeout(resolve, 350 + Math.random() * 450))
  return { success: true, message: `${tool.name} responded successfully in sandbox simulation.`, latency: Math.round(performance.now() - started) }
}
