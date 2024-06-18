import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../entities';

@Entity()
export class User {
  @Column()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  phoneNumber: string;

  @OneToMany(() => Task, (task) => task.user)
  movies: Task[];
}
