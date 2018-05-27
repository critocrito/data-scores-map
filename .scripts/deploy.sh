#!/usr/bin/env sh
set -e

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "$DEPLOY_BRANCH" ]; then
  scp -i data-scores -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp dist/* "$DEPLOY_SSH_USER"@"$DEPLOY_SSH_HOST":"$DEPLOY_SSH_PATH"
fi
