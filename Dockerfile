FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

# Install build dependencies
# RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www
# WORKDIR /app


COPY requirements.txt .

# RUN pip install -r requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db upgrade
RUN flask seed all

# Run the application with Gunicorn
# CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:80"]
CMD gunicorn app:app
# CMD flask run
