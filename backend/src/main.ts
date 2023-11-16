import 'dotenv/config';

import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = +process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: [process.env.CLIENT_URL, `${process.env.CLIENT_URL}/`], optionsSuccessStatus: HttpStatus.OK });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }), new ValidationPipe({ transform: true, transformOptions: { groups: ['transform'] } }));

  await app.listen(PORT);
}
bootstrap();
