import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { CreateUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}
  async create(data: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!userExists) {
      const hashPassword = await this.bcryptService.hashPassword(data.password);
      await this.userRepository.save({
        email: data.email,
        name: data.name,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return {
        message: 'Usuário criado com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } else {
      throw new HttpException(
        'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
