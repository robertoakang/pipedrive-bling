FROM node:14-alpine

WORKDIR /usr/app
COPY package.json ./

COPY . .

RUN yarn

CMD [ "yarn", "dev"]