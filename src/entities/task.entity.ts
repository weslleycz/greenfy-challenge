import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../common/enums/task-status.enum';
import { User } from './user.entity';

@Entity()
export class Task {
  @Column()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @Column({ default: TaskStatus.PENDING })
  @ApiProperty()
  status: TaskStatus;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.movies)
  user: User;
}
