import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = +process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }), new ValidationPipe({ transform: true, transformOptions: { groups: ['transform'] } }));

  await app.listen(PORT);
}
bootstrap();
