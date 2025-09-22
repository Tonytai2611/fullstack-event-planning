FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild esbuild

COPY . .

ENV VITE_API_URL=http://api:8800

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]