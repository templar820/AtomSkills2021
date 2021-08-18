ARG NODE_VERSION
ARG DOCKER_HOST
FROM ${NODE_VERSION}

ADD /frontend /frontend
ADD ./.env ./.env

WORKDIR /frontend

#ARG repo=http://${DOCKER_HOST}:4873
#
#RUN npm set registry repo
RUN npm install --legacy-peer-deps



EXPOSE 3000
