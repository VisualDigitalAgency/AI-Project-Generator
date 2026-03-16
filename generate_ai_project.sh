#!/usr/bin/env bash

set -euo pipefail

########################################
# ARGUMENTS
########################################

PROJECT_NAME="${1:-}"
GITHUB_REPO="${2:-}"

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Usage:"
  echo "./generate_ai_project.sh <project-name> [github-user/repo]"
  exit 1
fi

########################################
# ENVIRONMENT CHECKS
########################################

echo "Checking environment..."

command -v git >/dev/null 2>&1 || { echo "git is required"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "python3 is required"; exit 1; }

if command -v gh >/dev/null 2>&1; then
  GH_AVAILABLE=true
else
  GH_AVAILABLE=false
fi

########################################
# PREVENT RUNNING INSIDE GIT REPO
########################################

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: This script must NOT be run inside an existing Git repository."
  exit 1
fi

########################################
# PREVENT OVERWRITE
########################################

if [[ -d "$PROJECT_NAME" ]]; then
  echo "Error: Directory '$PROJECT_NAME' already exists."
  exit 1
fi

########################################
# CREATE PROJECT
########################################

echo "Creating project: $PROJECT_NAME"

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

########################################
# STRUCTURE
########################################

mkdir -p \
agents/prompts \
agents/planner \
core/orchestrator \
core/memory \
core/repo_index \
scripts \
tasks \
runs \
observability \
security \
src \
.github/workflows

########################################
# SAFE FILE WRITER
########################################

create_file () {
  FILE_PATH="$1"

  if [[ -f "$FILE_PATH" ]]; then
    echo "Skipping existing file: $FILE_PATH"
    return
  fi

  cat > "$FILE_PATH"
}

########################################
# README
########################################

create_file README.md << 'EOF'
# AI Project OS

AI-driven development scaffold.

## Structure

agents/ — agent prompts and planning  
core/ — orchestration systems  
tasks/ — task manifests  
runs/ — execution logs  
observability/ — telemetry  
security/ — policies  

## Setup

Requires:

- Python 3.10+
- Git
- Optional: GitHub CLI
EOF

########################################
# SYSTEM PROMPT
########################################

create_file agents/prompts/system_prompt.txt << 'EOF'
You are the AI Project Agent.

Workflow:

1 Read task manifest
2 Build execution plan
3 Wait for approval
4 Produce patch
5 Run tests
6 Create PR

Rules

Only modify allowed files
Respect change budget
Write provenance logs
EOF

########################################
# TASK PLANNER
########################################

create_file agents/planner/task_planner.py << 'EOF'
import json

def plan_task(task):

    plan = {
        "task_id": task["task_id"],
        "steps": [],
        "tests": task.get("tests", [])
    }

    plan["steps"].append({
        "id": "analysis",
        "action": "analyze_repo"
    })

    plan["steps"].append({
        "id": "patch",
        "action": "create_patch"
    })

    return plan
EOF

########################################
# ORCHESTRATOR
########################################

create_file core/orchestrator/runner.py << 'EOF'
import os
import json

TASK_DIR = "tasks"

def load_tasks():
    tasks = []

    if not os.path.exists(TASK_DIR):
        return tasks

    for f in os.listdir(TASK_DIR):
        if f.endswith(".json"):
            path = os.path.join(TASK_DIR, f)
            with open(path) as fp:
                tasks.append(json.load(fp))

    return tasks

def run():
    tasks = load_tasks()

    for t in tasks:
        print("Running task:", t.get("task_id"))

if __name__ == "__main__":
    run()
EOF

########################################
# REPO INDEX
########################################

create_file core/repo_index/build_index.py << 'EOF'
import os
import json

GRAPH = "core/repo_index/repo_graph.json"

EXCLUDE = {".git", "__pycache__", ".env"}

def build():

    graph = {}

    for path, dirs, files in os.walk("."):

        dirs[:] = [d for d in dirs if d not in EXCLUDE]

        if any(x in path for x in EXCLUDE):
            continue

        graph[path] = files

    with open(GRAPH, "w") as f:
        json.dump(graph, f, indent=2)

if __name__ == "__main__":
    build()
EOF

########################################
# MEMORY STORE
########################################

create_file core/memory/memory.py << 'EOF'
import json
import os
from tempfile import NamedTemporaryFile

STORE = "core/memory/store.json"

def save(entry):

    data = []

    if os.path.exists(STORE):
        with open(STORE) as f:
            try:
                data = json.load(f)
            except:
                data = []

    data.append(entry)

    with NamedTemporaryFile("w", delete=False) as tmp:
        json.dump(data, tmp, indent=2)
        tempname = tmp.name

    os.replace(tempname, STORE)
EOF

########################################
# CREATE PR SCRIPT
########################################

create_file scripts/create_pr.py << 'EOF'
import subprocess
import sys

if len(sys.argv) < 2:
    print("Usage: create_pr.py <title>")
    sys.exit(1)

title = sys.argv[1]

subprocess.run(["git", "checkout", "-b", title], check=True)
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", title], check=True)
subprocess.run(["git", "push", "-u", "origin", title], check=True)

subprocess.run(["gh", "pr", "create", "--title", title], check=True)
EOF

########################################
# ISSUE → TASK
########################################

create_file scripts/issue_to_task.py << 'EOF'
import json
import sys
import os

if len(sys.argv) < 3:
    print("Usage: issue_to_task.py <task_id> <title>")
    sys.exit(1)

task = {
    "task_id": sys.argv[1],
    "title": sys.argv[2],
    "allowed_files": ["src/**"],
    "tests": []
}

os.makedirs("tasks", exist_ok=True)

with open(f"tasks/{task['task_id']}.json", "w") as f:
    json.dump(task, f, indent=2)
EOF

########################################
# GITIGNORE
########################################

create_file .gitignore << 'EOF'
runs/*
logs/*
observability/*

core/memory/*

__pycache__/
*.pyc

.env
.env.local

.DS_Store
EOF

########################################
# SECURITY
########################################

create_file security/SECURITY.md << 'EOF'
Security Policy

No secrets in repository.
Use environment variables.

Secrets scanning enabled via CI.
EOF

########################################
# CI
########################################

create_file .github/workflows/ai_pipeline.yml << 'EOF'
name: AI Project CI

on:
 push:
 pull_request:

jobs:

 security:
  runs-on: ubuntu-latest

  steps:
   - uses: actions/checkout@v4

   - name: Run Gitleaks
     uses: gitleaks/gitleaks-action@v2

 index:
  runs-on: ubuntu-latest

  steps:
   - uses: actions/checkout@v4

   - name: Build repo index
     run: python3 core/repo_index/build_index.py
EOF

########################################
# INIT GIT
########################################

git init
git add .
git commit -m "Initial AI Project OS"

########################################
# CREATE GITHUB REPO
########################################

if [[ -n "$GITHUB_REPO" ]]; then

  if [[ "$GH_AVAILABLE" = true ]]; then
    echo "Creating GitHub repository..."
    gh repo create "$GITHUB_REPO" --private --source=. --remote=origin --push
  else
    echo "GitHub CLI not installed. Skipping repo creation."
  fi

fi

echo ""
echo "Project created successfully:"
echo "$PROJECT_NAME"
