import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    type: String,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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
    minLength: 9,
    pattern: '((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  })
  @IsString()
  @MinLength(9, { message: 'A senha deve ter pelo menos 9 caracteres' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
  })
  password: string;
}
