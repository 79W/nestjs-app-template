import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config';
import { PostService } from './database/post/post.service';
import entitys from './database/entitys';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          type: 'mysql',
          entities: [...entitys],
          ...config.mysqlConfig,
        };
      },
    }),
    TypeOrmModule.forFeature([...entitys]),
    CacheModule.registerAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          store: redisStore,
          ...config.redisConfig,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [PostService],
})
export class AppModule {}
