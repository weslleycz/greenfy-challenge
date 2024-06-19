import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResposeDeleteSuccessDto {
  @ApiProperty({
    example: 'Tarefa não encontrada',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
}
