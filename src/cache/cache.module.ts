import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { configuration } from '../config';

@Module({
  imports: [
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
  exports: [CacheModule],
})
export class CacheRedisModule {}
