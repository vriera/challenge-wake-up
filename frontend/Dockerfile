FROM node:18-alpine as froentend

RUN mkdir app
WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .


CMD ["yarn" , "run" , "build"]


