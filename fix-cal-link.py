import os

files_to_update = [
    "~/.openclaw/workspace/plainsight-digital/src/components/LeadForm.tsx",
    "~/.openclaw/workspace/plainsight-digital/src/app/page.tsx"
]

old_link = "https://cal.com/dylan-makori-ez5y2j"
new_link = "https://cal.com/plainsightdigital/30min"

for path_str in files_to_update:
    path = os.path.expanduser(path_str)
    with open(path, "r") as f:
        content = f.read()
    
    if old_link in content:
        content = content.replace(old_link, new_link)
        with open(path, "w") as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"No old link found in {path}")

