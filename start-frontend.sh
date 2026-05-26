#!/usr/bin/env bash
# start-frontend.sh — starts the Angular dev server on port 4200

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "======================================"
echo "  Starting Work Order Frontend"
echo "  URL: http://localhost:4200"
echo "======================================"

cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

ng serve --open
