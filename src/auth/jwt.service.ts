import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken<T extends string | object | Buffer>(
    payload: T,
  ): Promise<{
    payload: T;
    jwt: string;
    token: string;
  }> {
    try {
      const jwt = await this.jwtService.sign(payload);
      const t = jwt.split('.')[2];
      const info = {
        payload,
        jwt,
        token: t,
      };
      return info;
    } catch (error) {
      throw new HttpException(
        'Failed to generate token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
