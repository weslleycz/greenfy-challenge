import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ServerErrorDto } from '../../common/swagger/responses/server-error.dto';
import {
  CreateUserDto,
  ErrorResponseDto,
  SuccessResponseDto,
  UserResponseDTO,
} from './dto';
import { UserService } from './user.service';
import { UserNotFoundDTO } from './dto/userNotFound.dto';

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
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários.',
    type: UserResponseDTO,
    isArray: true,
  })
  async getAll(): Promise<Array<UserResponseDTO>> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por id' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do usuário.',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: UserNotFoundDTO,
  })
  async getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<UserResponseDTO | UserNotFoundDTO> {
    return await this.userService.getById(id);
  }
}
