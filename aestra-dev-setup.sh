# Aestra Development Powerhouse Setup
# Run this on the VPS to optimize for C++ development

set -e

echo "=== Aestra Dev Powerhouse Setup ==="

# 1. Build Performance Tools
echo "Installing ccache and build optimization tools..."
sudo apt-get update
sudo apt-get install -y ccache ninja-build parallel

# Configure ccache
ccache --max-size=10G
ccache --set-config=sloppiness=pch_defines,time_macros,include_file_mtime

# 2. Clang/LLVM Toolchain (better than GCC for C++)
echo "Installing Clang toolchain..."
wget https://apt.llvm.org/llvm.sh
chmod +x llvm.sh
sudo ./llvm.sh 18
sudo apt-get install -y clang-18 clangd-18 clang-tidy-18 lldb-18
rm llvm.sh

# 3. Development Tools
echo "Installing dev tools..."
sudo apt-get install -y \
    cmake-curses-gui \
    gdb \
    valgrind \
    perf-tools-unstable \
    hotspot \
    doxygen \
    graphviz \
    cppcheck

# 4. Cross-compilation for Windows
echo "Setting up MinGW for Windows builds..."
sudo apt-get install -y mingw-w64

# 5. Python tools for scripting
pip3 install --user \
    compiledb \
    cmake-format \
    clang-format

# 6. Create Aestra build profiles
cat > ~/.config/aestra-build-profiles << 'EOF'
# Aestra Build Profiles

# Fast development build (no optimizations, debug symbols)
ae-dev() {
    cd ~/workspace/Aestra
    cmake -B build-dev -S . \
        -G Ninja \
        -DCMAKE_BUILD_TYPE=Debug \
        -DCMAKE_C_COMPILER=clang-18 \
        -DCMAKE_CXX_COMPILER=clang++-18 \
        -DCMAKE_CXX_COMPILER_LAUNCHER=ccache \
        -DAESTRA_ENABLE_UI=OFF
    ninja -C build-dev
}

# Release build with optimizations
ae-release() {
    cd ~/workspace/Aestra
    cmake -B build -S . \
        -G Ninja \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_C_COMPILER=clang-18 \
        -DCMAKE_CXX_COMPILER=clang++-18 \
        -DCMAKE_CXX_COMPILER_LAUNCHER=ccache \
        -DAESTRA_ENABLE_UI=OFF
    ninja -C build
}

# Fast test run
ae-test() {
    cd ~/workspace/Aestra/build
    ctest --output-on-failure -j$(nproc)
}

# Full clean build
ae-clean() {
    cd ~/workspace/Aestra
    rm -rf build build-dev
    ae-dev
}

# Generate compile_commands.json for clangd
ae-compdb() {
    cd ~/workspace/Aestra
    cmake -B build-dev -S . \
        -G Ninja \
        -DCMAKE_EXPORT_COMPILE_COMMANDS=ON \
        -DCMAKE_BUILD_TYPE=Debug
    ln -sf build-dev/compile_commands.json . || true
}
EOF

# 7. clangd config for IDE support
mkdir -p ~/.config/clangd
cat > ~/.config/clangd/config.yaml << 'EOF'
CompileFlags:
  Add:
    - -std=c++17
    - -I/home/currentsuspect/workspace/Aestra/Source
    - -I/home/currentsuspect/workspace/Aestra/AestraAudio/include
    - -I/home/currentsuspect/workspace/Aestra/AestraCore/include
  Remove:
    - -fno-exceptions

Diagnostics:
  UnusedIncludes: Strict
  MissingIncludes: Strict

Index:
  Background: Build
EOF

# 8. Git hooks for quality
cat > ~/workspace/Aestra/.git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for Aestra

echo "Running pre-commit checks..."

# Check formatting (if clang-format is available)
if command -v clang-format-18 &> /dev/null; then
    echo "Checking formatting..."
    find Source Tests -name "*.cpp" -o -name "*.h" -o -name "*.hpp" | \
        xargs clang-format-18 --dry-run --Werror 2>/dev/null || \
        echo "Warning: Formatting issues found (non-blocking)"
fi

# Quick build test
echo "Quick build verification..."
cd ~/workspace/Aestra
if [ -d build-dev ]; then
    ninja -C build-dev 2>&1 | tail -5
fi

echo "Pre-commit checks complete"
EOF

chmod +x ~/workspace/Aestra/.git/hooks/pre-commit

# 9. Setup ccache in CMake toolchain
cat > ~/workspace/Aestra/cmake/ccache.cmake << 'EOF'
# CCache configuration for Aestra
find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set(CMAKE_C_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
    message(STATUS "Using ccache: ${CCACHE_PROGRAM}")
    message(STATUS "Cache size: 10GB")
endif()
EOF

# 10. Create monitoring dashboard script
cat > ~/bin/aestra-status << 'EOF'
#!/bin/bash
echo "=== Aestra Development Environment ==="
echo ""
echo "Build Status:"
ls -ld ~/workspace/Aestra/build* 2>/dev/null | awk '{print "  " $9 " - " $6 " " $7 " " $8}'
echo ""
echo "ccache Stats:"
ccache -s | grep -E "(cache directory|primary storage|cache hit|cache miss|files in cache)"
echo ""
echo "Latest Commit:"
cd ~/workspace/Aestra && git log --oneline -1
echo ""
echo "Git Status:"
cd ~/workspace/Aestra && git status --short
echo ""
echo "Quick Actions:"
echo "  ae-dev      - Fast debug build"
echo "  ae-release  - Optimized release build"
echo "  ae-test     - Run all tests"
echo "  ae-clean    - Clean rebuild"
echo "  ae-compdb   - Generate compile_commands.json"
EOF

chmod +x ~/bin/aestra-status

# Source the profiles
echo "" >> ~/.bashrc
echo "# Aestra Development Profiles" >> ~/.bashrc
echo "source ~/.config/aestra-build-profiles" >> ~/.bashrc

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Run: source ~/.bashrc"
echo "2. Run: ae-compdb (to generate compile database)"
echo "3. Run: ae-dev (first optimized build)"
echo ""
echo "Tools installed:"
echo "  - ccache (10GB cache)"
echo "  - clang-18 + clangd + clang-tidy"
echo "  - ninja (fast builds)"
echo "  - MinGW (Windows cross-compile)"
echo "  - Hotspot profiler"
echo "  - Valgrind, GDB"
echo ""
