import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostService } from './database/post/post.service';
import { TasksModule } from './schedule/tasks.module';
import { DBModule } from './database/db.module';
import { CacheRedisModule } from './cache/cache.module';

@Module({
  imports: [TasksModule, DBModule, CacheRedisModule],
  controllers: [AppController],
  providers: [PostService],
})
export class AppModule {}
