import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'O título da tarefa',
    example: 'Fazer compras',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A descrição da tarefa (opcional)',
    example: 'Comprar leite, pão e ovos.',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
