ARG NODE_VERSION
FROM ${NODE_VERSION}

ADD /backend /backend

WORKDIR /backend

#UBUNTU
#RUN npm set registry http://172.17.01:4873
#WINDOWS
#RUN npm set registry http://host.docker.internal:4873


RUN npm install
RUN npm install nodemon -g


EXPOSE 8080
