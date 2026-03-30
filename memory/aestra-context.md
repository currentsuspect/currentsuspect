# Aestra — DAW Project Context

## What It Is
Aestra is a pattern-based Digital Audio Workstation (DAW) built in C++17, targeting hip-hop/trap production. Think FL Studio meets Ableton — pattern-first workflow with a modern glass/neon UI.

**Version:** 0.1.0 | **Target v1 Beta:** December 2026

## Architecture

### Module Layout
| Module | Path | Purpose |
|--------|------|---------|
| **AestraCore** | `AestraCore/` | Foundation — logging, threading, UUID, profiler |
| **AestraAudio** | `AestraAudio/` | Audio engine, models, DSP, playback, plugins |
| **AestraUI** | `AestraUI/` | Custom OpenGL UI framework (NUI — "Native UI") |
| **AestraPlat** | `AestraPlat/` | Platform abstraction (SDL2 on Linux, Win32 on Windows) |
| **AestraPlugins** | `AestraPlugins/` | Built-in plugins (Rumble — sub-bass synthesizer) |
| **Source/** | `Source/` | App code — components, panels, settings, HUD |

### Key Source Files
| File | Role |
|------|------|
| `Source/Core/AestraContent.cpp` | Main content area — view management, sample loading, plugin loading |
| `Source/Components/TrackManagerUI.cpp` (~5000 lines) | Timeline rendering, clip drag-drop, waveform display, toolbar |
| `Source/Components/TrackUIComponent.cpp` (~2400 lines) | Per-track rendering — clips, waveforms, step grid |
| `AestraAudio/include/Models/PlaylistModel.h` | Playlist/arrangement model — lanes, clips |
| `AestraAudio/include/Models/PatternManager.h` | Pattern system — MIDI and audio patterns |
| `AestraAudio/include/Models/ClipInstance.h` | Clip instance struct — what gets placed on timeline |
| `AestraAudio/include/Models/ClipSource.h` | Audio source — file loading, buffer management |
| `AestraAudio/include/Models/SourceManager.h` | Source registry — file path → source ID mapping |
| `AestraAudio/include/Models/UnitManager.h` | Arsenal unit system — per-unit state (name, color, audioClipPath, plugin) |
| `AestraAudio/src/Core/AudioEngine.cpp` | Main audio engine — RT thread, command queue, voice management |
| `AestraAudio/src/IO/MiniAudioDecoder.cpp` | Audio file decoder (WAV native + miniaudio for MP3/FLAC/OGG) |

### Data Flow: Dropping a Sample on Timeline
```
FileBrowser drag → NUIDragDropManager → TrackManagerUI::onDrop()
  → SourceManager::getOrCreateSource(filePath)
  → Background thread: decodeAudioFile() → source->setBuffer()
  → Main thread: PatternManager::createAudioPattern(name, beats, payload)
  → PlaylistModel::addClipFromPattern(laneId, patternId, startBeat, duration)
  → TrackManagerUI::refreshTracks() → TrackUIComponent renders clips
  → WaveformCacheBuilder::buildAsync() → waveform rendering
```

### Data Flow: Playback
```
TrackManager::play() → commandSink → AudioEngine::commandQueue
  → RT thread: PatternPlaybackEngine resolves clips → voices
  → AudioGraph processes mixer channels → output
```

## View Modes
- **Arsenal** — Pattern/step sequencer mode (per-unit grid, audition sounds)
- **Timeline** — Arrangement view (clips on lanes, waveform display)
- **Audition** — A/B comparison mode (bounce tracks, queue playback)

## Build System
- **CMake 3.22+** with Ninja generator
- **C++17** standard
- **Linux build dir:** `/home/currentsuspect/Aestra/build-linux/`
- **Windows primary target**, Linux secondary
- **Presets:** `headless`, `full`, `full-fast`

### Known Linux Build Issues
1. `AestraPlat/CMakeLists.txt` line 45: `target_compile_definitions` called before `add_library` (SDL2 path) — fixed locally
2. Missing `PlatformFileSystemLinux.cpp` — stub needed
3. `RegisterPlatformDrivers` undefined — Linux audio driver registration stub needed
4. `getModifiers()` const-correctness in `PlatformWindowLinux`

## Phase Roadmap
| Phase | Focus | Timeline |
|-------|-------|----------|
| Phase 1 | Foundation lock | ✅ Complete |
| Phase 2 | Project reliability, undo/redo | ⏳ In Progress |
| Phase 3 | Recording + Export | Jul–Sep 2026 |
| Phase 4 | Plugin decision | Sep 2026 |
| Phase 5 | UX hardening | Oct–Nov 2026 |
| Phase 6 | v1 Beta release | Dec 2026 |

### Phase 2 P0 Tasks
- [ ] E-001: Define canonical command model for undo/redo
- [ ] E-002: Integrate command history across main UX
- [ ] E-003: Transactions/atomic grouping for multi-step edits
- [ ] C-001: Project schema versioning policy
- [ ] D-003: Recovery UX on startup

## Git
- **Repo:** `currentsuspect/Aestra` on GitHub (private)
- **Branch:** `develop` (active), `main` (stable)
- **CI:** Matrix builds (Windows/Linux/macOS) with Discord notifications

## Bug History (for context)
- 2026-03-28: Fixed `addClipFromPattern` not setting `clip.patternId` — caused clips to not render/play on timeline
- 2026-03-28: Fixed `AudioEngine::setTransportPlaying` not wired to command sink
- 2026-03-28: Fixed `ChannelSlotMap` not rebuilt on `addChannel` — mixer channels not showing

## UI Framework (NUI)
Custom OpenGL UI framework — NOT JUCE, NOT ImGui. Components derive from `NUIComponent`, have `onRender()`, `onMouseEvent()`, `onKeyEvent()`. Uses FBO caching, theme system, drag-drop manager. Think React-like component tree rendered with OpenGL.
