import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthTokenUnauthorized } from '../../common/swagger/responses/authTokenUnauthorized.dto';
import { AuthTokenNotFound } from '../../common/swagger/responses/autokenNotFound.dto';
import {
  CreateTaskDto,
  CreateTaskSuccessResponseDto,
  ErrorTaskResponseDto,
  TaskResponseDTO,
} from './dto';
import { TaskService } from './task.service';

import { Request } from 'express';
import { TaskNotFoundDTO } from './dto/taskNotFound.dto';

@ApiTags('Task')
@Controller('task')
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
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiResponse({
    status: 200,
    description: 'Tarefa criada com sucesso',
    type: CreateTaskSuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Não foi possível criar o filme.',
    type: ErrorTaskResponseDto,
  })
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @Post()
  @ApiBody({ type: CreateTaskDto })
  async create(
    @Body() body: CreateTaskDto,
    @Req() request: Request,
  ): Promise<AuthTokenUnauthorized | ErrorTaskResponseDto> {
    return await this.taskService.create(body, request.headers.id as string);
  }

  @Get('id')
  @ApiOperation({ summary: 'Selecionar tarefa por id' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a tarefa selecionado',
    type: TaskResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: TaskNotFoundDTO,
  })
  async getById(
    @Param('id')
    id: string,
  ) {
    return await this.taskService.getById(id);
  }
}
