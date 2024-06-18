import { Module } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, BcryptService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
