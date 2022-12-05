FROM node

WORKDIR /project

COPY . .

RUN npm install

RUN npm run build:dev

EXPOSE 3000

CMD ["node", "server.js"]
