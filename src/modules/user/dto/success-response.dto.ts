import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Mensagem de confirmação da criação do usuário',
    example: 'Usuário criado com sucesso!',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  constructor(partial: Partial<SuccessResponseDto>) {
    Object.assign(this, partial);
  }
}
