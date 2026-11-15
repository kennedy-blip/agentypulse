export type StoredRun={runId:string;goal:string;status:string;totalTokens:number;totalLatency:number;createdAt:string}
type Stats={runs:StoredRun[];totalTokens:number;completedRuns:number;latencyTotal:number}
type Runtime=typeof globalThis&{__agentPulseStats?:Stats}
const runtime=globalThis as Runtime
export function getStats():Stats{return runtime.__agentPulseStats??=( {runs:[],totalTokens:0,completedRuns:0,latencyTotal:0} )}
