ARG NODE_VERSION
ARG DOCKER_HOST
FROM ${NODE_VERSION}

ADD /db_transactions /db_transactions

WORKDIR /db_transactions


RUN npm set registry http://${DOCKER_HOST}:4873
RUN npm install
