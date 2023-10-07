import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly cacheService: CacheService) {
    super();
  }
  handleRequest(err, user, info, context) {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization: string = request.headers.authorization || '';
      const token: string = request.headers.token || '';
      const decryptedAuthorization: string =
        request.headers.decrypted_authorization || '';

      if (!user && authorization && token && decryptedAuthorization) {
        this.cacheService.del(`token:${token}`);
        throw new HttpException(
          'token失效,请重新登陆后重试。',
          HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
        );
      }

      if (!authorization) {
        return true; // 没有传递 Token，继续执行下一步
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'token异常,请重新登陆后重试。',
        HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
      );
    }
  }
}
