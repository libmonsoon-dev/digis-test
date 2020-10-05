FROM node:14.11.0-alpine3.11

WORKDIR digis-test

COPY package.json yarn.lock ./

RUN yarn

COPY tsconfig.json tsconfig.build.json ormconfig.ts src ./

CMD ["yarn", "run", "start:dev"]
