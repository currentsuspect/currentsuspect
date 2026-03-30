import os

path = os.path.expanduser("~/.openclaw/workspace/plainsight-digital/src/app/page.tsx")
with open(path, "r") as f:
    content = f.read()

old_tilisther = """              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-zinc-800/50 bg-zinc-950/80 rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 text-center group-hover:scale-[1.02] transition-transform duration-700">
                   <div className="w-12 h-12 bg-zinc-800 rounded mb-4" />
                   <div className="w-3/4 h-4 bg-zinc-800 rounded mb-2" />
                   <div className="w-1/2 h-4 bg-zinc-800 rounded" />
                </div>
              </div>"""

new_tilisther = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
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

old_kch = """              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3/4 h-3/4 border border-zinc-800/50 bg-zinc-950/80 rounded-lg shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                   <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   </div>
                   <div className="p-6 flex-1 flex flex-col gap-4">
                     <div className="w-1/3 h-6 bg-zinc-800 rounded" />
                     <div className="w-full h-32 bg-zinc-800/50 rounded mt-auto" />
                   </div>
                 </div>
              </div>"""

new_kch = """              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
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

if old_tilisther in content:
    content = content.replace(old_tilisther, new_tilisther)
else:
    print("Could not find Tilisther placeholder.")

if old_kch in content:
    content = content.replace(old_kch, new_kch)
else:
    print("Could not find KCH placeholder.")

with open(path, "w") as f:
    f.write(content)

