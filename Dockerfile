FROM node:12

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y curl bash \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs

RUN npm i -g yarn --force

COPY . /app

WORKDIR /app

RUN ls /app

RUN yarn

RUN yarn build

