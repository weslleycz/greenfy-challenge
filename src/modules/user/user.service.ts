import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService, generateToken } from '../../common';
import { User } from '../../entities';
import {
  CreateUserDto,
  CreateUserSuccessResponseDto,
  UpdateResponse,
  UpdateUserDto,
  UserResponseDTO,
} from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<CreateUserSuccessResponseDto> {
    const users = await this.userRepository.find({
      where: { email: data.email },
    });

    if (users.length > 0) {
      throw new HttpException(
        'Não é possível criar uma conta porque esse e-mail já está associado a outra conta',
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

    const user = await this.userRepository.save(newUser);
    const auth = await generateToken(user);
    return {
      message: 'Usuário criado com sucesso',
      statusCode: HttpStatus.CREATED,
      ...auth,
    };
  }

  async getAll(): Promise<Array<UserResponseDTO>> {
    return (await this.userRepository.getAllUsers()) as Array<UserResponseDTO>;
  }

  async getById(id: string): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.getById(id);
      return { ...user };
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getByEmail(email);
      return { ...user };
    } catch (error) {
      throw new HttpException(
        'E-mail não cadastrado. Verifique e tente novamente',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async update(data: UpdateUserDto, id: string): Promise<UpdateResponse> {
    const { email, name, password } = data;
    try {
      if (!password) {
        await this.userRepository.update(id, {
          email,
          name,
          updatedAt: new Date(),
        });
      } else {
        const hashPassword = await this.bcryptService.hashPassword(
          data.password,
        );
        await this.userRepository.update(id, {
          email,
          name,
          password: hashPassword,
          updatedAt: new Date(),
        });
      }
      return {
        message: 'Usuario atualizado',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        'Não é possível atualizar o endereço de e-mail porque ele está associado a outra conta',
        HttpStatus.CONFLICT,
      );
    }
  }
}
