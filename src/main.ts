import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  HttpLoggerMiddleware,
  TransformResponseMiddleware,
} from './common/middleware';
import { ErrorFilter } from './common/filters';
import { configuration } from './config';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CacheService } from './cache/cache.service';

async function bootstrap() {
  const config = await configuration();
  const app = await NestFactory.create(AppModule);
  // 压缩
  app.use(compression());
  // api版本
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 全局错误捕捉
  app.useGlobalFilters(new ErrorFilter());
  // 请求日志
  app.use(new HttpLoggerMiddleware().use);
  // 通道？
  app.useGlobalPipes(new ValidationPipe());
  // 响应格式统一转换
  app.useGlobalInterceptors(new TransformResponseMiddleware());

  // jwt token 校验
  const cacheService = app.get<CacheService>(CacheService);
  app.useGlobalGuards(new JwtAuthGuard(cacheService));
  // token 用户信息存储转换

  // 角色检验
  const reflector = new Reflector();
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(config.port);
}
bootstrap();
