import { Body, Controller, Post, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthTokenNotFound } from '../../common/swagger/responses/autokenNotFound.dto';
import { AuthTokenUnauthorized } from '../../common/swagger/responses/authTokenUnauthorized.dto';
import {
  CreateTaskDto,
  CreateTaskSuccessResponseDto,
  ErrorTaskResponseDto,
} from './dto';

import { Request } from 'express';

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
}
