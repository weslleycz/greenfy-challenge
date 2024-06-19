import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { BcryptService } from '../../common/services';
import { User } from '../../entities';
import { UserService } from '../user';
import {
  NotFoundErrorResponseDTO,
  SuccessResponseDto,
  WrongPasswordErrorResponseDTO,
} from './dto';
import { LoginRequestDTO } from './dto/login.dto';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(
    data: LoginRequestDTO,
  ): Promise<
    | SuccessResponseDto
    | NotFoundErrorResponseDTO
    | WrongPasswordErrorResponseDTO
  > {
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
      return await this.gerarToken(user);
    } else {
      throw new HttpException(
        'Senha incorreta. Tente novamente.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async gerarToken(
    user: User,
  ): Promise<
    | SuccessResponseDto
    | NotFoundErrorResponseDTO
    | WrongPasswordErrorResponseDTO
  > {
    const payload = {
      access_token: this.jwtService.sign(
        { id: user.id },
        {
          secret: process.env.Security_JWT,
          expiresIn: '2 days',
        },
      ),
    };
    return payload;
  }
}
