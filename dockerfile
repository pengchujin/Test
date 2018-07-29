FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ /usr/src/app/
RUN ls -la /usr/src/app/

EXPOSE 3000

CMD ["node", "./src/server.js"]
