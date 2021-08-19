ARG NODE_VERSION
ARG DOCKER_HOST
FROM ${NODE_VERSION}

ADD /backend /backend

WORKDIR /backend

ARG repo=http://${DOCKER_HOST}:4873

RUN npm set registry $repo
RUN npm install
RUN npm install nodemon -g


EXPOSE 8080
