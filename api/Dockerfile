FROM node:19-alpine

COPY package.json /app/package.json

WORKDIR /app

RUN npm install

COPY . .



EXPOSE 8800

CMD ["node", "app.js"]

