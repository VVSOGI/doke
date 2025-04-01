FROM node:20-alpine AS builder

WORKDIR     /app
RUN     corepack enable

COPY    ./.yarn /app/.yarn
COPY    ./.yarnrc.yml /app/.yarnrc.yml
COPY    ./yarn.lock /app/yarn.lock
COPY    ./package.json /app/package.json

RUN     yarn install --immutable
COPY    . .
RUN     yarn build


FROM node:20-alpine AS runner

WORKDIR     /app
COPY    --from=builder /app/next.config.ts ./
COPY    --from=builder /app/.next/standalone ./
COPY    --from=builder /app/.next/standalone/.next ./.next
COPY    --from=builder /app/.next/static ./.next/static

EXPOSE    3001 
ENV     PORT=3001
CMD     ["node", "server.js"]
