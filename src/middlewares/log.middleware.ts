import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../common/services';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log(`Request ${req.method} ${req.originalUrl}`);
    next();
  }
}
