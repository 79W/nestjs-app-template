import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getListPage() {
    const postBuider = this.postRepository
      .createQueryBuilder('post')
      .getManyAndCount();
    const [list, total] = await postBuider;
    return { list, total };
  }
}
