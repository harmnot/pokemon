# Extending image
FROM node:carbon

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install autoconf automake libtool nasm make pkg-config git apt-utils

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Versions
RUN npm -v
RUN node -v

COPY ./server/ /usr/src/app

RUN npm install

# Port to listener
EXPOSE 3000

# Environment variables
ENV PORT 4000
ENV DB_USERNAME green
ENV DB_PASSWORD yTOm8IvvAouNAiHf
ENV DB_NAME pokemon

# Main command
CMD [ "npm", "run", "dev" ]
