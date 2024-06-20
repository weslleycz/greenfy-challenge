import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserNotFoundDTO {
  @ApiProperty({
    example: 'Usuário não encontrado',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  constructor(message: string, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
