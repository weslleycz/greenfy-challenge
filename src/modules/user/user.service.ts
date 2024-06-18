import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { UserRepository } from './user.repository';
import { CreateUserDto, SuccessResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<SuccessResponseDto> {
    try {
      // Verifique se o usuário já existe
      const userExists = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (userExists) {
        throw new HttpException(
          'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
          HttpStatus.CONFLICT,
        );
      }

      // Hash da senha
      const hashPassword = await this.bcryptService.hashPassword(data.password);

      // Criação do novo usuário
      const newUser = {
        email: data.email,
        name: data.name,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: data.phoneNumber,
      };

      await this.userRepository.save(newUser);

      return {
        message: 'Usuário criado com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar o usuário.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
