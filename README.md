# AgentPulse

AgentPulse is a full-stack multi-agent orchestration simulator and workflow observability dashboard. It combines a Vite + React + TypeScript frontend with Vercel Serverless Functions in one deployable repository.

## Features
- Four-node workflow DAG: Planner, Coder, Reviewer, and Deployment agents
- Simulated execution traces with structured tool-call payloads and output events
- Tool registry with enable/disable controls and safe simulated tests
- Token, latency, run-count, and tool-health metrics
- Responsive dark developer dashboard
- Local demo fallback when the API is unavailable

## Stack
React 19, TypeScript 5, Vite 7, Tailwind CSS v4, and Vercel Serverless Functions.

## Local development
```bash
npm install
npm run dev
```
Plain Vite serves the frontend only. Use `npx vercel dev` to run the frontend and serverless API together locally.

## Build and deploy
```bash
npm install
npm run build
```
Import this repository into Vercel. The project uses `npm run build` and `dist` as its output directory. No environment variables are required for the demo.

## API
- `POST /api/agents`: accepts `{ goal, agentModel, maxSteps, toolsEnabled }` and returns an execution with nodes, event logs, token estimate, and latency.
- `GET /api/agents`: returns swarm metadata, recent in-memory runs, and task graph metrics.
- `GET /api/telemetry`: returns token usage, average latency, tool success rate, completed runs, and active agent count.

## Execution and persistence notes
This project currently simulates agent work. Tool calls are illustrative and do not execute shell commands, make real commits, run SQL, or contact external services. The selected model is a workflow label, not a live model-provider integration. Run history and telemetry are held in process memory and may reset between serverless invocations or cold starts; use a database or telemetry provider for durable cross-instance analytics before production use.
