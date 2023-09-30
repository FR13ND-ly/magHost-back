FROM node:18 AS build

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ] 