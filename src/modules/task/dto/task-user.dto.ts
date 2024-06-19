import { TaskStatus } from '../../../common/enums/task-status.enum';
import { User } from '../../../entities';

export class CreateTaskDto {
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  user: User;
}
