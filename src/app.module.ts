import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerService } from './common/services';
import { DatabaseModule } from './database';
import { LogMiddleware } from './middlewares';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
