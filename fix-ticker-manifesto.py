import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

# 1. Add Ticker component right after Hero section
ticker_html = """
      {/* Live Audit Ticker */}
      <div className="w-full border-y border-zinc-800/50 bg-zinc-950/80 py-3 overflow-hidden flex whitespace-nowrap">
        <div className="animate-ticker inline-flex gap-8 px-4 items-center">
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Commercial Law Firm — 64% Lead Leakage Found</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Private Clinic (Nairobi) — 3 Critical Conversion Gaps</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [NEW CLIENT] Construction Firm — Funnel Optimization Started</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Logistics Co (Mombasa) — Mobile Funnel Broken</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Real Estate Developer — Missing Quote Calculator</span>
          {/* Duplicate for infinite scroll */}
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Commercial Law Firm — 64% Lead Leakage Found</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Private Clinic (Nairobi) — 3 Critical Conversion Gaps</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [NEW CLIENT] Construction Firm — Funnel Optimization Started</span>
        </div>
      </div>
"""

# Insert ticker right after the hero section closes
content = content.replace("      </section>\n\n      {/* The Model / Pitch */}", f"      </section>\n{ticker_html}\n      {{/* The Model / Pitch */}}")

# 2. Add Manifesto right before the Portfolio section
manifesto_html = """
      {/* The Anti-Agency Manifesto */}
      <section className="px-5 py-24 mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-rose-500 font-medium mb-6">The Industry Lie</p>
        <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight mb-8">
          Traditional agencies are selling you <br/><span className="text-zinc-500 line-through decoration-rose-500 decoration-2">expensive brochures.</span>
        </h2>
        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
          <p>Most web agencies sell you "branding", hand you the keys, and leave you with a beautiful website that gets zero traffic.</p>
          <p>We think that's a scam.</p>
          <p className="text-white font-medium">We don't care about design awards. We care about pipeline.</p>
          <p>We build your infrastructure for a flat rate, but we actually stick around and run the lead generation systems on commission. <strong className="text-amber-400 font-normal">If our system doesn't bring you clients, we don't get paid for our ongoing work.</strong></p>
        </div>
      </section>
"""

content = content.replace("      {/* Portfolio Section */}", f"{manifesto_html}\n      {{/* Portfolio Section */}}")

with open(path, "w") as f:
    f.write(content)

# Update globals.css with the ticker animation
css_path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/globals.css")
with open(css_path, "r") as f:
    css_content = f.read()

ticker_css = """
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-ticker {
  animation: ticker 40s linear infinite;
  min-width: 200%;
}
.animate-ticker:hover {
  animation-play-state: paused;
}
"""

if "animate-ticker" not in css_content:
    with open(css_path, "a") as f:
        f.write(f"\n{ticker_css}")

