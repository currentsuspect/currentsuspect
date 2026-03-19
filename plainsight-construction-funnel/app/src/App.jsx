import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Hammer,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Warehouse,
} from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Residential Projects',
    text: 'New builds, extensions, finishing works, and home renovations for people ready to start serious projects.',
  },
  {
    icon: Warehouse,
    title: 'Commercial Works',
    text: 'Office fit-outs, retail spaces, contractor matching, and structured quote requests for business clients.',
  },
  {
    icon: Hammer,
    title: 'Renovation & Finishing',
    text: 'Interior updates, structural improvements, and workmanship-focused projects that need fast qualified follow-up.',
  },
]

const steps = [
  'Tell us about your construction project',
  'We review and qualify the request',
  'You get connected to the right construction provider',
  'Follow-up happens quickly via phone or WhatsApp',
]

const fields = [
  'Full Name',
  'Phone Number',
  'Email Address',
  'Location',
  'Project Type',
  'Budget Range',
  'Timeline',
  'Residential or Commercial',
  'Short Project Description',
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f17] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_28%),linear-gradient(180deg,#0a0f17_0%,#101827_50%,#121b2c_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.42em] text-orange-300/80">PlainSight Digital</div>
            <div className="mt-1 text-2xl font-black md:text-3xl">Construction Lead Funnel</div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#quote" className="hover:text-white">Request Quote</a>
          </nav>
          <a href="#quote" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10">Get Started</a>
        </header>

        <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <section className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-orange-300"
              >
                Construction leads • quote requests • WhatsApp follow-up
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-7 max-w-4xl text-5xl font-black leading-[0.93] tracking-tight md:text-7xl"
              >
                Get matched with <span className="text-orange-400">trusted construction professionals</span> for your next project.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-300/85"
              >
                Whether you are planning a home build, renovation, fit-out, or commercial works, this funnel helps capture qualified inquiries and route them into a proper follow-up system.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-400 px-7 py-4 font-bold text-slate-950 shadow-[0_20px_80px_rgba(249,115,22,.22)] transition hover:-translate-y-0.5">
                  Request a Quote <ArrowRight size={18} />
                </a>
                <a href="#how" className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold hover:bg-white/10">
                  See how it works
                </a>
              </motion.div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <StatCard title="Fast" text="Lead capture and follow-up" accent="text-orange-400" />
                <StatCard title="Qualified" text="Better project details upfront" accent="text-amber-300" />
                <StatCard title="Secure" text="Clean, low-risk funnel setup" accent="text-emerald-300" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-[2rem] bg-orange-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Lead Preview</div>
                    <div className="mt-1 text-lg font-bold">Quote Request Snapshot</div>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Ready</div>
                </div>
                <div className="space-y-5 p-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-slate-400">New Quote Request</div>
                        <div className="mt-2 text-2xl font-black">Karen Residential Extension</div>
                        <div className="mt-2 text-sm text-slate-300/80">Residential • Nairobi • KES 1.5M – 3M</div>
                      </div>
                      <div className="rounded-2xl bg-orange-400/15 px-3 py-2 text-sm font-semibold text-orange-300">Warm Lead</div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300/80">
                      <div className="rounded-2xl bg-black/20 p-3">Client: Mary N.</div>
                      <div className="rounded-2xl bg-black/20 p-3">Timeline: 2 months</div>
                      <div className="rounded-2xl bg-black/20 p-3">Source: Website funnel</div>
                      <div className="rounded-2xl bg-black/20 p-3">Contact: Phone + Email</div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <MiniPanel icon={PhoneCall} title="Fast Follow-up" text="Call or WhatsApp the client quickly while project intent is still fresh." />
                    <MiniPanel icon={ShieldCheck} title="Secure Routing" text="Keep inquiry handling organized without exposing a bloated public backend." />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="services" className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-orange-300/75">Lead Categories</div>
                <h2 className="mt-3 text-4xl font-black md:text-5xl">What this funnel can capture.</h2>
              </div>
              <p className="max-w-xl text-slate-300/75">This can later expand into multiple lead-gen lanes, but construction is the first focused niche.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                  <Icon className="text-orange-300" size={26} />
                  <h3 className="mt-4 text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-7 text-slate-300/75">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="how" className="mt-24 grid gap-8 lg:grid-cols-[.9fr_1.1fr] items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-amber-300/75">How It Works</div>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Simple, fast, and reusable.</h2>
              <p className="mt-5 max-w-xl leading-8 text-slate-300/80">This is designed to be a PlainSight-owned acquisition asset: capture demand, qualify leads, and turn them into opportunities for partner contractors or direct clients.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-400 font-black text-slate-950">{idx + 1}</div>
                  <p className="pt-1 text-slate-300/85">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="quote" className="mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-orange-300/75">Main Conversion Form</div>
                <h2 className="mt-3 text-4xl font-black">Request a construction quote.</h2>
                <p className="mt-5 leading-8 text-slate-300/80">This MVP is front-end only for now, but the structure is ready for Supabase, Airtable, Google Sheets, Formspree, or a custom backend later.</p>
                <div className="mt-6 space-y-3">
                  {fields.map((field) => (
                    <div key={field} className="flex items-center gap-3 text-sm text-slate-300/80">
                      <CheckCircle2 size={18} className="text-emerald-300" />
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>
              <form className="grid gap-4 md:grid-cols-2">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Phone Number" placeholder="+254..." />
                <Input label="Email Address" placeholder="you@example.com" type="email" />
                <Input label="Location" placeholder="Nairobi, Karen, Syokimau..." />
                <Select label="Project Type" options={["New Build", "Renovation", "Fit-out", "Finishing", "Commercial Works"]} />
                <Select label="Budget Range" options={["Below KES 500k", "KES 500k - 1.5M", "KES 1.5M - 3M", "KES 3M+"]} />
                <Select label="Timeline" options={["ASAP", "Within 1 month", "1-3 months", "3+ months"]} />
                <Select label="Category" options={["Residential", "Commercial"]} />
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-200">Project Description</label>
                  <textarea placeholder="Tell us what you need..." rows="5" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400/40 focus:outline-none" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5">
                    Submit Request <ArrowRight size={18} />
                  </button>
                  <div className="inline-flex items-center gap-2 text-sm text-slate-300/80">
                    <MessageCircle size={18} className="text-green-400" />
                    WhatsApp follow-up can be added as next step
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section className="mt-24 text-center">
            <div className="text-xs uppercase tracking-[0.35em] text-amber-300/75">PlainSight Digital Asset</div>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Construction is now a client type we can actively serve.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300/80">This is the first reusable funnel. Later, the same architecture can expand into healthcare, logistics, legal, and other lead-generation lanes.</p>
          </section>
        </main>
      </div>
    </div>
  )
}

function Input({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400/40 focus:outline-none" />
    </div>
  )
}

function Select({ label, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-orange-400/40 focus:outline-none">
        <option>Select an option</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

function StatCard({ title, text, accent }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className={`text-3xl font-black ${accent}`}>{title}</div>
      <p className="mt-2 text-sm text-slate-300/80">{text}</p>
    </div>
  )
}

function MiniPanel({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <Icon className="text-orange-300" size={22} />
      <div className="mt-3 text-sm font-bold">{title}</div>
      <p className="mt-2 text-sm leading-7 text-slate-300/80">{text}</p>
    </div>
  )
}
