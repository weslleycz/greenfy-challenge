import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user';
import {
  CreateTaskDto,
  CreateTaskSuccessResponseDto,
  ErrorTaskResponseDto,
  TaskResponseDTO,
} from './dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from '../../common/enums/task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(
    data: CreateTaskDto,
    id: string,
  ): Promise<CreateTaskSuccessResponseDto | ErrorTaskResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      await this.taskRepository.save({
        createdAt: new Date(),
        updatedAt: new Date(),
        description: data.description,
        title: data.title,
        user: user,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Tarefa criada com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Não foi possível criar a tarefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getById(id: string): Promise<TaskResponseDTO> {
    try {
      return await this.taskRepository.getById(id);
    } catch (error) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  async getAll(id: string, status?: TaskStatus) {
    if (!!status) {
      const tasks = await this.taskRepository.getAllByUserId(id, status);
      return tasks;
    } else {
      const tasks = await this.taskRepository.getAllByUserId(id);
      return tasks;
    }
  }
}
