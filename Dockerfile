FROM node:18-alpine

RUN apk add tar vim bash openjdk8-jre graphviz git

RUN curl --silent --location https://rpm.nodesource.com/setup_18.x | sh -
RUN apk add nodejs


WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --verbose

COPY . /home/node/app

CMD "npm" "run" "start:dev"
