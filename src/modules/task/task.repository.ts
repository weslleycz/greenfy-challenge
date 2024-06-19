import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../../entities';
import { TaskResponseDTO } from './dto';
import { TaskStatus } from '../../common/enums/task-status.enum';

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
    id: string,
    status?: TaskStatus,
  ): Promise<TaskResponseDTO[]> {
    const whereCondition = status
      ? { status: status, user: { id } }
      : { user: { id } };

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
