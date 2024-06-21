import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task, User } from '../../entities';
import { TaskResponseDTO } from './dto';
import { TaskStatus } from '../../common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<TaskResponseDTO> {
    return await this.findOne({
      where: {
        id,
      },
      select: [
        'createdAt',
        'description',
        'id',
        'status',
        'title',
        'updatedAt',
      ],
    });
  }

  async getAllByUserId(
    user: User,
    status?: TaskStatus,
  ): Promise<TaskResponseDTO[]> {
    const whereCondition = status
      ? { status: status, users: user }
      : { users: user };

    return (await this.find({
      where: whereCondition,
      select: [
        'createdAt',
        'description',
        'id',
        'status',
        'title',
        'updatedAt',
      ],
    })) as unknown as TaskResponseDTO[];
  }
}
