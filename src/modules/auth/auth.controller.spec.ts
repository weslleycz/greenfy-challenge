import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CreateUserDto } from '../user/dto';
import * as request from 'supertest';
import { LoginRequestDTO } from './dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const createUserDto: CreateUserDto = {
      name: 'auth',
      email: 'auth@example.com',
      password: 'StrongPassword123@',
      passwordConfirm: 'StrongPassword123@',
    };
    await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return 201 success response on successful login', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'auth@example.com',
          password: 'StrongPassword123@',
        } as LoginRequestDTO)
        .expect(HttpStatus.CREATED);
    });

    it('should return 404 error response not found when email is not registered', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'errado@example.com',
          password: 'StrongPassword123@',
        } as LoginRequestDTO)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return 401 and a wrong password error response when the password is incorrect', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'auth@example.com',
          password: 'errado',
        } as LoginRequestDTO)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
