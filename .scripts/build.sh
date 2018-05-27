#!/usr/bin/env sh
set -e

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "$DEPLOY_BRANCH" ]; then
  echo "Building site"
  npm run lint
  npm run compile
fi
