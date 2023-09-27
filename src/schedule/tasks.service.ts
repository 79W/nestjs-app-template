import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('该方法将在45秒标记处每分钟运行一次');
  // }

  // @Interval(1000)
  // handleInterval() {
  //   this.logger.debug('2');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('3');
  // }

  // @Interval(10000)
  // sendEmail() {
  //   this.logger.debug('4');
  // }
}
