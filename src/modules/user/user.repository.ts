import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities';
import { UserResponseDTO } from './dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = (await this.find({
      select: ['createdAt', 'email', 'id', 'name', 'updatedAt'],
    })) as unknown as Promise<UserResponseDTO[]>;
    return users;
  }

  async getById(id: string): Promise<UserResponseDTO> {
    return await this.findOne({
      where: {
        id,
      },
      select: ['createdAt', 'email', 'id', 'name', 'updatedAt'],
    });
  }
}
