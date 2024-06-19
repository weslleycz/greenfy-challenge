import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthMiddleware } from '../../middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TaskController],
  providers: [TaskService, JwtService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/task', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/task/*', method: RequestMethod.ALL });
  }
}
