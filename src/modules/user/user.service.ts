import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/services';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { SuccessResponseDto, ErrorResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    data: CreateUserDto,
  ): Promise<SuccessResponseDto | ErrorResponseDto> {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (userExists) {
        throw new HttpException(
          new ErrorResponseDto(
            'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
            HttpStatus.CONFLICT,
          ),
          HttpStatus.CONFLICT,
        );
      }

      const hashPassword = await this.bcryptService.hashPassword(data.password);

      const newUser = {
        email: data.email,
        name: data.name,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.userRepository.save(newUser);

      return new SuccessResponseDto({
        message: 'Usuário criado com sucesso!',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
