import { Controller, Get } from '@nestjs/common';
import { PostService } from './database/post/post.service';

@Controller({
  path: '/',
  version: '1',
})
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getHello() {
    const result = await this.postService.getListPage();
    return result;
  }
}
