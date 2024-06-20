import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestDTO {
  @ApiProperty({
    description: 'Token de acesso',
    example: 'd249d3e3-eabd-497a-81f4-254ea1b6d5ca',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
