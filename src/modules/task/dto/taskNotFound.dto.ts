import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskNotFoundDTO {
  @ApiProperty({
    example: 'Tarefa não encontrada',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;
}
