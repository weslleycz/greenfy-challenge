import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  message: any;
  error: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as any).message || 'Internal server error' };

    if (typeof message === 'object' && message !== null) {
      const httpExceptionResponse = message as HttpExceptionResponse;
      if (httpExceptionResponse.message) {
        if (Array.isArray(httpExceptionResponse.message)) {
          message = httpExceptionResponse.message;
        } else {
          message = [httpExceptionResponse.message];
        }
      } else {
        message = [(exception as any).message || 'Internal server error'];
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
