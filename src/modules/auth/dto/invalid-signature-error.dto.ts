import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InvalidSignatureErrorDto {
  @ApiProperty({
    example: 'Assinatura Inválida',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
}
