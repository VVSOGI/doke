FROM node:20.12-buster-slim

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
