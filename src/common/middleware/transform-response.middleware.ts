import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

interface Result<T> {
  data?: T;
  message?: string;
  code?: number;
}

@Injectable()
export class TransformResponseMiddleware<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<Result<T>>) {
    return next.handle().pipe(
      map((result) => {
        return {
          data: result.data || null,
          code: result.code || 0,
          message: result.message || 'ok',
          time: Date.now(),
        };
      }),
    );
  }
}
