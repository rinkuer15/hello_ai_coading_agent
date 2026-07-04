---
name: devox
description: |
  Use when: User wants to run Devox workflows, create workflows/commands, set up Devox, or manage Devox configuration.
  Triggers (run): "use devox to", "run devox", "devox workflow", "use devox for", "have devox", "let devox", "ask devox to".
  Triggers (create): "create a workflow", "write a workflow", "make a command", "author a workflow", "new workflow", "new command", "devox workflow yaml".
  Triggers (setup): "set up devox", "install devox", "how to use devox", "configure devox", "devox setup", "get started with devox".
  Triggers (config): "change my devox config", "modify devox config", "devox config", "change devox settings", "update my config", "edit devox config".
  Triggers (init): "initialize devox", "set up .devox", "devox init", "add devox to repo".
  Capability: Runs AI workflows in isolated git worktrees. Creates and manages workflow YAML files, command files, and configuration.
  NOT for: Direct provider (Claude, Copilot, Codex etc.) Code work - only for delegating to Devox CLI.
argument-hint: "[workflow] [message or issue number]"
---

# Devox CLI Skill

Devox is a remote agentic coding platform that runs AI workflows in isolated git worktrees. This skill teaches you how to run workflows, create new workflows and commands, and manage Devox configuration.

## Available Workflows (live)

!`devox workflow list 2>&1 || echo "Devox CLI not installed. Read guides/setup.md to set it up."`

## Routing

Determine the user's intent and dispatch to the appropriate guide:

| Intent | Action |
|--------|--------|
| **Setup / install / "how to use"** | Read `guides/setup.md` — interactive setup wizard |
| **Config / settings** | Read `guides/config.md` — interactive config editor |
| **Initialize .devox/ in a repo** | Read `references/repo-init.md` |
| **Create a workflow** | Read `references/workflow-dag.md` — the complete workflow authoring guide |
| **Advanced features (hooks/MCP/skills)** | Read `references/dag-advanced.md` |
| **Create a command file** | Read `references/authoring-commands.md` |
| **Variable substitution reference** | Read `references/variables.md` |
| **CLI command reference** | Read `references/cli-commands.md` |
| **Run an interactive workflow** | Read `references/interactive-workflows.md` — transparent relay protocol |
| **Run a workflow (default)** | Continue with "Running Workflows" below |

If the intent is ambiguous, ask the user to clarify.

---

## Running Workflows

### Core Command

```bash
devox workflow run <workflow-name> --branch <branch-name> "<message>"
```

**CRITICAL RULES**:

1. **Always run in background** — Devox workflows are long-running. Always invoke the Bash tool with `run_in_background: true`. Use `/tasks` or the TaskOutput tool to check on progress.

2. **Always use worktree isolation** — Use the `--branch` flag unless the user explicitly requests otherwise. This creates an isolated environment so Devox works without affecting the main branch.

3. **One workflow per shell** — Each workflow blocks its shell. Run multiple workflows as separate background tasks.

### Isolation Modes

| Mode | Flag | When to Use |
|------|------|-------------|
| **Worktree (Default)** | `--branch <name>` | Always use this unless told otherwise |
| **Custom start-point** | `--branch <name> --from <base>` | Start from a specific branch |
| **Direct checkout** | `--no-worktree` | Only if user explicitly requests no isolation |
| **Resume failed run** | `--resume` | Resume from the last failure point |

### Workflow Selection

Match the user's intent to a workflow from the live list above. Common patterns:

| User Intent | Typical Workflow | Branch Pattern |
|-------------|-----------------|----------------|
| "Fix issue #X" / "Resolve bug" | `devox-fix-github-issue` | `fix/issue-{N}` |
| "Review PR #X" / "Full review" | `devox-comprehensive-pr-review` | `review/pr-{N}` |
| "Quick review PR #X" | `devox-smart-pr-review` | `review/pr-{N}` |
| "Validate PR #X" / "Check PR" | `devox-validate-pr` | `review/pr-{N}` |
| "Implement from plan" | `devox-feature-development` | `feat/{name}` |
| "Plan and implement feature" | `devox-idea-to-pr` | `feat/{name}` |
| "Execute plan file" | `devox-plan-to-pr` | `feat/{name}` |
| "Run ralph" / "Implement PRD" | `devox-ralph-dag` | `feat/{name}` |
| "Resolve conflicts" | `devox-resolve-conflicts` | `resolve/pr-{N}` |
| "Create issue" / "File a bug" | `devox-create-issue` | `issue/{name}` |
| "Review issue #X fully" | `devox-issue-review-full` | `review/issue-{N}` |
| "Refactor safely" | `devox-refactor-safely` | `refactor/{name}` |
| "Architecture review" | `devox-architect` | `review/{name}` |
| "PIV loop" / "guided dev" | `devox-piv-loop` ⚡ | `piv/{name}` |
| "Create a PRD" / "interactive PRD" | `devox-interactive-prd` ⚡ | `prd/{name}` |
| General / debugging | `devox-assist` | `assist/{description}` |

⚡ = **Interactive workflow** — requires the transparent relay protocol. Read `references/interactive-workflows.md` before running.

If no specific workflow matches, use `devox-assist` as the fallback. The live workflow list above is always authoritative — it may include workflows not in this table.

### Multi-Issue Invocation

When the user mentions multiple issues, PRs, or tasks — run each as a **separate background task**:

```bash
# Each gets its own worktree — they won't conflict
devox workflow run devox-fix-github-issue --branch fix/issue-10 "Fix issue #10"
devox workflow run devox-fix-github-issue --branch fix/issue-11 "Fix issue #11"
devox workflow run devox-fix-github-issue --branch fix/issue-12 "Fix issue #12"
```

Never combine multiple issues into a single command.

---

## Other CLI Commands

```bash
devox workflow list              # List all available workflows
devox workflow list --json       # Machine-readable JSON
devox isolation list             # Show active worktree environments
devox isolation cleanup          # Remove stale worktrees (default: 7 days)
devox isolation cleanup --merged # Remove branches merged into main
devox complete <branch>          # Complete branch lifecycle (remove worktree + branches)
devox version                    # Show version info
```

For the full CLI reference with all flags: Read `references/cli-commands.md`

---

## Authoring Quick Start

Devox uses a single workflow format: **nodes** (DAG). Workflows are YAML files in `.devox/workflows/`.

**IMPORTANT**: The examples below are starting points. Always design the workflow around what the user actually needs — the number of nodes, their types, dependencies, and configuration should match the user's requirements, not these templates.

### Workflow Structure

```yaml
name: my-workflow
description: What this workflow does
provider: claude          # Optional: 'claude' or 'copilot' or 'codex'
model: sonnet             # Optional: model override
nodes:
  - id: first-node
    command: my-command    # Loads .devox/commands/my-command.md
  - id: second-node
    prompt: "Use the output: $first-node.output"
    depends_on: [first-node]
```

### Four Node Types

Each node has exactly ONE of: `command`, `prompt`, `bash`, or `loop`.

**Command node** — runs a `.devox/commands/*.md` file:
```yaml
- id: investigate
  command: investigate-issue
```

**Prompt node** — inline AI prompt:
```yaml
- id: classify
  prompt: "Classify this issue: $ARGUMENTS"
  model: haiku
  allowed_tools: []
```

**Bash node** — shell script, no AI, stdout captured as output:
```yaml
- id: fetch-data
  bash: "gh issue view 42 --json title,body"
  timeout: 15000
```

**Loop node** — iterates AI prompt until completion:
```yaml
- id: implement
  loop:
    prompt: "Implement next story. When done: <promise>COMPLETE</promise>"
    until: COMPLETE
    max_iterations: 10
    fresh_context: true
    until_bash: "bun run test"    # Optional: exit 0 = done
```

For the full authoring guide with all fields, conditions, trigger rules, and patterns: Read `references/workflow-dag.md`

### Creating a Command File

Commands are `.md` files in `.devox/commands/` containing AI prompt templates:

```markdown
---
description: What this command does
argument-hint: <expected arguments>
---

# My Command

User request: $ARGUMENTS
Workflow artifacts: $ARTIFACTS_DIR

[Instructions for the AI agent]
```

For the full command authoring guide: Read `references/authoring-commands.md`

### Key Variables

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | User's input message |
| `$ARTIFACTS_DIR` | Pre-created directory for workflow artifacts |
| `$BASE_BRANCH` | Base branch (auto-detected from git) |
| `$WORKFLOW_ID` | Unique workflow run ID |
| `$nodeId.output` | Output from upstream node |

Full variable reference: Read `references/variables.md`

### Advanced Features (Command/Prompt Nodes, Claude Only)

`hooks` (tool interception), `mcp` (external tool servers), `skills` (domain knowledge injection), `output_format` (structured JSON output), `allowed_tools`/`denied_tools` (tool restrictions).

For details: Read `references/dag-advanced.md`

### Example Files

- `examples/dag-workflow.yaml` — workflow with conditions, bash nodes, structured output
- `examples/command-template.md` — Command file skeleton with all variables

---

## Example Interactions

**User**: "Use Devox to fix issue #42"
```bash
devox workflow run devox-fix-github-issue --branch fix/issue-42 "Fix issue #42"
```

**User**: "Have Devox review PR #15"
```bash
devox workflow run devox-comprehensive-pr-review --branch review/pr-15 "Review PR #15"
```

**User**: "Create a workflow that reviews code and runs tests"
→ Read `references/workflow-dag.md` and create a workflow with parallel review nodes.

**User**: "Make a workflow with conditional routing"
→ Read `references/workflow-dag.md` and create nodes with `when:` conditions and `output_format`.

**User**: "Write a command file for investigating bugs"
→ Read `references/authoring-commands.md` and create an `.md` file in `.devox/commands/`.

**User**: "Set up Devox in this repo"
→ Read `references/repo-init.md` to create the `.devox/` directory structure.

**User**: "Initialize .devox and create a custom workflow"
→ First read `references/repo-init.md`, then the appropriate workflow reference.
