#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting both services..."
echo "  Backend  -> http://localhost:8080"
echo "  Frontend -> http://localhost:4200"
echo ""
echo "Press Ctrl+C to stop all services."
echo ""

# Run both in parallel; kill both when this script exits
trap "kill 0" EXIT

bash "$SCRIPT_DIR/start-backend.sh" &
bash "$SCRIPT_DIR/start-frontend.sh" &

wait
