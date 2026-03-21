// orchestrator/executors/file-manager.ts
import fs from "fs/promises";
import path from "path";

export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(path.resolve(filePath)), { recursive: true });
  await fs.writeFile(path.resolve(filePath), content, "utf-8");
}

export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(path.resolve(filePath), "utf-8");
}

export async function listFiles(dir: string, ext?: string): Promise<string[]> {
  const files = await fs.readdir(path.resolve(dir));
  return ext ? files.filter((f) => f.endsWith(ext)) : files;
}

export async function moveFile(from: string, to: string): Promise<void> {
  await fs.mkdir(path.dirname(path.resolve(to)), { recursive: true });
  await fs.rename(path.resolve(from), path.resolve(to));
}
