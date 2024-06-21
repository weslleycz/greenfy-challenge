import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskSuccessResponseDto {
  @ApiProperty({
    example: 'Tarefa criada com sucesso',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.CREATED,
  })
  statusCode: number;
}
