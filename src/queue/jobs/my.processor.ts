import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('my_queue')
export class MyProcessor {
  @Process('my_job')
  handleMyJob(job: Job) {
    // 处理任务
    console.log('执行了', job);
  }
}
