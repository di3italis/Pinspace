FROM python:3.9.18-alpine3.18

# RUN apk add build-base
#
# RUN apk add postgresql-dev gcc python3-dev musl-dev

# Install build dependencies
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV REACT_APP_BASE_URL=https://pinspace-2.onrender.com
ENV DATABASE_URL=postgresql://app_academy_projects_wb0r_user:UOFxwda0JXpTKEPdScJ2pcdc26nMIGo4@dpg-cpt4pujv2p9s73b1e5ig-a/app_academy_projects_wb0r
ENV SCHEMA=pin_space1
ENV SECRET_KEY=d659d580d4a490642f93b85fcddbd771

# WORKDIR /var/www
WORKDIR /app


COPY requirements.txt .

RUN pip install -r requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg2

COPY . .

EXPOSE 8000

# RUN flask db init
# RUN flask db migrate
RUN flask db upgrade
RUN flask seed all

# Run the application with Gunicorn
# CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:80"]
CMD gunicorn app:app
# CMD flask run
