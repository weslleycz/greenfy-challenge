import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorTaskResponseDto {
  @ApiProperty({
    example: 'Não foi possível criar o filme',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;
}
