# AI Project Generator OS

This generator script creates a fully initialized AI-ready project with Git and optional GitHub repository setup.
Follow the instructions below to create a new project and optionally connect it to your own GitHub account.

---

## Prerequisites

Before running the generator, ensure the following tools are installed:

* **Git**
* **GitHub CLI (`gh`)**
* **Python 3** (only needed if your project uses Python scripts)

Authenticate GitHub CLI:

```
gh auth login
```

---

## Basic Command

Run the generator script using the following format:

```
./generate_ai_project.sh <project-name> [github-username/repository-name]
```

The command accepts **two parameters**.

---

## Parameter Explanation

### 1. `<project-name>`

This is the **local directory name** that will be created on your system.

Example:

```
./generate_ai_project.sh my-ai-project
```

This will create a project folder:

```
my-ai-project/
├ agents/
├ core/
├ scripts/
├ tasks/
├ security/
├ .github/
└ .gitignore
```

No GitHub repository will be created in this case. The project will exist **only on your local machine**.

---

### 2. `[github-username/repository-name]` (Optional)

This parameter tells the script to **create a GitHub repository and push the project automatically**.

Format:

```
github-username/repository-name
```

Example:

```
./generate_ai_project.sh my-ai-project your-github-username/my-ai-project
```

What happens when this command runs:

1. A local folder `my-ai-project` is created.
2. Git is initialized inside the folder.
3. All project files are committed.
4. A new GitHub repository is created under `your-github-username`.
5. The project is pushed to GitHub automatically.

Your repository will be available at:

```
https://github.com/your-github-username/my-ai-project
```

---

## Example Usage

### Create a local project only

```
./generate_ai_project.sh seo-agent
```

Result:

```
seo-agent/
```

The project exists only on your local system.

---

### Create a project and push to GitHub

```
./generate_ai_project.sh seo-agent your-github-username/seo-agent
```

Result:

Local folder:

```
seo-agent/
```

GitHub repository:

```
https://github.com/your-github-username/seo-agent
```

---

## Typical Workflow

1. Run the generator script.
2. Navigate to the project directory.

```
cd <project-name>
```

3. Start developing or configure your AI agents.

---

## Notes

* Replace `your-github-username` with your own GitHub account name.
* The GitHub repository name can be anything you choose.
* If the second parameter is omitted, the project will remain local.

---
