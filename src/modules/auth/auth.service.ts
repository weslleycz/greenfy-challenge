import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BcryptService } from '../../common/services';
import { gerarToken } from '../../common/utils/gerarToken';
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
      return await gerarToken(user);
    } else {
      throw new HttpException(
        'Senha incorreta. Tente novamente.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
