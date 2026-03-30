import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

# Update Tilisther Mockup
old_tilisther = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                <div className="w-full h-full border border-zinc-800 bg-[#0B0E14] rounded-lg shadow-2xl overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-700 relative">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
                  
                  {/* Header */}
                  <div className="h-10 border-b border-zinc-800 flex items-center px-4 justify-between relative z-10 bg-[#0B0E14]/90 backdrop-blur">
                    <div className="flex flex-col">
                      <div className="text-[10px] font-bold tracking-widest text-zinc-200 leading-none">TILISTHER</div>
                      <div className="text-[5px] text-zinc-500 tracking-wider mt-0.5">CONSTRUCTION & RENOVATION</div>
                    </div>
                    <div className="text-[8px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded">Request Quote</div>
                  </div>
                  
                  {/* Hero */}
                  <div className="p-5 relative z-10 flex-1 flex flex-col justify-center">
                    <div className="inline-block px-2 py-0.5 rounded border border-orange-500/30 bg-orange-500/10 text-[6px] text-orange-400 tracking-wider mb-3 w-max">BUILDING EXCELLENCE</div>
                    <div className="text-2xl sm:text-3xl font-display text-white leading-tight mb-3">Solid foundations.<br/>Exceptional finishes.</div>
                    <div className="text-[8px] text-zinc-400 max-w-[80%] mb-4 leading-relaxed">Delivering premium residential and commercial building projects with precision and reliability.</div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 bg-orange-500 rounded text-[8px] flex items-center justify-center text-zinc-950 font-bold">Start Project &rarr;</div>
                      <div className="px-3 py-1.5 border border-zinc-700 rounded text-[8px] flex items-center justify-center text-white">Our Services</div>
                    </div>
                  </div>
                  
                  {/* Cards */}
                  <div className="px-5 pb-5 flex gap-2 relative z-10">
                    <div className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded p-2.5 backdrop-blur">
                      <div className="text-[10px] text-orange-400 font-bold mb-1">Quality</div>
                      <div className="text-[6px] text-zinc-500">Uncompromising standards</div>
                    </div>
                    <div className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded p-2.5 backdrop-blur">
                      <div className="text-[10px] text-orange-400 font-bold mb-1">Reliable</div>
                      <div className="text-[6px] text-zinc-500">On time, on budget</div>
                    </div>
                  </div>
                </div>
              </div>"""

new_tilisther = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                <div className="w-full h-full border border-zinc-800 bg-[#06080A] rounded-lg shadow-2xl overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-700 relative">
                  
                  {/* Browser Bar */}
                   <div className="h-6 bg-[#0B0F14] border-b border-zinc-800 flex items-center px-3 gap-1.5 shrink-0 z-20">
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="ml-2 flex-1 h-3 bg-[#111823] rounded border border-zinc-800 flex items-center justify-center">
                       <div className="text-[5px] text-zinc-500 font-medium tracking-widest">TILISTHERCRM.COM</div>
                     </div>
                   </div>

                  {/* Header */}
                  <div className="h-10 border-b border-zinc-800/60 flex items-center px-4 justify-between relative z-10 bg-[#0B0F14] shadow-md">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
                         <div className="w-1.5 h-1.5 bg-white rounded-sm rotate-45" />
                       </div>
                       <div className="text-[10px] font-bold tracking-widest text-zinc-100">TILISTHER <span className="text-zinc-500 font-medium tracking-normal">CRM</span></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>
                  </div>
                  
                  {/* Dashboard Body */}
                  <div className="p-4 flex gap-4 h-full relative z-10 bg-[#06080A]">
                    {/* Sidebar */}
                    <div className="w-12 border-r border-zinc-800/50 hidden sm:flex flex-col gap-3 pt-2">
                       <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></div>
                       <div className="w-6 h-6 rounded bg-zinc-800/50 flex items-center justify-center opacity-50"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                       <div className="w-6 h-6 rounded bg-zinc-800/50 flex items-center justify-center opacity-50"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                       <div className="text-[12px] font-medium text-white mb-4">Pipeline Overview</div>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">Total Leads</div>
                             <div className="text-lg font-display text-white">124</div>
                          </div>
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">In Negotiation</div>
                             <div className="text-lg font-display text-white">18</div>
                          </div>
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">Pipeline Value</div>
                             <div className="text-lg font-display text-emerald-400">kes 4.2M</div>
                          </div>
                          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                             <div className="text-[6px] text-indigo-300 uppercase tracking-wide mb-1">Conversion</div>
                             <div className="text-lg font-display text-indigo-400">14.5%</div>
                          </div>
                       </div>
                       
                       {/* Table Mockup */}
                       <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 overflow-hidden">
                          <div className="h-6 border-b border-zinc-800/80 flex items-center mb-2 px-1">
                             <div className="w-1/3 text-[5px] text-zinc-500 uppercase">Client</div>
                             <div className="w-1/4 text-[5px] text-zinc-500 uppercase">Status</div>
                             <div className="w-1/4 text-[5px] text-zinc-500 uppercase">Value</div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <div className="h-8 bg-zinc-800/20 rounded flex items-center px-2">
                                <div className="w-1/3 flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-zinc-700" />
                                   <div className="h-1.5 w-12 bg-zinc-300 rounded" />
                                </div>
                                <div className="w-1/4"><div className="px-1.5 py-0.5 rounded text-[4px] bg-emerald-500/20 text-emerald-400 w-max border border-emerald-500/20">Closed Won</div></div>
                                <div className="w-1/4 h-1.5 w-8 bg-zinc-500 rounded" />
                             </div>
                             <div className="h-8 bg-zinc-800/20 rounded flex items-center px-2">
                                <div className="w-1/3 flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-zinc-700" />
                                   <div className="h-1.5 w-16 bg-zinc-400 rounded" />
                                </div>
                                <div className="w-1/4"><div className="px-1.5 py-0.5 rounded text-[4px] bg-amber-500/20 text-amber-400 w-max border border-amber-500/20">Negotiating</div></div>
                                <div className="w-1/4 h-1.5 w-10 bg-zinc-600 rounded" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>"""

# Update KCH Mockup
old_kch = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                 <div className="w-full h-full border border-zinc-800 bg-white rounded-lg shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                   
                   {/* Browser Bar */}
                   <div className="h-6 bg-zinc-100 border-b border-zinc-200 flex items-center px-3 gap-1.5 shrink-0">
                     <div className="w-2 h-2 rounded-full bg-zinc-300" />
                     <div className="w-2 h-2 rounded-full bg-zinc-300" />
                     <div className="w-2 h-2 rounded-full bg-zinc-300" />
                     <div className="ml-2 flex-1 h-3 bg-white rounded border border-zinc-200 flex items-center px-2">
                       <div className="text-[5px] text-zinc-400">kch-website.org</div>
                     </div>
                   </div>
                   
                   {/* Nav */}
                   <div className="h-10 flex items-center justify-between px-4 shrink-0 bg-white border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full opacity-50" />
                        </div>
                        <div className="text-[8px] font-bold text-zinc-800 leading-tight">Kenya<br/>Children's<br/>Homes</div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="text-[7px] text-zinc-600 font-medium">About</div>
                        <div className="text-[7px] text-zinc-600 font-medium">Programs</div>
                        <div className="bg-red-600 text-white text-[7px] px-2.5 py-1 rounded font-bold shadow-sm shadow-red-600/20">Donate</div>
                      </div>
                   </div>
                   
                   {/* Hero */}
                   <div className="bg-red-600 p-6 sm:p-8 text-center shrink-0 relative overflow-hidden flex flex-col justify-center h-1/2">
                     <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                     <div className="relative z-10">
                       <div className="text-lg sm:text-2xl font-bold text-white mb-2 leading-tight">Welcome to Kenya Children's Homes</div>
                       <div className="text-[8px] sm:text-[10px] text-red-100 mb-4">Caring for Kenya's vulnerable children since 1962</div>
                       <div className="flex justify-center gap-2">
                         <div className="bg-white text-red-600 text-[8px] px-3 py-1.5 rounded font-bold shadow-sm">Learn More</div>
                         <div className="bg-transparent border border-white text-white text-[8px] px-3 py-1.5 rounded font-bold">Donate Now</div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Stats Row */}
                   <div className="bg-[#fff5f5] flex-1 p-4 flex flex-col justify-center items-center">
                     <div className="text-[10px] font-bold text-zinc-800 mb-3">Our Impact</div>
                     <div className="flex gap-2 w-full justify-center max-w-[90%]">
                       <div className="bg-white rounded-lg shadow-sm border border-red-100 p-2 text-center flex-1">
                         <div className="text-[10px] sm:text-xs font-bold text-red-600">1962</div>
                         <div className="text-[5px] sm:text-[6px] text-zinc-500 mt-1 uppercase tracking-wider">Founded</div>
                       </div>
                       <div className="bg-white rounded-lg shadow-sm border border-red-100 p-2 text-center flex-1">
                         <div className="text-[10px] sm:text-xs font-bold text-red-600">6,000+</div>
                         <div className="text-[5px] sm:text-[6px] text-zinc-500 mt-1 uppercase tracking-wider">Children Cared For</div>
                       </div>
                       <div className="bg-white rounded-lg shadow-sm border border-red-100 p-2 text-center flex-1 hidden sm:block">
                         <div className="text-[10px] sm:text-xs font-bold text-red-600">500</div>
                         <div className="text-[5px] sm:text-[6px] text-zinc-500 mt-1 uppercase tracking-wider">Supported Yearly</div>
                       </div>
                     </div>
                   </div>
                   
                 </div>
              </div>"""

new_kch = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                 <div className="w-full h-full border border-zinc-800 bg-[#F5F1EB] rounded-lg shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                   
                   {/* Browser Bar */}
                   <div className="h-6 bg-[#E8E2D9] border-b border-[#D8CFC0] flex items-center px-3 gap-1.5 shrink-0 z-20">
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="ml-2 flex-1 h-3 bg-[#F5F1EB] rounded border border-[#D8CFC0] flex items-center justify-center">
                       <div className="text-[5px] text-[#8C8270] font-medium">kenyachildrenshome.org</div>
                     </div>
                   </div>
                   
                   {/* Nav */}
                   <div className="h-12 flex items-center justify-between px-6 shrink-0 bg-white border-b border-[#E8E2D9]">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden bg-[#2D4A32]">
                           <div className="w-3 h-3 border border-white/60 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                           <div className="text-[8px] font-bold text-[#2D4A32] leading-none uppercase tracking-wide">Kenya Children's</div>
                           <div className="text-[8px] font-bold text-[#2D4A32] leading-none uppercase tracking-wide">Homes</div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">WHO WE ARE</div>
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">WHAT WE DO</div>
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">GET INVOLVED</div>
                        <div className="bg-[#2D4A32] text-white text-[7px] px-3 py-1.5 rounded-sm font-bold tracking-wider ml-2">DONATE</div>
                      </div>
                   </div>
                   
                   {/* Hero */}
                   <div className="bg-[#1A2E1F] p-6 sm:p-8 shrink-0 relative overflow-hidden flex flex-col justify-center flex-1">
                     <div className="absolute inset-0 bg-[#2D4A32] mix-blend-overlay opacity-50" />
                     {/* Decorative subtle leaves pattern representation */}
                     <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-white/5 rounded-full" />
                     <div className="absolute -left-10 top-10 w-20 h-20 border border-white/5 rounded-full" />
                     
                     <div className="relative z-10 max-w-[80%]">
                       <div className="inline-block border-b border-[#C1A875] pb-0.5 text-[6px] text-[#C1A875] uppercase tracking-widest mb-3 font-semibold">Transforming Lives</div>
                       <div className="text-xl sm:text-3xl font-display text-white mb-3 leading-[1.1]">Give a child<br/>a family and<br/>a future.</div>
                       <div className="flex gap-3 mt-5">
                         <div className="bg-[#C1A875] text-[#1A2E1F] text-[8px] px-4 py-2 rounded-sm font-bold uppercase tracking-wider">Sponsor A Child</div>
                         <div className="border border-white/30 text-white text-[8px] px-4 py-2 rounded-sm font-bold uppercase tracking-wider">Our Impact</div>
                       </div>
                     </div>
                   </div>
                   
                 </div>
              </div>"""

content = content.replace(old_tilisther, new_tilisther)
content = content.replace(old_kch, new_kch)

with open(path, "w") as f:
    f.write(content)

