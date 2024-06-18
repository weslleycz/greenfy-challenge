import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { UserModule } from './modules/user';
import { LoggerService } from './services';
import { LogMiddleware } from './middlewares';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
