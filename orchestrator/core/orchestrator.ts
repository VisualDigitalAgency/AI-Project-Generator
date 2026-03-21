// orchestrator/core/orchestrator.ts
import { AgentRouter } from "./agent-router";
import { TaskRunner } from "./task-runner";
import { ContextLoader } from "./context-loader";
import { RunLogger } from "./run-logger";

export interface OrchestratorOptions {
  dryRun?: boolean;
  verbose?: boolean;
}

export class Orchestrator {
  private router: AgentRouter;
  private runner: TaskRunner;
  private context: ContextLoader;
  private logger: RunLogger;

  constructor(private opts: OrchestratorOptions = {}) {
    this.router = new AgentRouter();
    this.runner = new TaskRunner();
    this.context = new ContextLoader();
    this.logger = new RunLogger();
  }

  async run(taskFile: string): Promise<void> {
    const runId = `run-${Date.now()}`;
    this.logger.start(runId, taskFile);

    try {
      const ctx = await this.context.load();
      const task = await this.runner.parse(taskFile);

      if (this.opts.verbose) console.log("[orchestrator] Task:", task);

      const plan = this.router.plan(task);
      this.logger.logPlan(runId, plan);

      for (const phase of plan.phases) {
        if (this.opts.verbose) console.log(`[orchestrator] Phase: ${phase}`);
        const agents = this.router.agentsForPhase(phase);
        for (const agent of agents) {
          if (this.opts.dryRun) {
            console.log(`[dry-run] Would run agent: ${agent} for phase: ${phase}`);
            continue;
          }
          await this.router.execute(agent, task, ctx);
          this.logger.logPhase(runId, phase, agent, "complete");
        }
      }

      this.logger.finish(runId, "success");
    } catch (err) {
      this.logger.finish(runId, "failed", String(err));
      throw err;
    }
  }
}
