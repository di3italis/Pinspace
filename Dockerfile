FROM python:3.9.18-alpine3.18

RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set the working directory to the root
WORKDIR /

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile Pipfile.lock ./

# Install dependencies
RUN pipenv install --deploy --ignore-pipfile

# Copy the rest of the application files
COPY . .

# Ensure the entrypoint script is executable
RUN chmod +x /entrypoint.sh

# Use pipenv to run the application
CMD ["/entrypoint.sh"]
