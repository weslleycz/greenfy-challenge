import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TokenExpiredErrorDto {
  @ApiProperty({
    example: 'Token Expirado',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.FORBIDDEN,
  })
  statusCode: number;
}
