FROM node:18-alpine
# Install Python and essential build tools
RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN mkdir -p /app

WORKDIR /app

COPY package*.json yarn.lock ./

# Install dependencies in /app
RUN yarn install --network-timeout 1000000

COPY . .

RUN yarn build

EXPOSE 3000

# Run yarn start, as we would via the command line 
CMD ["yarn", "start"]
