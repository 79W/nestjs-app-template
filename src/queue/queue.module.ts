import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { configuration } from '../config';
import { QueueService } from './queue.service';
import jobs from './jobs';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          redis: {
            ...config.redisConfig,
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'my_queue',
    }),
  ],
  providers: [QueueService, ...jobs],
  exports: [QueueService],
})
export class QueueModule {}
