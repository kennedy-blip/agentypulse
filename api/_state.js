const runtime = globalThis
export function getStats() {
  if (!runtime.__agentPulseStats) {
    runtime.__agentPulseStats = { runs: [], totalTokens: 0, completedRuns: 0, latencyTotal: 0 }
  }
  return runtime.__agentPulseStats
}
