#!/bin/bash
set -e
cd "$(dirname "$0")"

cat ../.env.local > ../.env
yarn nest start --watch
