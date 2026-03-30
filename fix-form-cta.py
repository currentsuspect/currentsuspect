import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/components/LeadForm.tsx")
with open(path, "r") as f:
    content = f.read()

# Update the submission success message to include the calendar link
old_success = """      {status === "sent" && (
        <p className="md:col-span-2 text-emerald-400 font-medium">
          ✓ Submitted — we&apos;ll contact you within 24 hours.
        </p>
      )}"""

new_success = """      {status === "sent" && (
        <div className="md:col-span-2 p-5 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-center space-y-3">
          <p className="text-emerald-400 font-medium text-lg">
            ✓ Request Received.
          </p>
          <p className="text-zinc-300 text-sm">
            We are analyzing your current infrastructure right now. <br className="hidden sm:block"/>
            To skip the line, book your audit review call immediately below:
          </p>
          <a href="https://cal.com/dylan-makori-ez5y2j" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-white text-zinc-950 font-bold px-6 py-3 rounded-md hover:scale-105 transition-transform">
             Schedule Review Call 📅
          </a>
        </div>
      )}"""

content = content.replace(old_success, new_success)

with open(path, "w") as f:
    f.write(content)

# Update page.tsx CTAs
page_path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(page_path, "r") as f:
    page_content = f.read()

old_mailto = 'href="mailto:hello@plainsight.digital?subject=Discovery%20Call"'
new_cal = 'href="https://cal.com/dylan-makori-ez5y2j"'
page_content = page_content.replace(old_mailto, new_cal)

# Update whatsapp text to be more committing
old_wa = 'href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital%2C%20I%20want%20a%20premium%20website%20audit."'
new_wa = 'href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital.%20My%20current%20website%20is%20leaking%20leads%20and%20I%20want%20to%20fix%20it.%20Are%20you%20taking%20new%20clients?"'
page_content = page_content.replace(old_wa, new_wa)

with open(page_path, "w") as f:
    f.write(page_content)

