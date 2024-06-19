import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../../entities';
import { TaskResponseDTO } from './dto';

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
}
