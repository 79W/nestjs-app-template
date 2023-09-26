import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { ErrorFilter } from './common/error-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  app.use(new HttpLoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
