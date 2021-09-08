import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { recipeProvider } from "./recipe.provider";
import { DatabaseModule } from "../database.module";
import { getConnection, getRepository, Repository } from "typeorm";
import { userProviders } from "../user/user.providers";
import { User } from "../user/user.entity";
import { Recipe } from "./recipe.entity";
import { RecipeCreateDto, RecipeUpdateDto } from "./recipe.dto";

describe('RecipeService', () => {
  let module: TestingModule;
  let service: RecipeService;
  let repository: Repository<Recipe>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        RecipeService,
        ...recipeProvider,
        ...userProviders,
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    repository = getRepository(Recipe);
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

  test('findAll', async () => {
    const user = await createUser('hoge');
    await createRecipe(user, 5);

    const user1Result = await service.findAll(user.id);
    expect(user1Result.length).toStrictEqual(5);

    const user99Result = await service.findAll(99);
    expect(user99Result.length).toStrictEqual(0);
  });

  test('find', async () => {
    const user = await createUser('hoge');
    const recipes = await createRecipe(user, 1);

    const recipe = await service.find(user.id, recipes[0].id);
    expect(recipe).toBeDefined();

    const noRecipe = await service.find(user.id, 99);
    expect(noRecipe).toBeUndefined();

    const noUserRecipe = await service.find(99, recipes[0].id);
    expect(noUserRecipe).toBeUndefined();
  });

  test('create', async () => {
    const user = await createUser('hoge');
    const params: RecipeCreateDto = {
      name: 'recipeName',
      kana: 'recipeKana',
    };

    const recipe = await service.create(user.id, params);
    expect(recipe.userId).toStrictEqual(user.id);
    expect(recipe.name).toStrictEqual(params.name);
    expect(recipe.kana).toStrictEqual(params.kana);

    const result = repository.findByIds([recipe.id]);
    expect(result).toBeDefined();
  });

  test('update', async () => {
    const user = await createUser('hoge');
    const recipes = await createRecipe(user, 2);

    const params: RecipeUpdateDto = {
      id: recipes[0].id,
      name: 'recipeName',
      kana: 'recipeKana',
      memo: 'memo',
    };

    await service.update(user.id, params);

    const recipe0 = await service.find(user.id, recipes[0].id);
    expect(recipe0).not.toStrictEqual(recipes[0]);
    expect(recipe0.name).toStrictEqual(params.name);
    expect(recipe0.kana).toStrictEqual(params.kana);

    const recipe1 = await service.find(user.id, recipes[1].id);
    expect(recipe1).toStrictEqual(recipes[1]);
  });

  test('delete', async () => {
    const user = await createUser('hoge');
    const recipes = await createRecipe(user, 2);

    await service.delete(user.id, recipes[0].id);
    const recipe0 = await service.find(user.id, recipes[0].id);
    expect(recipe0).toBeUndefined();

    const recipe1 = await service.find(user.id, recipes[1].id);
    expect(recipe1).toBeDefined();
  });

  const createUser = async (name: string) => {
    const user = await userRepository.create({
      name,
      email: name,
      password: name,
    });

    return userRepository.save(user);
  };

  const createRecipe = async (user: User, count: number) => {
    const range = Array.from(Array(count)).map((_, i) => i);
    const recipes: Recipe[] = [];

    for (const i of range) {
      const recipe = await repository.create({
        userId: user.id,
        name: `recipe${i}`,
        kana: `kana${i}`,
        memo: `memo${i}`,
      });

      recipes.push(await repository.save(recipe));
    }

    return recipes;
  };
});
