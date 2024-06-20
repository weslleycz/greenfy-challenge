import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import * as dotenv from 'dotenv';
import { Task, User } from '../entities';

dotenv.config();
@Module({
  imports: [
    process.env.NODE_ENV === 'test'
      ? TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User, Task],
          synchronize: true,
          logging: false,
        })
      : TypeOrmModule.forRoot({
          ...config,
        }),
  ],
})
export class DatabaseModule {}
