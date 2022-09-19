#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1

docker-compose -f "docker-compose.prod.yml" down




