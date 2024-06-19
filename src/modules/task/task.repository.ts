import { Repository } from 'typeorm';
import { Task } from '../../entities';

export class TaskRepository extends Repository<Task> {}
