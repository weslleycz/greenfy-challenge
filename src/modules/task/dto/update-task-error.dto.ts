import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResposeUpdateErrorDto {
  @ApiProperty({
    example: 'Erro ao atualizar a tarefa',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;
}
