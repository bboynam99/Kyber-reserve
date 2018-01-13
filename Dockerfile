FROM node:8.9.4

ARG HTTP_ENDPOINT
# The base node image sets a very verbose log level.
# ENV NPM_CONFIG_LOGLEVEL warn

# copy all file into this image
WORKDIR /usr/src/app


COPY package*.json ./

# Install npm package
RUN npm install

# Bundle app source
COPY . .

# Build for production
RUN npm run build

# install http-server to serve server
RUN npm install -g http-server

# set command start server
CMD http-server ./public

EXPOSE 8080