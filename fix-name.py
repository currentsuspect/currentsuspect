import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

content = content.replace("Plainsight Construction", "Tilisther Construction")

with open(path, "w") as f:
    f.write(content)
