import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const l = new Logger('sdfsaf');
    l.log('ces');

    return 'Hello World!';
  }
}
