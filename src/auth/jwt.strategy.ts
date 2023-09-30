import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';
import { configuration } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cacheService: CacheService) {
    super({
      // ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req) => {
        const decryptedAuthorization =
          req.headers.decrypted_authorization || null;
        return decryptedAuthorization;
      },
      ignoreExpiration: false,
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        const config = await configuration();
        done(null, config.jwt.secret);
      },
      //   secretOrKey: 'jwt.secret',
    });
  }

  async jwtFromRequest(req: Request) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const tokenJsonInfo = await this.cacheService.get(`token:${token}`);
        const info = JSON.parse(tokenJsonInfo);
        return info.jwt.trim();
      }
      return null;
    } catch (error) {
      throw new HttpException(
        'Unable to parse token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validate(payload: any) {
    console.log('这里是validate：', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
