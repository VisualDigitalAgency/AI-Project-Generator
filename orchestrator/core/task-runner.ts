// orchestrator/core/task-runner.ts
import fs from "fs/promises";
import path from "path";

export interface Task {
  type: string;
  name: string;
  agent?: string;
  priority?: string;
  services?: string;
  [key: string]: string | undefined;
}

export class TaskRunner {
  async parse(taskFile: string): Promise<Task> {
    const raw = await fs.readFile(path.resolve(taskFile), "utf-8");
    const frontMatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) throw new Error(`No front matter found in: ${taskFile}`);

    const task: Task = { type: "feature", name: "unnamed" };
    for (const line of frontMatterMatch[1].split("\n")) {
      const m = line.match(/^([\w-]+):\s*(.+)$/);
      if (m) task[m[1]] = m[2].trim();
    }
    return task;
  }
}
