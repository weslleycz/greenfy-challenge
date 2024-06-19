import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@example.com',
    type: String,
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaForte123@',
    type: String,
  })
  @IsString()
  password: string;
}
