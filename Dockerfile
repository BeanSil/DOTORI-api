FROM node:12
FROM mariadb:latest

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y curl bash \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs mariadb-server

RUN npm i -g yarn

COPY package.json ./
COPY /src ./

RUN yarn

COPY . .

EXPOSE 5000
CMD [ "yarn", "start" ]