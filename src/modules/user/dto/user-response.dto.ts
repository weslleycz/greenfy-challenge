import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';

type UserOmitPassword = Omit<User, 'password' | 'tasks'>;

export class UserResponseDTO implements UserOmitPassword {
  @ApiProperty({ description: 'Identificador único do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Endereço de e-mail do usuário' })
  email: string;

  @ApiProperty({ description: 'Data de criação do usuário' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização das informações do usuário',
  })
  updatedAt: Date;
}
