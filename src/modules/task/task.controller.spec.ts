import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateUserDto } from '../user/dto';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let taskService: TaskService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let access_token = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    taskService = moduleFixture.get<TaskService>(TaskService);
    await app.init();

    const createUserDto: CreateUserDto = {
      name: 'Task User',
      email: 'task@example.com',
      password: 'StrongPassword123@',
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto);
    access_token = createUserResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /task', () => {
    it('should create a new task', async () => {
      await request(app.getHttpServer())
        .post('/task')
        .send({
          title: 'Fazer compras',
          description: 'Comprar leite, pão e ovos.',
        })
        .auth(access_token, { type: 'bearer' })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('GET /task', () => {
    it('should list tasks by user', async () => {
      await request(app.getHttpServer())
        .get('/task')
        .auth(access_token, { type: 'bearer' })
        .expect(HttpStatus.OK);
    });
  });

  describe('GET /task/id', () => {
    it('must select a task by id', async () => {
      const reg = await request(app.getHttpServer())
        .get('/task')
        .auth(access_token, { type: 'bearer' })
        .expect(HttpStatus.OK);
      expect(reg.body.length > 0).toBe(true);
    });
  });
});
