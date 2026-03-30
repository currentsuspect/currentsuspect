import os
path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

# Add sticky bottom CTA & WhatsApp Float back
sticky_cta = """
      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <a
          href="/audit"
          className="block w-full rounded-md bg-amber-400 py-3.5 text-center text-sm font-bold text-zinc-950 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
        >
          Get Free Website Audit
        </a>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital%2C%20I%20want%20a%20premium%20website%20audit."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Plainsight Digital on WhatsApp"
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 md:bottom-6 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.54 0 .23 5.3.23 11.83c0 2.08.54 4.1 1.57 5.88L0 24l6.45-1.7a11.8 11.8 0 0 0 5.62 1.43h.01c6.52 0 11.83-5.31 11.84-11.84a11.8 11.8 0 0 0-3.4-8.41ZM12.08 21.73h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.83 1.01 1.02-3.74-.23-.38a9.81 9.81 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.42-4.42 9.83-9.77 9.9Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.64.08-.3-.15-1.24-.45-2.36-1.44-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </main>
"""

content = content.replace("    </main>", sticky_cta)

# Update the footer links
old_footer = """          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/audit" className="hover:text-amber-400 transition">Audit</a>
            <a href="mailto:hello@plainsight.digital" className="hover:text-amber-400 transition">Email</a>
            <a href="https://wa.me/254750192512" className="hover:text-amber-400 transition">WhatsApp</a>
          </div>"""

new_footer = """          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            <a href="/blog" className="hover:text-amber-400 transition">Blog</a>
            <a href="/promise" className="hover:text-amber-400 transition">Our Promise</a>
            <a href="/audit" className="hover:text-amber-400 transition">Audit</a>
            <a href="mailto:hello@plainsight.digital" className="hover:text-amber-400 transition">Email</a>
            <a href="https://wa.me/254750192512" className="hover:text-amber-400 transition">WhatsApp</a>
          </div>"""

content = content.replace(old_footer, new_footer)

with open(path, "w") as f:
    f.write(content)

