import { ApiProperty } from '@nestjs/swagger';

export class UpdateErrorResponseDto {
  @ApiProperty({
    description: 'Mensagem de erro',
    example:
      'Não é possível criar uma conta porque esse e-mail já está associado a outra conta',
  })
  message: string;

  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400,
  })
  statusCode: number;
}
