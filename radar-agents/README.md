# Resonance Radar Agents

Five internet-native scout agents for Dylan.

These are not "autonomous do-everything" agents. They're narrow, recurring scouts with taste.
Each one has:
- a mission
- source lanes
- filters
- output contract
- a base prompt

## The Five Agents

1. **Tool Scout** — finds new AI/dev tools worth testing
2. **Lead Scout** — finds businesses and outreach opportunities
3. **Model Watcher** — tracks model/provider/release changes
4. **Grant Hunter** — finds credits, grants, hackathons, and perks
5. **Scene Reader** — surfaces smart, strange, off-axis internet signals

## Shared Design Principles

- Prefer high-signal summaries over raw dumps
- Rank results, don't just list them
- Avoid obvious mainstream sludge unless it matters
- Surface why something matters specifically to Dylan
- End with a concrete next action

## Suggested Daily Output Format

For each agent:
- **What happened**
- **Why it matters**
- **Confidence**
- **Action to take next**

## Suggested Weekly Digest Structure

- Top 3 things to act on this week
- 2 things to watch quietly
- 1 weird rabbit hole worth exploring
- 1 opportunity with asymmetric upside

## File Layout

- `agents/*.md` — individual agent specs
- `prompts/*.txt` — prompt templates
- `config/sources.md` — candidate source pools
- `templates/digest.md` — output template

## Next Build Step

Wire these agents to a scheduled fetch + summarize pipeline, then deliver to Telegram and/or the Everything vault.
