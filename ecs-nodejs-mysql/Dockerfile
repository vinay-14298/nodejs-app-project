FROM node:18

WORKDIR /usr/src/app

COPY app/package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app/app.js"]

