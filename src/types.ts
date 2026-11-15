export type AgentStatus = 'pending' | 'running' | 'success' | 'failed'
export type LogKind = 'thought' | 'tool' | 'output' | 'system' | 'error'
export interface AgentNode { id: string; name: string; role: string; status: AgentStatus; duration?: number; detail: string }
export interface ExecutionLog { id: string; timestamp: string; agent: string; kind: LogKind; message: string; payload?: Record<string, unknown>; duration?: number }
export interface AgentRun { runId: string; status: 'completed' | 'failed' | 'running'; goal: string; agentModel: string; totalTokens: number; totalLatency: number; steps: ExecutionLog[]; nodes: AgentNode[]; createdAt: string }
export interface Telemetry { totalTokens: number; averageLatency: number; toolSuccessRate: number; completedRuns: number; activeAgents: number }
export interface ToolConfig { id: string; name: string; description: string; enabled: boolean; category: string }