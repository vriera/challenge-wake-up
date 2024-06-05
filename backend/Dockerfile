FROM node:18-alpine as backend

RUN mkdir app
WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD ["npx" , "nest" , "start"]


