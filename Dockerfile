FROM node:16.17

RUN apt-get update
RUN apt-get install -y dos2unix

RUN which node

WORKDIR /app

RUN npm install osrm

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

RUN find bin/ -type f -print0 | xargs -0 dos2unix
