import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from './dish.service';
import { DatabaseModule } from "../database.module";
import { dishProvider } from "./dish.provider";
import { getConnection, getRepository, Repository } from "typeorm";
import { Dish } from "./dish.entity";
import { User } from "../user/user.entity";
import { Recipe } from "../recipe/recipe.entity";

describe('DishService', () => {
  let module: TestingModule;
  let service: DishService;
  let repository: Repository<Dish>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...dishProvider,
        DishService,
      ],
    }).compile();

    service = module.get<DishService>(DishService);
    repository = getRepository(Dish);
    userRepository = getRepository(User);
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findByRecipe', async () => {
    const user = await createUser('test');
    const recipe1 = await createRecipe(user);
    const recipe2 = await createRecipe(user);
    await createDish(user, recipe1, '2021-12-21');
    await createDish(user, recipe2, '2021-12-21');
    await createDish(user, recipe1, '2021-12-22');

    const result = await service.findByRecipe(user.id, recipe1.id);
    expect(result.length).toStrictEqual(2);
  });

  test('findByDate', async () => {
    const user = await createUser('test');
    const recipe1 = await createRecipe(user);
    const recipe2 = await createRecipe(user);
    await createDish(user, recipe1, '2021-12-21');
    await createDish(user, recipe2, '2021-12-21');
    await createDish(user, recipe1, '2021-12-22');

    const result = await service.findByDate(user.id, new Date(2021, 11, 21));
    expect(result.length).toStrictEqual(2);
  });

  test('create', async () => {
    const user = await createUser('test');
    const recipe = await createRecipe(user);

    const result = await service.create(user.id, {
      recipeId: recipe.id,
      date: '2021-12-21',
    });

    expect(result.userId).toStrictEqual(user.id);
    expect(result.recipeId).toStrictEqual(recipe.id);
    expect(result.date).toStrictEqual('2021-12-21');
  });

  test('delete', async () => {
    const user = await createUser('test');
    const recipe = await createRecipe(user);
    const dish = await createDish(user, recipe, '2021-12-21');

    await service.delete(user.id, dish.id);

    const result = await repository.findByIds([dish.id]);
    expect(result.length).toStrictEqual(0);
  });

  const createUser = async (name: string) => {
    const user = await userRepository.create({
      name,
      email: name,
      password: name,
    });

    return userRepository.save(user);
  };

  const createRecipe = async (user: User) => {
    const repository = getRepository(Recipe);
    const recipe = await repository.create({
      userId: user.id,
      name: `recipe`,
      kana: `kana`,
      memo: `memo`,
    });

    return repository.save(recipe);
  };

  const createDish = async (user: User, recipe: Recipe, date: string) => {
    const diary = await repository.create({
      userId: user.id,
      recipeId: recipe.id,
      date,
    });

    return repository.save(diary);
  };
});
