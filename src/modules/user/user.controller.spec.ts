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
    it('Deve criar um novo usuário', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
        passwordConfirm: 'SenhaForte123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CREATED);
    });

    it('Deve retornar 409 se o e-mail já existir', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
        passwordConfirm: 'SenhaForte123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('GET /user', () => {
    it('Deve listar todos os usuarios', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.length > 0).toBe(true);
    });
  });

  describe('GET /user/id', () => {
    it('Deve retornar os detalhes de um usuário por ID válido.', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.length > 0).toBe(true);
      const userId = reg.body[0].id;
      await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(HttpStatus.OK);
    });

    it('Deve retornar 404 se o ID de usuário não for encontrado.', async () => {
      await request(app.getHttpServer())
        .get(`/user/e533c6c0-09ef-4df4-b7a9-9e51785d82d4`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
