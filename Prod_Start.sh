#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1
if [ ! -d "venv" ]; then
  echo "Setting up Virtual Environment"
  virtualenv venv --python=python3
  source "venv/bin/activate"
  pip install -r "pip_req"
  deactivate
fi
source "venv/bin/activate"
export DJANGO_DEBUG="False"
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input --clear
python manage.py check --deploy
gunicorn --access-logfile - --workers 3 --bind unix:/etc/django/gunicorn.sock WeatherInSight.wsgi:application
