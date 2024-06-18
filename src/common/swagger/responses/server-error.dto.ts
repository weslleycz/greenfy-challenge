import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorDto {
  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Erro Interno do Servidor',
  })
  message: string;

  @ApiProperty({
    description: 'Código de status HTTP (500)',
    example: 500,
  })
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
