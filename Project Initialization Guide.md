# Project Initialization Guide

This document explains what to do immediately after generating a new project using the AI project generator. The goal is to give the repository enough context so that agents, developers, and automation tools can work efficiently.

---

# 1. First Step After the Project Is Created

Immediately add a **Product Requirements Document (PRD)**.

Create a folder:

```
docs/
```

Add the file:

```
docs/PRD.md
```

Project structure:

```
docs/
 └ PRD.md
```

---

# 2. PRD Structure

Use a simple and clear format.

Example PRD template:

```
# Product Requirements Document

## Project Name
<project name>

## Problem
What problem does this project solve?

## Target Users
Who will use it?

## Core Features
- Feature 1
- Feature 2
- Feature 3

## Success Metrics
- metric
- metric

## Technical Constraints
- stack
- integrations

## Scope
What is included and excluded

## Milestones
Phase 1
Phase 2
Phase 3
```

Short and clear PRDs work better than long documents.

---

# 3. Register the PRD as Project Context

After adding the PRD, build the repository index so the system understands the structure of the project.

Run:

```
python core/repo_index/build_index.py
```

This generates a repository graph which acts as a **map of the codebase**.

---

# 4. Convert the PRD into the First Task

Create the first task file:

```
tasks/initialize_project.json
```

Example:

```
{
 "task_id": "initialize_project",
 "title": "Analyze PRD and generate initial project architecture",
 "allowed_files": [
  "agents/**",
  "core/**",
  "docs/**"
 ],
 "tests": []
}
```

This tells the orchestrator what the first mission is.

---

# 5. Run the Orchestrator

Execute:

```
python core/orchestrator/runner.py
```

The orchestrator loads tasks from the `tasks/` directory and executes them.

---

# 6. Starter Prompt to Initialize the Project

Use the following prompt to initialize the system:

```
You are the project architect for this repository.

Your job is to initialize the system using the PRD.

Steps:

1. Read docs/PRD.md
2. Analyze the repository structure
3. Propose the initial architecture
4. Break the work into milestone tasks
5. Create task manifests inside the tasks/ directory
6. Respect allowed file scopes and change budgets

Output:

- architecture summary
- milestone roadmap
- initial tasks
```

This ensures the system **plans before coding**.

---

# 7. Recommended Early Project Workflow

```
PRD
↓
Architecture Plan
↓
Milestones
↓
Tasks
↓
Pull Requests
```

Avoid this workflow:

```
random coding
random commits
unstructured AI output
```

---

# 8. First Three Starter Tasks

Seed the repository with these tasks:

```
tasks/
 ├ analyze_prd.json
 ├ create_architecture.json
 └ setup_dev_environment.json
```

These tasks stabilize the repository before real development begins.

---

# 9. Core Folders That Should Always Exist

Keep these directories in every project:

```
docs/
tasks/
runs/
```

Meaning:

```
docs  → project knowledge

tasks → agent work queue

runs  → execution history
```

This structure scales well for long-running projects.

---

# Key Takeaway

Immediately after creating the project:

1. Add the PRD
2. Build the repository index
3. Seed the first task
4. Run the orchestrator
5. Let the agent propose the architecture

Following this sequence prevents chaos and provides a structured start for AI-assisted development.
