// orchestrator/executors/code-executor.ts
import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export interface ExecResult { success: boolean; output: string }

export async function runLinter(filePath: string, lang = "ts"): Promise<ExecResult> {
  const cmd = lang === "ts" ? ["npx", ["eslint", "--format=json", filePath]]
            : lang === "py" ? ["ruff", ["check", filePath]]
            : ["golangci-lint", ["run", filePath]];
  try {
    const { stdout } = await exec(cmd[0] as string, cmd[1] as string[]);
    return { success: true, output: stdout };
  } catch (e: any) {
    return { success: false, output: e.stderr ?? e.message };
  }
}

export async function runTypeCheck(tsconfigPath = "tsconfig.json"): Promise<ExecResult> {
  try {
    const { stdout } = await exec("npx", ["tsc", "--noEmit", "-p", tsconfigPath]);
    return { success: true, output: stdout };
  } catch (e: any) {
    return { success: false, output: e.stderr ?? e.message };
  }
}
