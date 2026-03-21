// orchestrator/core/run-logger.ts
import fs from "fs";
import path from "path";

export class RunLogger {
  private dir(id: string) {
    const d = path.resolve(`runs/${id}`);
    fs.mkdirSync(d, { recursive: true });
    return d;
  }

  start(id: string, taskFile: string) {
    const entry = `# Run ${id}\nStarted: ${new Date().toISOString()}\nTask: ${taskFile}\n\n`;
    fs.writeFileSync(path.join(this.dir(id), "run.md"), entry);
  }

  logPlan(id: string, plan: { phases: string[] }) {
    const entry = `## Plan\nPhases: ${plan.phases.join(" → ")}\n\n`;
    fs.appendFileSync(path.join(this.dir(id), "run.md"), entry);
  }

  logPhase(id: string, phase: string, agent: string, status: string) {
    const entry = `### Phase: ${phase}\nAgent: ${agent}\nStatus: ${status}\nTime: ${new Date().toISOString()}\n\n`;
    fs.appendFileSync(path.join(this.dir(id), "run.md"), entry);
  }

  finish(id: string, status: string, error?: string) {
    const entry = `## Result\nStatus: ${status}\n${error ? `Error: ${error}\n` : ""}Finished: ${new Date().toISOString()}\n`;
    fs.appendFileSync(path.join(this.dir(id), "run.md"), entry);
  }
}
