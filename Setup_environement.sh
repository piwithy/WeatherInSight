#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1
if [ ! -d "venv" ]; then
  echo "Setting up Virtual Environment"
  virtualenv venv --python=python3
  source "venv/bin/activate"
  deactivate
fi
source "venv/bin/activate"
pip install -r "pip_req"
python manage.py makemigrations
python manage.py migrate
python manage.py sqlmigrate pages 0001
python manage.py sqlmigrate data_request 0001
deactivate