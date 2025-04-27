import { CallHandler, ExecutionContext, Injectable, NestInterceptor, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        return{
          response: true,
          statusCode: response.statusCode,
          data: data,
          message: data?.message || 'Request processed successfully'
        }
      }),
    );
  }
}
