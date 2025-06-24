FROM docker.io/node:24-alpine

RUN apk add git

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
USER node

# ENV NODE_ENV=production

RUN npm ci
COPY --chown=node:node . .

EXPOSE 11280

CMD [ "npm", "start" ]

LABEL org.opencontainers.image.url="https://github.com/tektrans/ejabberd-admin-wrapper"
LABEL org.opencontainers.image.source="https://github.com/tektrans/ejabberd-admin-wrapper"
LABEL org.opencontainers.image.documentation="https://github.com/tektrans/ejabberd-admin-wrapper"
