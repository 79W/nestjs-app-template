import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostService } from './database/post/post.service';
import { TasksModule } from './schedule/tasks.module';
import { DBModule } from './database/db.module';
import { CacheRedisModule } from './cache/cache.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';
import { DecryptTokenMiddleware } from './common/middleware';

@Module({
  imports: [TasksModule, DBModule, CacheRedisModule, QueueModule, AuthModule],
  controllers: [AppController],
  providers: [PostService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 如果需要使用 其他模块（如缓存）就需要在这里引入
    consumer.apply(DecryptTokenMiddleware).forRoutes('*');
  }
}
