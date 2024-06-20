import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginRequestDTO, SuccessResponseDto } from './dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(data: LoginRequestDTO): Promise<SuccessResponseDto> {
    return await this.authService.login(data);
  }
}
