import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import {
  BcryptService,
  IRefreshTokenPayload,
  generateToken,
} from '../../common';
import { UserService } from '../user';
import {
  LoginRequestDTO,
  RefreshTokenRequestDTO,
  SuccessResponseDto,
} from './dto';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDTO): Promise<SuccessResponseDto> {
    const user = await this.usersService.getByEmail(data.email);
    if (!user || Object.keys(user).length === 0) {
      throw new HttpException(
        'E-mail não cadastrado. Verifique e tente novamente',
        HttpStatus.NOT_FOUND,
      );
    }
    if (
      await this.bcryptService.comparePasswords(data.password, user.password)
    ) {
      return await generateToken(user);
    } else {
      throw new HttpException(
        'Senha incorreta. Tente novamente.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async refresh(data: RefreshTokenRequestDTO) {
    return await this.reauthenticate(data.refresh_token);
  }

  private async reauthenticate(refresh_token: string) {
    try {
      const playload = <IRefreshTokenPayload>this.jwtService.verify(
        refresh_token,
        {
          secret: process.env.SECURITY_JWT_REFRESH,
        },
      );
      const user = await this.usersService.getByEmail(playload.email);
      return await generateToken(user);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Assinatura Inválida', HttpStatus.UNAUTHORIZED);
      }
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token Expirado', HttpStatus.FORBIDDEN);
      }
    }
  }
}
