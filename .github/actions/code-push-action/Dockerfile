FROM node:16-slim

RUN npm install -g appcenter-cli

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]