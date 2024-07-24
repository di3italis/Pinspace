FROM python:3.9.18-alpine3.18

RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# ENV FLASK_APP=$FLASK_APP
# ENV FLASK_ENV=$FLASK_ENV
# ENV DATABASE_URL=$DATABASE_URL
# ENV SCHEMA=$SCHEMA
# ENV SECRET_KEY=$SECRET_KEY

WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile* ./

# Install dependencies
RUN pipenv install 
# --deploy --ignore-pipfile

COPY . .

RUN pipenv run flask db init || true
RUN pipenv run flask db migrate || true
RUN pipenv run flask db upgrade
RUN pipenv run flask seed all

# Use pipenv to run the application
CMD pipenv run gunicorn app:app
