import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from './database/post/post.service';
import { QueueService } from './queue/queue.service';
import { JwtAuthService } from './auth/jwt.service';
import { CacheService } from './cache/cache.service';
import { configuration } from './config';
import { Roles } from './auth/roles.decorator';
import { Role } from './common/constants';

@Controller({
  path: '/',
  version: '1',
})
export class AppController {
  constructor(
    private readonly postService: PostService,
    private readonly queueService: QueueService,
    private readonly jwtService: JwtAuthService,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  async getHello2() {
    const result = await this.postService.getListPage();
    return {
      data: result,
    };
  }

  @Post()
  async getHello() {
    console.log('这里是？');
    // const rew = await this.cacheManager.get('ceshi');
    // console.log(rew);

    // this.queueService.addJob();

    const result = await this.postService.getListPage();
    return {
      data: result,
    };
  }

  @Get('/login')
  @Roles(Role.Banned, Role.User, Role.Admin)
  async login() {
    const payload = { id: Date.now(), role: 'user' };
    const jwtInfo = await this.jwtService.generateToken(payload);
    const config = await configuration();
    let data = {};
    if (jwtInfo) {
      this.cacheService.set(
        `token:${jwtInfo.token}`,
        { ...jwtInfo, ...payload },
        config.jwt.expiresIn,
      );
      data = {
        ...payload,
        token: jwtInfo.token,
      };
    }
    return {
      data,
    };
  }
}
