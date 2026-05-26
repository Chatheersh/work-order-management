#!/usr/bin/env bash
# start-backend.sh — starts the Spring Boot backend on port 8080

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"

echo "======================================"
echo "  Starting Work Order Backend"
echo "  URL:  http://localhost:8080"
echo "  H2 Console: http://localhost:8080/h2-console"
echo "======================================"

cd "$BACKEND_DIR"
mvn spring-boot:run
