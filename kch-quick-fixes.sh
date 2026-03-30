#!/bin/bash
# KCH Quick Fixes Script
# Run this in the kch-website directory

cd ~/.openclaw/workspace/kch-website

echo "=== KCH Website Quick Fixes ==="

# 1. Text changes
echo "Changing 'Projects' to 'Programs'..."
sed -i 's/Projects/Programs/g' src/components/Navigation.astro

echo "Changing 'Our work' to 'Our programs'..."
sed -i 's/Our work/Our programs/g' src/pages/index.astro

echo "Changing 'Kenyan Board' to 'Board'..."
sed -i 's/Kenyan Board/Board/g' src/pages/about.astro

echo "Changing 'Home' to 'Homes' in header..."
sed -i "s/Kenya Children's Home/Kenya Children's Homes/g" src/components/Header.astro

echo ""
echo "=== Quick fixes complete! ==="
echo "Run 'npm run build' to test, then deploy."
