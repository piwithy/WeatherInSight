#!/bin/bash
WORKING_DIR="$(dirname "$0")"
cd "$WORKING_DIR" || exit 1
bash -c "./Setup_environement.sh"
source "venv/bin/activate"
if [ ! -d tests ]; then mkdir tests; fi
if [ ! -d tests/results ]; then mkdir tests/results; fi
python manage.py test
deactivate