import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResposeUpdateSuccessDto {
  @ApiProperty({
    example: 'Tarefa atualizada',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
}
