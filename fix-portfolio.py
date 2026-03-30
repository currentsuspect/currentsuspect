import os
path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

# Fix KCH
content = content.replace("Corporate / Medical", "Non-Profit / NGO")
content = content.replace(
    "A massive overhaul of digital infrastructure for Kenyatta Children's Hospital. Streamlined patient onboarding, improved accessibility, and created a trustworthy digital footprint.",
    "A complete digital overhaul for Kenya Children's Home (KCH). We focused on building international trust, streamlining the donation pipeline, and creating a highly reliable digital footprint for global sponsors."
)
content = content.replace("Patient donation & booking flows", "Frictionless global donation flows")
content = content.replace("Authority-first design system", "Trust & authority-first design")

# Fix Construction
content = content.replace(
    "A specialized lead-capture funnel designed for high-ticket commercial contractors. Integrated with an automated booking system and SMS follow-ups to close gaps in the sales process.",
    "A specialized lead-capture funnel and opportunity calculator built for the construction sector. It actively qualifies commercial prospects and captures exact project scopes before a call is even booked."
)
content = content.replace("Automated CRM routing", "Automated lead qualification")
content = content.replace("High-intent quote calculator", "Dynamic project opportunity calculator")

with open(path, "w") as f:
    f.write(content)
