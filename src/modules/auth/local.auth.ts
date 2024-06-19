import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import {
  LoginRequestDTO,
  NotFoundErrorResponseDTO,
  SuccessResponseDto,
} from './dto';
import { WrongPasswordErrorResponseDTO } from './dto/wrong-password-error-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(
    data: LoginRequestDTO,
  ): Promise<
    | SuccessResponseDto
    | NotFoundErrorResponseDTO
    | WrongPasswordErrorResponseDTO
  > {
    return await this.authService.login(data);
  }
}
