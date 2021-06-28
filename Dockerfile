FROM node:10-alpine
MAINTAINER priotix

RUN apk add --update bash && rm -rf /var/cache/apk/*

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod a+x /usr/local/bin/docker-entrypoint.sh

RUN apk add --no-cache python build-base

RUN apk add rsync

COPY package.json package-lock.json /tmp/app/

RUN cd /tmp/app && npm install

RUN mkdir -p /var/www/app && cp -a /tmp/app/node_modules /var/www/app

WORKDIR /var/www/app
ADD . /var/www/app

RUN cd /var/www/app && npm run build

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
