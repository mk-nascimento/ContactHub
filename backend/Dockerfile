FROM node:18-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install -g pnpm@8.10.0 @nestjs/cli && pnpm install

COPY . /app/

RUN pnpm prisma:prod && pnpm build

EXPOSE ${APP_PORT:-3000}

CMD pnpm start:prod