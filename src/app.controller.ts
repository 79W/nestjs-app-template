import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from './database/post/post.service';
import { QueueService } from './queue/queue.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtAuthService } from './auth/jwt.service';
import { CacheService } from './cache/cache.service';
import { configuration } from './config';

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

  @UseGuards(JwtAuthGuard)
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
  async login() {
    const payload = { username: 'user.username', sub: 'user.userId' };
    const jwtInfo = await this.jwtService.generateToken(payload);
    const config = await configuration();
    let data = {};
    if (jwtInfo) {
      this.cacheService.set(
        `token:${jwtInfo.token}`,
        jwtInfo,
        config.jwt.expiresIn,
      );
      data = {
        user_info: jwtInfo.payload,
        token: jwtInfo.token,
        ...jwtInfo,
      };
    }
    return {
      data,
    };
  }
}
