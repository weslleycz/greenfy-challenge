import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from '../../common/services';
import { LocalStrategy } from './local.auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, BcryptService, LocalStrategy],
  imports: [UserModule],
})
export class AuthModule {}
