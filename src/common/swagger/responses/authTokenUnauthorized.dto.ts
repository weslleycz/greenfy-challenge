import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthTokenUnauthorized {
  @ApiProperty({
    example: 'Token inválido',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.FORBIDDEN,
  })
  statusCode: number;
}
