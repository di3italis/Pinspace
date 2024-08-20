#!/bin/sh

# Activate the virtual environment
source $(pipenv --venv)/bin/activate

# Run database migrations and seed data
pipenv run flask db upgrade
pipenv run flask seed all

# Run the application
exec pipenv run gunicorn app:app
