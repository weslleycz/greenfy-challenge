import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from '../../middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, BcryptService, UserRepository, JwtService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.PATCH });
  }
}
