#!/usr/bin/env sh
set -e

echo "Building site"
node_modules/.bin/flow-typed install
npm run build
