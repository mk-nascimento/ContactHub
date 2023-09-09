FROM node:lts-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install -g pnpm@8.7.4 @nestjs/cli && pnpm install

COPY . /app/

RUN pnpm prisma:prod && pnpm build

EXPOSE ${APP_PORT:-3000}

CMD pnpm start:prod