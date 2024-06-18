import { Module } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { UserController } from './UserController';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, BcryptService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
