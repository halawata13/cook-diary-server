import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../src/user/user.entity';
import { RecipeCreateDto } from "../src/recipe/recipe.dto";
import { Recipe } from "../src/recipe/recipe.entity";

describe('RecipeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await getConnection().synchronize(true);
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  test('/recipe (GET)', () => {
    return request(app.getHttpServer())
      .get('/recipe')
      .expect(200);
  });

  test('/recipe?id=1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/recipe?id=1')
      .expect(200);
  });

  test('/recipe (POST)', async () => {
    await createUser();

    const params: RecipeCreateDto = {
      name: 'name',
      kana: 'kana',
    };

    return request(app.getHttpServer())
      .post('/recipe')
      .send(params)
      .expect(201);
  });

  test('/recipe (POST) no params', async () => {
    return request(app.getHttpServer())
      .post('/recipe')
      .send({})
      .expect(400);
  });

  test('/recipe (POST) wrong params', async () => {
    return request(app.getHttpServer())
      .post('/recipe')
      .send({
        namae: 'name',
        kana: 'kana',
      })
      .expect(400);
  });

  test('/recipe (PUT)', async () => {
    const user = await createUser();
    const recipe = await createRecipe(user);

    return request(app.getHttpServer())
      .put('/recipe')
      .send({
        id: recipe.id,
        name: 'name!',
        kana: 'kana!',
        memo: 'memo!',
      })
      .expect(200);
  });

  test('/recipe (PUT) no params', async () => {
    const user = await createUser();
    await createRecipe(user);

    return request(app.getHttpServer())
      .put('/recipe')
      .send({
      })
      .expect(400);
  });

  test('/recipe (PUT) wrong params', async () => {
    const user = await createUser();
    await createRecipe(user);

    return request(app.getHttpServer())
      .put('/recipe')
      .send({
        namae: 'name!',
        kana: 'kana!',
        memo: 'memo!',
      })
      .expect(400);
  });

  test('/recipe (DELETE)', async () => {
    const user = await createUser();
    const recipe = await createRecipe(user);

    return request(app.getHttpServer())
      .delete(`/recipe?id=${recipe.id}`)
      .expect(200);
  });

  test('/recipe (DELETE) no params', async () => {
    const user = await createUser();
    await createRecipe(user);

    return request(app.getHttpServer())
      .delete('/recipe')
      .expect(400);
  });

  test('/recipe (DELETE) wrong params', async () => {
    const user = await createUser();
    const recipe = await createRecipe(user);

    return request(app.getHttpServer())
      .delete(`/recipe?ido=${recipe.id}`)
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

  const createRecipe = async (user: User) => {
    const repository = getRepository(Recipe);
    const recipe = repository.create({
      userId: user.id,
      name: 'name',
      kana: 'kana',
    });
    return await repository.save(recipe);
  };
});
