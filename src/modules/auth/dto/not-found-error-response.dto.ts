import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundErrorResponseDTO {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
  @ApiProperty({
    example: 'E-mail não cadastrado. Verifique e tente novamente',
  })
  message: string;
}
