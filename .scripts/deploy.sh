#!/usr/bin/env sh
set -e

NOW=$(date +%Y-%m-%d_%H:%M)

echo "Deploying at $NOW"
scp -i data-scores -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp dist/* "$DEPLOY_SSH_USER"@"$DEPLOY_SSH_HOST":"$DEPLOY_SSH_PATH"
