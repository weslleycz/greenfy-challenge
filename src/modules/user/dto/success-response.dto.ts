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

  @ApiProperty({
    description: 'Token de acesso',
    example: 'd249d3e3-eabd-497a-81f4-254ea1b6d5ca',
  })
  access_token: string;

  @ApiProperty({
    description: 'Token de atualização para obter um novo token de acesso.',
    example: 'd249d3e3-fggffgfg-497a-81f4-254ea1b6d5ca',
  })
  refresh_token: string;
}
