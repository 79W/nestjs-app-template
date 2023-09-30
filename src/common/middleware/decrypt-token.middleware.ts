import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class DecryptTokenMiddleware implements NestMiddleware {
  constructor(private cacheService: CacheService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const authorization = authHeader.split(' ');
        const tokenJsonInfo = await this.cacheService.get(
          `token:${authorization[1]}`,
        );
        const info = JSON.parse(tokenJsonInfo);
        req.headers.decrypted_authorization = info.jwt.trim();
      } catch (error) {
        throw new HttpException(
          'Unable to parse authorization token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    next();
  }
}
