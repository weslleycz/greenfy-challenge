import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../common';
import { User } from './user.entity';

@Entity()
export class Task {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @Column({ default: TaskStatus.PENDING })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  users: User;
}
