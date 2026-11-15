import type { AgentRun, Telemetry, ToolConfig } from '../types'
const API_BASE = '/api'
export async function startAgentRun(input: { goal: string; agentModel: string; maxSteps: number; toolsEnabled: string[] }): Promise<AgentRun> {
 const response = await fetch(`${API_BASE}/agents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) })
 if (!response.ok) throw new Error((await response.text()) || `Agent API returned ${response.status}`)
 return response.json() as Promise<AgentRun>
}
export async function getTelemetry(): Promise<Telemetry | null> { try { const response = await fetch(`${API_BASE}/telemetry`); return response.ok ? await response.json() as Telemetry : null } catch { return null } }
export async function testTool(tool: ToolConfig): Promise<{ success: boolean; message: string; latency: number }> {
 const started = performance.now(); await new Promise(resolve => window.setTimeout(resolve, 350 + Math.random() * 450))
 return { success: true, message: `${tool.name} responded successfully in sandbox simulation.`, latency: Math.round(performance.now() - started) }
}