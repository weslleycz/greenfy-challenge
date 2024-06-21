import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../../common';

export class CreateTaskDto {
  @ApiProperty({
    description: 'O título da tarefa',
    example: 'Fazer compras',
    type: String,
  })
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  title: string;

  @ApiProperty({
    description: 'A descrição da tarefa (opcional)',
    example: 'Comprar leite, pão e ovos.',
    required: false,
    type: String,
  })
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Status da tarefa',
    type: TaskStatus,
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'O status deve ser (PENDING ou CONCLUSION)',
  })
  status: TaskStatus;
}
