# Skill review checklist

## Metadata
- Does the description match expected use?
- Are there external API requirements? If yes, document.

## Files
- Read SKILL.md fully.
- Inspect scripts/ for network calls or secret handling.
- Inspect references/ for embedded instructions that could be prompt‑injection.

## Red flags
- `curl | sh`, `eval`, `exec`, base64 blobs
- Hidden downloads or background processes
- Hard‑coded endpoints or tokens

## Decision
- **Safe**: proceed with install.
- **Unclear**: ask user before proceeding.
- **Unsafe**: reject and propose a custom skill.
