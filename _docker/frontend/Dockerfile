ARG NODE_VERSION
ARG DOCKER_HOST
FROM ${NODE_VERSION}

ADD /frontend /frontend
ADD ./.env ./.env

WORKDIR /frontend

RUN npm set registry http://${DOCKER_HOST}:4873
RUN npm install



EXPOSE 3000
