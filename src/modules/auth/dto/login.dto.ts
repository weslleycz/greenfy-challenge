import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@example.com',
    type: String,
    format: 'email',
  })
  @IsString({ message: 'O e-mail deve ser uma string' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaForte123@',
    type: String,
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
