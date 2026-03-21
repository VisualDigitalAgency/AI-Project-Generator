// orchestrator/core/agent-router.ts
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface AgentEntry {
  id: string;
  path: string;
  permissions: string[];
  trusted: boolean;
  requiresApproval: boolean;
}

interface Registry { agents: AgentEntry[] }

export class AgentRouter {
  private registry: Registry;

  constructor() {
    const raw = fs.readFileSync(path.resolve("agents/registry.yaml"), "utf-8");
    this.registry = yaml.load(raw) as Registry;
  }

  plan(task: Record<string, string>): { phases: string[] } {
    const isFeature = /feature|add|create|implement/i.test(task.type ?? "");
    const isBug = /bug|fix|error|crash/i.test(task.type ?? "");

    if (isFeature) return { phases: ["design", "build", "test", "review"] };
    if (isBug)     return { phases: ["reproduce", "isolate", "fix", "verify", "review"] };
    return { phases: ["build"] };
  }

  agentsForPhase(phase: string): string[] {
    const map: Record<string, string[]> = {
      design:    ["critic"],
      build:     ["feature-builder"],
      reproduce: ["debugger"],
      isolate:   ["debugger"],
      fix:       ["feature-builder"],
      test:      ["test-agent"],
      verify:    ["test-agent"],
      review:    ["reviewer", "critic", "security-auditor"],
    };
    return map[phase] ?? ["feature-builder"];
  }

  resolve(id: string): AgentEntry {
    const entry = this.registry.agents.find((a) => a.id === id);
    if (!entry) throw new Error(`Agent not found in registry: ${id}`);
    return entry;
  }

  async execute(agentId: string, task: Record<string, string>, ctx: Record<string, string>): Promise<void> {
    const agent = this.resolve(agentId);
    if (agent.requiresApproval) {
      console.warn(`[router] Agent "${agentId}" requires manual approval. Skipping in auto mode.`);
      return;
    }
    // In a real implementation: call the agent's adapter/LLM with task + ctx
    console.log(`[router] Executing agent: ${agentId}`);
  }
}
