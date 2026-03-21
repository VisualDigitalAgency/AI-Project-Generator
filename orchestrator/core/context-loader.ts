// orchestrator/core/context-loader.ts
import fs from "fs/promises";
import path from "path";

const CONTEXT_DIR = path.resolve(".claude/context");

export class ContextLoader {
  async load(): Promise<Record<string, string>> {
    const files = await fs.readdir(CONTEXT_DIR);
    const ctx: Record<string, string> = {};
    for (const file of files.filter((f) => f.endsWith(".md"))) {
      const key = file.replace(".md", "");
      ctx[key] = await fs.readFile(path.join(CONTEXT_DIR, file), "utf-8");
    }
    return ctx;
  }
}
