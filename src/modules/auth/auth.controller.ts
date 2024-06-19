import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServerErrorDto } from '../../common/swagger/responses/server-error.dto';
import {
  LoginRequestDTO,
  SuccessResponseDto,
  NotFoundErrorResponseDTO,
  WrongPasswordErrorResponseDTO,
} from './dto';
import { LocalStrategy } from './local.auth';

@ApiTags('Auth')
@Controller('auth')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Erro Interno do Servidor',
  type: ServerErrorDto,
})
export class AuthController {
  constructor(private readonly localStrategy: LocalStrategy) {}

  @Post('/login')
  @ApiResponse({
    status: 201,
    description: 'Autenticação bem-sucedida.',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'E-mail não cadastrado.',
    type: NotFoundErrorResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta.',
    type: WrongPasswordErrorResponseDTO,
  })
  @ApiOperation({ summary: 'Autenticar usuário' })
  async login(
    @Body() body: LoginRequestDTO,
  ): Promise<
    | SuccessResponseDto
    | NotFoundErrorResponseDTO
    | WrongPasswordErrorResponseDTO
  > {
    return await this.localStrategy.validate(body);
  }
}
