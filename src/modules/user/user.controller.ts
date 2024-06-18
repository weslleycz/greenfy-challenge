import { Body, Controller, HttpStatus, Post, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ErrorResponseDto, SuccessResponseDto } from './dto';
import { ServerErrorDto } from '../../common/swagger/responses/server-error.dto';
import { UserResponseDTO } from './dto/user-response.dto';

@ApiTags('User')
@Controller('user')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Erro Interno do Servidor',
  type: ServerErrorDto,
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário criado com sucesso.',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflito: E-mail já está em uso.',
    type: ErrorResponseDto,
  })
  async create(
    @Body() createCatDto: CreateUserDto,
  ): Promise<SuccessResponseDto | ErrorResponseDto> {
    return await this.userService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários.',
    type: UserResponseDTO,
    isArray: true,
  })
  async getAll(): Promise<Array<UserResponseDTO>> {
    return await this.userService.getAll();
  }
}
