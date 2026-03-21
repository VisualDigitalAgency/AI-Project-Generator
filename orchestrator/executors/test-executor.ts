// orchestrator/executors/test-executor.ts
import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export interface TestResult { passed: boolean; output: string; coverage?: number }

export async function runTests(pattern: string, framework = "vitest"): Promise<TestResult> {
  const cmds: Record<string, [string, string[]]> = {
    vitest: ["npx", ["vitest", "run", "--reporter=json", "--coverage", pattern]],
    jest:   ["npx", ["jest", "--json", "--coverage", pattern]],
    pytest: ["python", ["-m", "pytest", "--json-report", pattern]],
  };
  const [cmd, args] = cmds[framework] ?? cmds.vitest;
  try {
    const { stdout } = await exec(cmd, args);
    return { passed: true, output: stdout };
  } catch (e: any) {
    return { passed: false, output: e.stderr ?? e.message };
  }
}
