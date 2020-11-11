FROM node:10-alpine

RUN mkdir -p /usr/src/node_modules && chown -R node:node /usr/src

WORKDIR /usr/src

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]