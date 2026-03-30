#!/usr/bin/env python3
import json

with open('/home/currentsuspect/.openclaw/openclaw.json', 'r') as f:
    config = json.load(f)

# DeepSeek models to add to NVIDIA NIM
deepseek_models = [
    {
        "id": "deepseek-ai/deepseek-r1",
        "name": "DeepSeek R1",
        "api": "openai-completions",
        "reasoning": True,
        "input": ["text"],
        "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
        "contextWindow": 128000,
        "maxTokens": 32768
    },
    {
        "id": "deepseek-ai/deepseek-v3.1",
        "name": "DeepSeek V3.1",
        "api": "openai-completions",
        "reasoning": True,
        "input": ["text"],
        "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
        "contextWindow": 128000,
        "maxTokens": 32768
    },
    {
        "id": "deepseek-ai/deepseek-v3.2",
        "name": "DeepSeek V3.2",
        "api": "openai-completions",
        "reasoning": True,
        "input": ["text"],
        "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
        "contextWindow": 128000,
        "maxTokens": 32768
    }
]

# Get existing models
existing_models = config["models"]["providers"]["nvidia-nim"]["models"]
existing_ids = {m["id"] for m in existing_models}

# Add new models if they don't exist
for model in deepseek_models:
    if model["id"] not in existing_ids:
        existing_models.append(model)
        print(f"Added: {model['id']}")
    else:
        print(f"Already exists: {model['id']}")

# Save config
with open('/home/currentsuspect/.openclaw/openclaw.json', 'w') as f:
    json.dump(config, f, indent=2)

print("\nNVIDIA NIM models updated successfully!")
