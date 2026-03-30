import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

# Fix Tilisther (from indigo to orange)
content = content.replace('bg-gradient-to-br from-indigo-500 to-blue-600', 'bg-gradient-to-br from-orange-500 to-amber-600')
content = content.replace('shadow-indigo-500/20', 'shadow-orange-500/20')
content = content.replace('bg-indigo-500/10 border border-indigo-500/20 text-indigo-400', 'bg-orange-500/10 border border-orange-500/20 text-orange-400')
content = content.replace('bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3', 'bg-orange-500/10 border border-orange-500/20 rounded-lg p-3')
content = content.replace('text-indigo-300', 'text-orange-300')
content = content.replace('text-indigo-400', 'text-orange-400')

# Fix KCH (from dark green to red)
content = content.replace('bg-[#2D4A32]', 'bg-[#DC2626]')
content = content.replace('text-[#2D4A32]', 'text-[#DC2626]')
content = content.replace('bg-[#1A2E1F]', 'bg-[#991B1B]')
content = content.replace('text-[#1A2E1F]', 'text-[#991B1B]')

with open(path, "w") as f:
    f.write(content)

