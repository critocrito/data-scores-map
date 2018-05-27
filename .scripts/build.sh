#!/usr/bin/env sh
set -e

echo "Building site"
npm run lint
npm run compile
