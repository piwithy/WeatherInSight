#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1
bash -c "./Setup_environement.sh"
source "venv/bin/activate"
python manage.py collectstatic --no-input --clear
python manage.py check --deploy
gunicorn --access-logfile - --workers 3 --bind "unix:$WORKING_DIR/gunicorn.sock" WeatherInSight.wsgi:application
