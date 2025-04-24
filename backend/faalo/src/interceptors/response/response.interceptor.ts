import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {
        return{
          response: true,
          data: data,
          message: data?.message || 'ok'
        }
      }),
      catchError((err) => {
        return throwError((err) => {});
      })
    );
  }
}
