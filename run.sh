#!/usr/bin/env bash
set -e

# ==============================================================================
# ANIMUS FRONTEND RUNNER & DEPLOYMENT SCRIPT
# ==============================================================================

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

PORT=${PORT:-3000}
VITE_API_URL=${VITE_API_URL:-}

echo -e "${CYAN}${BOLD}[*] Starting Animus Frontend on port ${PORT}...${NC}"
if [ -n "$VITE_API_URL" ]; then
    echo -e "${CYAN}▶ Targeting Backend API:${NC} ${VITE_API_URL}"
else
    echo -e "${CYAN}▶ Targeting Backend API:${NC} (Relative path / local reverse proxy)"
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}[!] Error: Docker is not installed or not in PATH.${NC}"
    exit 1
fi

if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo -e "${RED}[!] Error: Docker Compose is not installed.${NC}"
    exit 1
fi

PORT=$PORT VITE_API_URL=$VITE_API_URL $COMPOSE_CMD down --remove-orphans 2>/dev/null || true
PORT=$PORT VITE_API_URL=$VITE_API_URL $COMPOSE_CMD up -d --build

echo -e "\n${GREEN}${BOLD}[✓] Frontend running successfully!${NC}"
echo -e "${CYAN}▶ Live App:${NC} http://localhost:${PORT}\n"
