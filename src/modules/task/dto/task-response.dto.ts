import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../../entities';
import { TaskStatus } from '../../../common/enums/task-status.enum';

type TaskOmitUser = Omit<Task, 'users'>;

export class TaskResponseDTO implements TaskOmitUser {
  @ApiProperty({ description: 'ID da tarefa' })
  id: string;

  @ApiProperty({ description: 'Título da tarefa' })
  title: string;

  @ApiProperty({ description: 'Descrição da tarefa', required: false })
  description?: string;

  @ApiProperty({ description: 'Data de atualização da tarefa' })
  updatedAt: Date;

  @ApiProperty({ description: 'Data de criação da tarefa' })
  createdAt: Date;

  @ApiProperty({ description: 'Status da tarefa' })
  status: TaskStatus;
}
