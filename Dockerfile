FROM docker.io/node:24-alpine

RUN apk update
RUN apk upgrade
RUN apk add git

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
USER node

ENV NODE_ENV=production

RUN npm ci
COPY --chown=node:node . .

ARG APP_VERSION

#RUN git describe > /tmp/version.txt
#RUN APP_VERSION=$(cat /tmp/version.txt) && \
#  rm /tmp/version.txt && \
#  echo "APP_VERSION=${APP_VERSION}" > /tmp/app_version_env

EXPOSE 11280

ENV RUN_AS_CONTAINER=YES

CMD [ "npm", "start" ]

LABEL \
  org.opencontainers.image.title="ejabberd-admin-wrapper" \
  org.opencontainers.image.description="Wrapper for ejabberd admin API" \
  org.opencontainers.image.url="https://github.com/tektrans/ejabberd-admin-wrapper" \
  org.opencontainers.image.source="https://github.com/tektrans/ejabberd-admin-wrapper" \
  org.opencontainers.image.authors="adhisimon@tektrans.id" \
  org.opencontainers.image.vendor="TEKTRANS" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.version="${APP_VERSION}" 
