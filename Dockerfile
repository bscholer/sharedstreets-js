FROM node:16.17.0

WORKDIR /app

RUN npm install osrm

COPY package.json ./
COPY package-lock.json ./

RUN npm install
