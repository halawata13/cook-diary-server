import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getRepository } from "typeorm";
import { User } from "../src/user/user.entity";
import { Recipe } from "../src/recipe/recipe.entity";
import * as request from "supertest";
import { DishCreateDto } from "../src/dish/dish.dto";
import { Dish } from "../src/dish/dish.entity";

describe('DishController (e2e)', () => {
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

  test('/dish/recipe (GET)', async () => {
    return request(app.getHttpServer())
      .get('/dish/recipe?recipeId=1')
      .expect(200);
  });

  test('/dish/recipe (GET) no params', async () => {
    return request(app.getHttpServer())
      .get('/dish/recipe')
      .expect(400);
  });

  test('/dish/date (GET)', async () => {
    return request(app.getHttpServer())
      .get('/dish/date?year=2021&month=10&date=10')
      .expect(200);
  });

  test('/dish/date (GET) no params', async () => {
    return request(app.getHttpServer())
      .get('/dish/date')
      .expect(400);
  });

  test('/dish (POST)', async () => {
    const user = await createUser();
    const recipe = await createRecipe(user);

    const params: DishCreateDto = {
      recipeId: recipe.id,
      date: '2021-12-21',
    };

    return request(app.getHttpServer())
      .post('/dish')
      .send(params)
      .expect(200);
  });

  test('/dish (POST) no params', async () => {
    return request(app.getHttpServer())
      .post('/dish')
      .expect(200);
  });

  test('/dish (DELETE)', async () => {
    const user = await createUser();
    const recipe = await createRecipe(user);
    const repository = getRepository(Dish);
    const dish = await repository.save(await repository.create({
      userId: user.id,
      recipeId: recipe.id,
      date: '2021-12-21',
    }));

    return request(app.getHttpServer())
      .delete(`/dish?id=${dish.id}`)
      .expect(200);
  });

  test('/dish (DELETE) no params', async () => {
    return request(app.getHttpServer())
      .delete(`/dish`)
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
