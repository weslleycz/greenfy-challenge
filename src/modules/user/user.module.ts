import { Module } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, BcryptService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
