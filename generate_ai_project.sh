#!/usr/bin/env bash

set -e

PROJECT_NAME=$1
GITHUB_REPO=$2

if [ -z "$PROJECT_NAME" ]; then
 echo "Usage:"
 echo "./generate_ai_project.sh <project-name> [github-user/repo]"
 exit 1
fi

echo "Creating project: $PROJECT_NAME"

mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

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
.github/workflows

########################################
# SYSTEM PROMPT
########################################

cat > agents/prompts/system_prompt.txt << 'EOF'
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

cat > agents/planner/task_planner.py << 'EOF'
import json

def plan_task(task):

 plan = {
  "task_id": task["task_id"],
  "steps": [],
  "tests": task.get("tests",[])
 }

 plan["steps"].append({
  "id":"analysis",
  "action":"analyze_repo"
 })

 plan["steps"].append({
  "id":"patch",
  "action":"create_patch"
 })

 return plan
EOF

########################################
# ORCHESTRATOR
########################################

cat > core/orchestrator/runner.py << 'EOF'
import os
import json

TASK_DIR="tasks"

def load_tasks():

 tasks=[]

 for f in os.listdir(TASK_DIR):
  if f.endswith(".json"):
   tasks.append(json.load(open(os.path.join(TASK_DIR,f))))

 return tasks

def run():

 tasks=load_tasks()

 for t in tasks:
  print("Running task:",t["task_id"])

if __name__=="__main__":
 run()
EOF

########################################
# REPO KNOWLEDGE GRAPH (RAG BASE)
########################################

cat > core/repo_index/build_index.py << 'EOF'
import os,json

GRAPH="core/repo_index/repo_graph.json"

def build():

 graph={}

 for path,dirs,files in os.walk("."):
  graph[path]=files

 json.dump(graph,open(GRAPH,"w"))

if __name__=="__main__":
 build()
EOF

########################################
# MEMORY STORE
########################################

cat > core/memory/memory.py << 'EOF'
import json

STORE="core/memory/store.json"

def save(entry):

 data=[]

 try:
  data=json.load(open(STORE))
 except:
  pass

 data.append(entry)

 json.dump(data,open(STORE,"w"))
EOF

########################################
# AUTO PR CLI
########################################

cat > scripts/create_pr.py << 'EOF'
import subprocess,sys

title=sys.argv[1]

subprocess.run(["git","checkout","-b",title])
subprocess.run(["git","add","."])
subprocess.run(["git","commit","-m",title])
subprocess.run(["git","push","-u","origin",title])
subprocess.run(["gh","pr","create","--title",title])
EOF

########################################
# ISSUE -> TASK CONVERTER
########################################

cat > scripts/issue_to_task.py << 'EOF'
import json,sys

task={
 "task_id":sys.argv[1],
 "title":sys.argv[2],
 "allowed_files":["src/**"],
 "tests":[]
}

open(f"tasks/{task['task_id']}.json","w").write(json.dumps(task,indent=2))
EOF

########################################
# SECURITY POLICY
########################################

cat > security/SECURITY.md << 'EOF'
Security Policy

No secrets in repo.
Use environment variables.

Secrets scanning enabled via CI.
EOF

########################################
# .gitignore
########################################

cat > .gitignore << 'EOF'
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
# PRE COMMIT CONFIG
########################################

cat > .pre-commit-config.yaml << 'EOF'
repos:

- repo: https://github.com/gitleaks/gitleaks
  rev: v8.18.1
  hooks:
  - id: gitleaks

- repo: https://github.com/psf/black
  rev: 23.3.0
  hooks:
  - id: black
EOF

########################################
# CI PIPELINE
########################################

cat > .github/workflows/ai_pipeline.yml << 'EOF'
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
    run: python core/repo_index/build_index.py
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

if [ ! -z "$GITHUB_REPO" ]; then

 echo "Creating GitHub repository..."

 gh repo create $GITHUB_REPO --private --source=. --remote=origin --push

fi

echo ""
echo "Project ready:"
echo "$PROJECT_NAME"