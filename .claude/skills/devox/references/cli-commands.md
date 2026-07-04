# Devox CLI Command Reference

All commands must be run from within a git repository (subdirectories work — resolves to repo root). Exceptions: `version`, `setup`, `chat`.

## Workflow Commands

### `devox workflow list`

List all discovered workflows (bundled + repo-defined).

```bash
devox workflow list              # Human-readable table
devox workflow list --json       # Machine-readable JSON output
```

JSON output includes: `{ workflows: [{ name, description, provider?, model? }], errors: [{ filename, error }] }`

### `devox workflow run <name> [message] [flags]`

Execute a workflow.

```bash
devox workflow run devox-assist "What does the auth module do?"
devox workflow run devox-fix-github-issue --branch fix/issue-42 "Fix issue #42"
devox workflow run my-workflow --branch feat/dark-mode --from develop "Add dark mode"
devox workflow run quick-fix --no-worktree "Fix the typo in README"
devox workflow run devox-fix-github-issue --resume
```

| Flag | Description |
|------|-------------|
| `--branch <name>` / `-b` | Branch name for worktree. Reuses existing worktree if healthy |
| `--from <name>` / `--from-branch <name>` | Start-point branch for new worktree (default: repo default branch) |
| `--no-worktree` | Skip isolation — run in the live checkout |
| `--resume` | Resume the last failed run of this workflow (skips completed steps/nodes) |
| `--cwd <path>` | Working directory override |

**Flag conflicts** (errors):
- `--branch` + `--no-worktree`
- `--from` + `--no-worktree`
- `--resume` + `--branch`

**Default behavior** (no flags): Auto-creates a worktree with branch name `{workflow-name}-{timestamp}`.

## Isolation Commands

### `devox isolation list`

Show active worktree environments for all codebases.

```bash
devox isolation list
```

Outputs: branch name, path, workflow type, platform, last activity age. Ghost entries (deleted worktrees) are auto-reconciled.

### `devox isolation cleanup [days]`

Remove stale worktree environments.

```bash
devox isolation cleanup          # Default: 7 days
devox isolation cleanup 14       # Custom: 14 days
devox isolation cleanup --merged # Remove branches merged into main (+ remote branches)
```

## Validate Commands

### `devox validate workflows [name]`

Validate workflow YAML definitions and their referenced resources.

```bash
devox validate workflows                 # Validate all workflows in the repo
devox validate workflows my-workflow     # Validate a single workflow
devox validate workflows my-workflow --json  # Machine-readable JSON output
```

Checks: YAML syntax, DAG structure (cycles, dependency refs), command file existence, MCP config files, skill directories, provider compatibility. Returns actionable error messages with "did you mean?" suggestions for typos.

Exit code: 0 = all valid, 1 = errors found.

### `devox validate commands [name]`

Validate command files (.md) in `.devox/commands/`.

```bash
devox validate commands                  # Validate all commands
devox validate commands my-command       # Validate a single command
```

Checks: file exists, non-empty, valid name.

## Other Commands

### `devox complete <branch> [flags]`

Complete a branch lifecycle — removes worktree + local/remote branches.

```bash
devox complete feature-auth
devox complete feature-auth --force    # Skip uncommitted-changes check
devox complete branch1 branch2 branch3 # Multiple branches
```

## Other Commands

### `devox version`

```bash
devox version
# Devox CLI v0.x.x
#   Platform: darwin-arm64
#   Build: source (bun)
#   Database: sqlite
```

### `devox setup [--spawn]`

Interactive setup wizard for database, AI providers, and platform connections.

```bash
devox setup            # Run in current terminal
devox setup --spawn    # Open wizard in a new terminal window
```

### `devox chat <message>`

Single-shot message to the orchestrator (does not require a git repo).

```bash
devox chat "What platforms are configured?"
devox chat "/status"
```

## Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--cwd <path>` | — | Working directory override |
| `--quiet` | `-q` | Set log level to `warn` (errors only) |
| `--verbose` | `-v` | Set log level to `debug` |
| `--json` | — | Machine-readable JSON output (workflow list) |
| `--help` | `-h` | Print usage and exit |

## Key Environment Variables

| Variable | Purpose |
|----------|---------|
| `CLAUDE_API_KEY` | Claude API key (explicit auth) |
| `CLAUDE_USE_GLOBAL_AUTH` | `true` to use `claude /login` credentials |
| `DEVOX_HOME` | Override base directory (default: `~/.devox`) |
| `LOG_LEVEL` | Pino log level: `fatal\|error\|warn\|info\|debug\|trace` |
| `DATABASE_URL` | PostgreSQL URL (omit for SQLite default) |
