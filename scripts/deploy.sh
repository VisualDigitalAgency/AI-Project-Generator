#!/usr/bin/env bash
# scripts/deploy.sh — Manual deploy trigger
set -euo pipefail

ENV="${1:-staging}"
SHA="${2:-$(git rev-parse HEAD)}"

echo "→ Deploying SHA $SHA to $ENV..."

if [ "$ENV" = "production" ]; then
  echo -n "Type 'deploy' to confirm production deploy: "
  read -r CONFIRM
  if [ "$CONFIRM" != "deploy" ]; then
    echo "Aborted."
    exit 1
  fi
fi

# Trigger GitHub Actions workflow
gh workflow run "deploy-${ENV}.yml" \
  -f sha="$SHA" \
  -f confirm="deploy"

echo "✓ Deployment workflow triggered. Monitor at: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions"
