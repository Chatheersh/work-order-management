#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"

echo "Starting Work Order backend (Spring Boot on port 8080)..."
cd "$BACKEND_DIR"
mvn spring-boot:run
