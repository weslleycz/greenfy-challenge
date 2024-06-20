import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Token de acesso',
    example: 'd249d3e3-eabd-497a-81f4-254ea1b6d5ca',
  })
  access_token: string;
}
