import { Global, Module } from '@nestjs/common';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { configuration } from '../config';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          store: redisStore,
          provide: CACHE_MANAGER,
          ...config.redisConfig,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class CacheRedisModule {}
