import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new Logger('Catch');
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const result = {
      message: exception?.message || exception,
      time: Date.now(),
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      path: request.path,
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      result.code = exception.getStatus() || exceptionResponse['statusCode'];
      const message =
        exception?.message || exceptionResponse['error'] || exception;
      if (
        exceptionResponse['message'] &&
        Array.isArray(exceptionResponse['message'])
      ) {
        result.message = `${message}: ${exceptionResponse['message'].join(
          ',',
        )}.`;
      } else {
        result.message = message;
      }
    }

    logger.error(JSON.stringify(result));
    response.status(result.code).json(result);
  }
}
