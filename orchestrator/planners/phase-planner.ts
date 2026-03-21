// orchestrator/planners/phase-planner.ts

export type Phase = "design" | "build" | "reproduce" | "isolate" | "fix" | "test" | "verify" | "review" | "deploy";

export interface PhaseConfig {
  agents: string[];
  blocking: boolean;
  gate?: string;
}

export const PHASE_CONFIG: Record<Phase, PhaseConfig> = {
  design:    { agents: ["critic"],                          blocking: true,  gate: "No HIGH risks unresolved" },
  build:     { agents: ["feature-builder"],                 blocking: true,  gate: "Linter + type-check pass" },
  reproduce: { agents: ["debugger"],                        blocking: true,  gate: "Failing test written" },
  isolate:   { agents: ["debugger"],                        blocking: true,  gate: "Root cause documented" },
  fix:       { agents: ["feature-builder"],                 blocking: true,  gate: "Failing test now passes" },
  test:      { agents: ["test-agent"],                      blocking: true,  gate: "Coverage threshold met" },
  verify:    { agents: ["test-agent"],                      blocking: true,  gate: "All tests pass" },
  review:    { agents: ["reviewer", "critic", "security-auditor"], blocking: true, gate: "All reviewers approve" },
  deploy:    { agents: [],                                  blocking: true,  gate: "Manual approval required" },
};
