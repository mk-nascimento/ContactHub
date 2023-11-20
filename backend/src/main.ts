import 'dotenv/config';

import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = +process.env.APP_PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.SERVER_PREFIX, { exclude: ['health'] });
  app.enableCors({ origin: [process.env.CLIENT_URL, `${process.env.CLIENT_URL}/`], optionsSuccessStatus: HttpStatus.OK });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }), new ValidationPipe({ transform: true, transformOptions: { groups: ['transform'] } }));

  const title = 'ContactHub';
  const description =
    'Web app for client and contact management with CRUD operations. The internal API supports user authentication, and users can export their profile data.';
  const VERSION = '1.0';
  const config = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(VERSION).addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup(process.env.DOCS_PREFIX, app, document);

  await app.listen(PORT);
}
bootstrap();
