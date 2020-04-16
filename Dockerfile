FROM node:12
FROM mariadb:latest

WORKDIR /app

COPY package.json ./
COPY /src ./

RUN yarn install

COPY . .

EXPOSE 5000
CMD [ "yarn", "run", "start" ]