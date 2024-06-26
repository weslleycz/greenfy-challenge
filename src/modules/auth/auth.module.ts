import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../common';
import { UserModule, UserRepository } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-auth';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    BcryptService,
    LocalStrategy,
    UserRepository,
  ],
  imports: [UserModule],
})
export class AuthModule {}
