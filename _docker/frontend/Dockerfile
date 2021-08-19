ARG NODE_VERSION
FROM ${NODE_VERSION}

ADD /frontend /frontend
ADD ./.env ./.env

WORKDIR /frontend

#UBUNTU
RUN npm set registry http://172.17.01:4873
#WINDOWS
#RUN npm set registry http://host.docker.internal:4873
RUN npm install --legacy-peer-deps



EXPOSE 3000
