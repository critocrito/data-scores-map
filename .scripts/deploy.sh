#!/usr/bin/env sh
set -e # halt script on error

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "$DEPLOY_BRANCH" ]; then
  scp -i data-scores -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp dist "$SSH_USER"@"$SSH_HOST":"$SSH_PATH"
fi
