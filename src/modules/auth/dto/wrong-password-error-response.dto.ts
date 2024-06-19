import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class WrongPasswordErrorResponseDTO {
  @ApiProperty({
    example: 'Senha incorreta. Tente novamente',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
}
