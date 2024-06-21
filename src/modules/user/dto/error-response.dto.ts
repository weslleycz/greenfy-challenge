import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponseDto {
  @ApiProperty({
    example:
      'Não é possível criar uma conta porque esse e-mail já está associado a outra conta',
  })
  message: string;

  @ApiProperty({
    description: 'Código de status HTTP',
    example: HttpStatus.OK,
  })
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
