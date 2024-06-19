import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSuccessResponseDto {
  @ApiProperty({
    description: 'Mensagem de confirmação da criação do usuário',
    example: 'Usuário criado com sucesso!',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;

  constructor(partial: Partial<CreateUserSuccessResponseDto>) {
    Object.assign(this, partial);
  }
}
