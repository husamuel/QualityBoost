FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY babel.config.js ./
COPY server.js ./

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
