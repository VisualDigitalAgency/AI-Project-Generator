#!/usr/bin/env node
// orchestrator/cli.ts
import { Orchestrator } from "./core/orchestrator";

const args = process.argv.slice(2);
const flags = {
  dryRun: args.includes("--dry-run"),
  verbose: args.includes("--verbose"),
};
const taskFile = args.find((a) => !a.startsWith("--"));

if (!taskFile) {
  console.error("Usage: ts-node orchestrator/cli.ts <task-file> [--dry-run] [--verbose]");
  console.error("Example: ts-node orchestrator/cli.ts tasks/in-progress/my-feature.md --verbose");
  process.exit(1);
}

const orchestrator = new Orchestrator(flags);
orchestrator.run(taskFile).catch((err) => {
  console.error("[cli] Fatal error:", err);
  process.exit(1);
});
