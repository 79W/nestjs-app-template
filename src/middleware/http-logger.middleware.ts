import {
  Injectable,
  Logger as NestLogger,
  NestMiddleware,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new NestLogger('HTTP');
    // 打印请求日志
    if (logger) {
      logger.log(
        `${req.method} ${req.url} - ${res.statusCode} {IP, ${
          req.ip
        }} {Body, ${JSON.stringify(req.body)}} {Query, ${JSON.stringify(
          req.query,
        )}} {Params, ${JSON.stringify(req.params)}} {Headers, ${JSON.stringify(
          req.headers,
        )}}`,
      );
    }

    next();
  }
}
