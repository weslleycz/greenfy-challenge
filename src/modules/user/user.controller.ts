import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Request } from 'express';

import { UserService } from './user.service';

import {
  CreateUserDto,
  CreateUserSuccessResponseDto,
  ErrorResponseDto,
  UpdateResponse,
  UpdateUserDto,
  UserNotFoundDTO,
  UserResponseDTO,
} from './dto';

import { AuthTokenNotFound, AuthTokenUnauthorized } from '../../common';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário.' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: CreateUserSuccessResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail já está em uso.',
    type: ErrorResponseDto,
  })
  async create(
    @Body() createCatDto: CreateUserDto,
  ): Promise<CreateUserSuccessResponseDto> {
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
  @ApiParam({ name: 'id', description: 'ID do usuário' })
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
    @Param('id')
    id: string,
  ): Promise<UserResponseDTO> {
    return await this.userService.getById(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar informações do usuário' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
    description: 'Token não fornecido',
    type: AuthTokenNotFound,
  })
  @ApiResponse({
    status: 403,
    description: 'Token inválido',
    type: AuthTokenUnauthorized,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: UpdateResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail já está em uso',
    type: ErrorResponseDto,
  })
  async update(
    @Body() body: UpdateUserDto,
    @Req() request: Request,
  ): Promise<UpdateResponse> {
    return await this.userService.update(body, request.headers.id as string);
  }
}
