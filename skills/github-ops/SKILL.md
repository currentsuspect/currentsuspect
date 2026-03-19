---
name: github-ops
description: Operate GitHub via the gh CLI and git for repo management, issues, PRs, reviews, CI status checks, releases, and project hygiene. Use for tasks like creating repos, cloning, branching, opening/triaging issues, drafting PRs, checking workflows, or querying repo metadata (especially currentsuspect/Aestra).
---

# GitHub Ops

## Overview
Use gh CLI + git to manage GitHub repos, issues, PRs, and CI. Prefer safe, explicit actions and confirm before destructive changes.

## Quick Start (per session)
1. **Check auth**: `gh auth status` (ask for login if not authenticated).
2. **Set repo context** when applicable: `gh repo set-default currentsuspect/Aestra`.
3. **Confirm local repo path** before git actions.

## Core Tasks

### Repo setup & cloning
- Create repo: `gh repo create <name> --public|--private --description "..."`.
- Clone: `gh repo clone <owner>/<repo>`.
- Set default repo: `gh repo set-default <owner>/<repo>`.
- List repos: `gh repo list <owner> --limit 50`.

### Issues
- Create: `gh issue create --title "..." --body "..." [--label "..."] [--assignee "..."]`.
- List/filter: `gh issue list --label "..." --state open`.
- View: `gh issue view <id> --comments`.
- Close only after explicit confirmation.

### Pull requests
- Create from branch: `gh pr create --title "..." --body "..."`.
- List: `gh pr list`.
- View: `gh pr view <id> --comments`.
- Check status: `gh pr status`.
- Merge only after explicit confirmation and CI green.

### CI / Workflows
- List workflows: `gh workflow list`.
- View runs: `gh run list --limit 20`.
- Inspect run: `gh run view <run-id> --log` (ask before downloading full logs if large).

### Branching & git hygiene (local)
- Create branch: `git checkout -b <branch>`.
- Status: `git status -sb`.
- Commit: `git commit -m "..."`.
- Push: `git push -u origin <branch>`.
- Avoid force-push unless explicitly requested.

## Safety & Confirmation
- Confirm before: deleting branches, force pushes, closing issues, merging PRs, or altering CI settings.
- If uncertain, ask for repo/branch/issue IDs rather than guessing.

## Aestra context
- Primary repo: **currentsuspect/Aestra** (DAW project).
- Prefer structured issue templates and clear PR summaries.
- Keep changelog/release notes concise and user‑focused.
