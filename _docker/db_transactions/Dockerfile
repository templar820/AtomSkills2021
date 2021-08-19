ARG NODE_VERSION
ARG DOCKER_HOST
FROM ${NODE_VERSION}

ADD /db_transactions /db_transactions

WORKDIR /db_transactions

ARG repo=http://${DOCKER_HOST}:4873

RUN npm set registry $repo
RUN npm install
