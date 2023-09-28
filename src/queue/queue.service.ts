import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('my_queue') private myQueue: Queue) {}

  async addJob() {
    await this.myQueue.add('my_job', {
      /* 任务数据 */
    });
  }
}
