FROM node:18-alpine

RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN mkdir -p /app

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]