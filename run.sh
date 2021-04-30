#!/bin/sh

# This assumes you've created a virtual environment and installed Gunicorn
# See the docs for instructions

source venv/bin/activate

# Flask
gunicorn app:app -b $HOST:$PORT -w 1 2> error.txt 1> output.txt
# Django (replace <name> with the name of your application)
# gunicorn <name>.wsgi -b $HOST:$PORT -w 1