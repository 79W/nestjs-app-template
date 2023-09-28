import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PostService } from './database/post/post.service';
import { QueueService } from './queue/queue.service';

@Controller({
  path: '/',
  version: '1',
})
export class AppController {
  constructor(
    private readonly postService: PostService,
    private readonly queueService: QueueService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getHello() {
    const rew = await this.cacheManager.get('ceshi');
    console.log(rew);

    this.queueService.addJob();

    const result = await this.postService.getListPage();
    return {
      data: result,
    };
  }
}
