import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import * as queryString from 'querystring';
import { DiaryCreateDto, DiaryUpdateDto } from "../src/diary/diary.dto";
import { getRepository } from "typeorm";
import { User } from "../src/user/user.entity";
import { Diary } from "../src/diary/diary.entity";

describe('DiaryController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/diary (GET)', async () => {
    const params = {
      year: 2021,
      month: 3,
      date: 1,
    };

    return request(app.getHttpServer())
      .get(`/diary?${queryString.stringify(params)}`)
      .expect(200);
  });

  test('/diary (GET) no params', async () => {
    return request(app.getHttpServer())
      .get(`/diary`)
      .expect(400);
  });

  test('/diary (POST)', async () => {
    const params: DiaryCreateDto = {
      date: '2021-04-03',
      memo: 'memo',
    };

    return request(app.getHttpServer())
      .post(`/diary`)
      .send(params)
      .expect(201);
  });

  test('/diary (POST) no params', async () => {
    return request(app.getHttpServer())
      .post(`/diary`)
      .expect(400);
  });

  test('/diary (PUT)', async () => {
    const user = await createUser();
    const repository = getRepository(Diary);
    const diary = await repository.save(await repository.create({
      userId: user.id,
      date: '2021-04-03',
      memo: 'memo',
    }));

    const params: DiaryUpdateDto = {
      id: diary.id,
      date: '2021-04-03',
      memo: 'memo',
    };

    return request(app.getHttpServer())
      .put(`/diary`)
      .send(params)
      .expect(200);
  });

  test('/diary (PUT) no params', async () => {
    return request(app.getHttpServer())
      .put(`/diary`)
      .expect(400);
  });

  const createUser = async () => {
    const repository = getRepository(User);
    const user = repository.create({
      id: 1,
      name: 'name',
      email: 'email',
      password: 'password',
    });
    return await repository.save(user);
  };
});
