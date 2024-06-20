import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  InvalidSignatureErrorDto,
  LoginRequestDTO,
  NotFoundErrorResponseDTO,
  RefreshTokenRequestDTO,
  SuccessResponseDto,
  TokenExpiredErrorDto,
  WrongPasswordErrorResponseDTO,
} from './dto';
import { LocalStrategy } from './local-auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly localStrategy: LocalStrategy,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Autenticação bem-sucedida',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'E-mail não cadastrado',
    type: NotFoundErrorResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta',
    type: WrongPasswordErrorResponseDTO,
  })
  async login(@Body() body: LoginRequestDTO): Promise<SuccessResponseDto> {
    return await this.localStrategy.validate(body);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 201,
    description: 'Token de acesso renovado com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Assinatura Inválida',
    type: InvalidSignatureErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Token Expirado',
    type: TokenExpiredErrorDto,
  })
  async refresh(@Body() body: RefreshTokenRequestDTO) {
    return await this.authService.refresh(body);
  }
}
