FROM node:20.12-buster-slim AS builder

WORKDIR     /app
RUN     corepack enable

COPY    ./.yarn /app/.yarn
COPY    ./.yarn/cache /app/.yarn/cache
COPY    ./.yarnrc.yml /app/.yarnrc.yml
COPY    ./yarn.lock /app/yarn.lock
COPY    ./package.json /app/package.json
COPY    ./.pnp.cjs /app/.pnp.cjs
COPY    ./.pnp.loader.mjs /app/.pnp.loader.mjs

RUN     yarn install --immutable
COPY    . /app
RUN     yarn build

CMD     ["tail", "-f", "/dev/null"]


