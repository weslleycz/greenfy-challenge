import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Token de acesso gerado com sucesso.',
    example: 'd249d3e3-eabd-497a-81f4-254ea1b6d5ca',
  })
  access_token: string;

  @ApiProperty({
    description: 'Token de atualização para obter um novo token de acesso.',
    example: 'd249d3e3-fggffgfg-497a-81f4-254ea1b6d5ca',
  })
  refresh_token: string;
}
