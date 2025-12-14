#!/bin/bash
echo "Checking Kalshi Soccer project setup..."
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Project directory contents:"
ls -la
echo "Package.json dependencies:"
cat package.json | grep -A 10 dependencies
echo "Installing dependencies..."
npm install
echo "Installation complete. Running type check..."
npx tsc --noEmit
echo "Build test..."
npm run build