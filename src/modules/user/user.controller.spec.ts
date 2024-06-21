import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /user', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'user',
        email: 'user@example.com',
        password: 'StrongPassword123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CREATED);
    });

    it('should return 409 if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'user',
        email: 'user@example.com',
        password: 'StrongPassword123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('GET /user', () => {
    it('should list all users', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.length > 0).toBe(true);
    });
  });

  describe('GET /user/id', () => {
    it('should return details of a user by valid ID', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.length > 0).toBe(true);
      const userId = reg.body[0].id;
      await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(HttpStatus.OK);
    });

    // it('should return 404 if user ID is not found', async () => {
    //   await request(app.getHttpServer())
    //     .get(`/user/e533c6c0-09ef-4df4-b7a9-9e51785d82d4`)
    //     .expect(HttpStatus.NOT_FOUND);
    // });
  });

  describe('PATCH /user', () => {
    let access_token = '';
    beforeAll(async () => {
      const createUserDto: CreateUserDto = {
        name: 'Update User',
        email: 'updateuser@example.com',
        password: 'StrongPassword123@',
      };

      const createUserResponse = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);
      access_token = createUserResponse.body.access_token;
    });
    it('should update a user successfully', async () => {
      await request(app.getHttpServer())
        .patch('/user')
        .send({
          name: 'Update User New',
        })
        .auth(access_token, { type: 'bearer' })
        .expect(HttpStatus.OK);
    });

    it('should handle missing token with status 401', async () => {
      await request(app.getHttpServer())
        .patch('/user')
        .send({
          name: 'Update User New',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should handle invalid token with 403 status', async () => {
      await request(app.getHttpServer())
        .patch('/user')
        .send({
          name: 'Update User New',
        })
        .auth('1234', { type: 'bearer' })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should handle Email is already in use with 409 status', async () => {
      await request(app.getHttpServer())
        .patch('/user')
        .send({
          email: 'user@example.com',
        })
        .auth(access_token, { type: 'bearer' })
        .expect(HttpStatus.CONFLICT);
    });
  });
});
