import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../../../common/enums/task-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Status da tarefa',
    type: TaskStatus,
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
