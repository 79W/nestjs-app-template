import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}

  async set(
    key: string,
    value: string | number | object | Array<any>,
    ttl?: number,
  ) {
    const cacheValue =
      typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : value;
    return this.cacheManager.set(key, cacheValue, { ttl });
  }
  async get(key: string) {
    return this.cacheManager.get<string>(key);
  }
  async del(key: string) {
    return this.cacheManager.del(key);
  }
}
