import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { ErrorFilter } from './common/error-filter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new ErrorFilter());
  app.use(new HttpLoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
