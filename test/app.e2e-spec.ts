import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; 
import { AppModule } from './../src/app.module';

describe('Sistem Autentikasi API (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/register (POST) - Mendaftarkan user test', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({ username: 'user_tester_e2e', password: 'password123' })
      .expect(201)
      .then((response) => {
        expect(response.body.data.username).toEqual('user_tester_e2e');
      });
  });

  it('/auth/login (POST) - Mendapatkan Token JWT', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user_tester_e2e', password: 'password123' })
      .expect(201)
      .then((response) => {
        expect(response.body.access_token).toBeDefined();
        jwtToken = response.body.access_token; 
      });
  });

  it('/tasks (GET) - Ditolak jika tanpa token', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(401);
  });

  it('/tasks (GET) - Berhasil akses dengan token', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});