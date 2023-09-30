import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('这里是handleRequest：', err, user, info);
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return true; // 没有传递 Token，继续执行下一步
    }
    if (!user) {
      throw new UnauthorizedException('token失效,请重新登陆后重试。');
    }
    return user;
  }
}
