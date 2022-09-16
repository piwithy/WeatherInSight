#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1

docker-compose -f "docker-compose.prod.yml" up -d --build
docker-compose -f "docker-compose.prod.yml" exec web python manage.py  makemigration --noinput
docker-compose -f "docker-compose.prod.yml" exec web python manage.py  migrate --noinput
docker-compose -f "docker-compose.prod.yml" exec web python manage.py  collectstatic --noinput --clear




