Aestra main (origin/main) — headless + architecture blocker map

Scope: audit current main branch (origin/main) for remaining headless/architecture blockers and propose a prioritized action plan.

HEADLESS BLOCKERS (current main)
1) No true project round‑trip headless test.
   - HeadlessMain project scenario only loads an existing .aes and renders it; it doesn’t create → edit → save → reload → compare (C‑008 is still unmet).
   - Tests/headless_scenarios.json only exercises load (autosave.aes), tone, and stress scenarios.
2) Headless builds still depend on the full model stack + plugin scaffolding.
   - AestraAudioCore sources are the full set; there is no AESTRA_HEADLESS_ONLY source trim in main.
   - Any breakage in TrackManager/Playlist/Plugin code can block headless CI despite headless intent.
3) Headless smoke is not wired as a strict CI gate with deterministic success criteria.
   - AestraHeadless prints metrics but no standardized “pass/fail” harness around hash/peak/NaN thresholds for regressions.

ARCHITECTURE BLOCKERS (current main)
1) Shutdown/lifecycle cleanup remains fragile.
   - Main.cpp notes a shutdown hang tied to static singletons (PluginManager/AudioEngine) and COM/ASIO cleanup order.
2) App lifecycle is only partially formalized.
   - AppLifecycle/ServiceLocator exist in AestraApp, but system‑wide lifecycle boundaries and service ownership rules are still not enforced consistently (per EPIC B goals).
3) Audio‑thread safety constraints are not fully guaranteed.
   - AudioThreadConstraints header exists, but there’s no repo‑wide enforcement or audit coverage (EPIC B‑005).
4) Model layer drift (selection model/playlist API mismatch).
   - SelectionModel is commented out in main AestraAudio CMake because it’s stale; indicates architectural coupling gaps between UI/model APIs.

PRIORITIZED ACTION PLAN

Quick wins (1–2 weeks each)
1) Add a true headless project round‑trip scenario (C‑008).
   - Extend HeadlessMain to: create a minimal project in memory, add a clip, save to temp, reload, compare structural hash.
   - Add a deterministic “project_roundtrip” scenario in Tests/headless_scenarios.json.
2) Introduce AESTRA_HEADLESS_ONLY source trimming in AestraAudio/CMakeLists.
   - Build a minimal DSP‑only or model‑minimal core set when headless‑only is enabled to unblock CI.
3) Wire a strict headless CI gate.
   - Create a script (e.g., scripts/run_headless_smoke.sh) that runs AestraHeadless with scenario file + exits non‑zero on failures.
   - Define pass thresholds (no NaNs, minPeak, hash stability for known fixtures).
4) Document headless usage + failure codes in BUILD.md.

Deep fixes (multi‑week, foundational)
1) Finish architectural risk‑reduction pass (EPIC B).
   - Enforce lifecycle states across subsystems; consolidate init/shutdown order; reduce global singletons via ServiceLocator.
2) Resolve shutdown hang (PluginManager/AudioEngine/COM order).
   - Introduce explicit teardown ordering and remove reliance on static destructors.
3) Enforce audio‑thread constraints.
   - Add compile‑time annotations + runtime assertions and audit key paths for allocations/locks.
4) Repair model layer drift.
   - Rewrite SelectionModel for new PlaylistModel API; align UI selection flows with model changes.

Notes
- The headless target exists (AestraHeadless), but it’s currently a render‑only validator; it should become the authoritative project round‑trip gate for save/load determinism.
- Architecture blockers align with EPIC B in docs/technical/v1_beta_task_list.md and the “shutdown hang” TODO in Source/App/Main.cpp.
