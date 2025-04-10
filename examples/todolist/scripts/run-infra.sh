#!/bin/bash
set -e
cd "$(dirname "$0")"
source ../.env.local

cat ../.env.local > ../.env

docker rm -f postgres backend | true

docker network create $DOCKER_NETWORK | true

docker run \
  --name $DB_CONTAINER_NAME \
  --network $DOCKER_NETWORK \
  --memory=2g \
  --memory-swap=3g \
  -p $DB_PORT:$DB_PORT \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_USER=$DB_USERNAME \
  -e POSTGRES_DB=$DB_DATABASE \
  -v $DB_VOLUME_NAME/data:/var/lib/postgresql/data \
  -d postgres:16.6-alpine

echo "Waiting for PostgreSQL server [$DB_CONTAINER_NAME] to start."
while ! docker exec $DB_CONTAINER_NAME pg_isready -U $DB_USERNAME -d $DB_DATABASE -h localhost >/dev/null 2>&1; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - executing command"
docker exec -i $DB_CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c '\dt'
