#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "Starting Work Order frontend (Angular on port 4200)..."
cd "$FRONTEND_DIR"
npm start
