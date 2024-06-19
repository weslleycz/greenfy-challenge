import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
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
import { TaskStatus } from '../../common/enums/task-status.enum';
import { TaskResposeDeleteSuccessDto } from './dto/delete-task-success.dto';

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
  @ApiParam({ name: 'id', description: 'ID da tarefa' })
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
  ): Promise<TaskResponseDTO | TaskNotFoundDTO> {
    return await this.taskService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tarefas por usuário' })
  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    required: false,
    description:
      'Filtra as tarefas pelo status especificado. Se não fornecido, retorna todas as tarefas do usuário',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de tarefas do usuário com base no filtro aplicado. Se nenhum filtro for aplicado, retorna todas as tarefas do usuário',
    type: TaskResponseDTO,
    isArray: true,
  })
  async getAll(
    @Query('status') status: TaskStatus,
    @Req() request: Request,
  ): Promise<TaskResponseDTO[]> {
    return await this.taskService.getAll(request.headers.id as string, status);
  }

  @Delete('id')
  @ApiParam({ name: 'id', description: 'ID da tarefa' })
  @ApiOperation({ summary: 'Deletar tarefa por id' })
  async delete(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<TaskResposeDeleteSuccessDto | TaskNotFoundDTO> {
    return await this.taskService.delete(id, request.headers.id as string);
  }
}
