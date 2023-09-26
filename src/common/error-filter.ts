import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new Logger('Catch');
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus?.() || 500;

    const message = {
      message: exception?.message || exception,
      time: Date.now(),
      code: status,
      data: null,
      path: request.path,
    };

    logger.error(JSON.stringify(message));

    response.status(status).json(message);
  }
}
