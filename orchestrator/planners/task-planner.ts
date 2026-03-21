// orchestrator/planners/task-planner.ts

export type TaskType = "feature" | "bugfix" | "refactor" | "chore" | "scaffold";

export interface Plan {
  type: TaskType;
  phases: string[];
  agents: string[];
  estimatedSteps: number;
  requiresApproval: boolean;
}

const PLANS: Record<TaskType, Plan> = {
  feature: {
    type: "feature",
    phases: ["design", "build", "test", "review"],
    agents: ["critic", "feature-builder", "test-agent", "reviewer"],
    estimatedSteps: 8,
    requiresApproval: false,
  },
  bugfix: {
    type: "bugfix",
    phases: ["reproduce", "isolate", "fix", "verify", "review"],
    agents: ["debugger", "feature-builder", "test-agent", "reviewer"],
    estimatedSteps: 5,
    requiresApproval: false,
  },
  refactor: {
    type: "refactor",
    phases: ["design", "build", "test", "review"],
    agents: ["critic", "feature-builder", "test-agent", "reviewer", "security-auditor"],
    estimatedSteps: 6,
    requiresApproval: true,
  },
  scaffold: {
    type: "scaffold",
    phases: ["build"],
    agents: ["feature-builder"],
    estimatedSteps: 3,
    requiresApproval: false,
  },
  chore: {
    type: "chore",
    phases: ["build"],
    agents: ["feature-builder"],
    estimatedSteps: 2,
    requiresApproval: false,
  },
};

export function planTask(description: string): Plan {
  const d = description.toLowerCase();
  if (/fix|bug|error|crash/.test(d))       return PLANS.bugfix;
  if (/refactor|restructure|migrate/.test(d)) return PLANS.refactor;
  if (/scaffold|init|bootstrap/.test(d))   return PLANS.scaffold;
  if (/chore|update|bump/.test(d))         return PLANS.chore;
  return PLANS.feature;
}
