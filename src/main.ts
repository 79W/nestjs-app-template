import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpLoggerMiddleware } from './common/middleware';
import { ErrorFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new ErrorFilter());
  app.use(new HttpLoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
