import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { PasswordOmitUser } from '../user/user.type';

describe('RecipeController', () => {
  const user: PasswordOmitUser = {
    id: 1,
    name: 'test',
    email: 'test',
    createdAt: 0,
    updatedAt: 0,
    recipes: [],
    diaries: [],
  };

  let controller: RecipeController;
  let service: RecipeService;

  beforeAll(async () => {
    const repo = new Repository<Recipe>();
    service = new RecipeService(repo);
    controller = new RecipeController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get', () => {
    jest.spyOn(service, 'find').mockImplementation(() => createRecipe(1)[0]);

    const result = controller.get({ user }, { id: 1 });
    expect(result).toBeDefined();
  });

  it('getAll', () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => createRecipe(10));

    const result = controller.getAll({ user }, { });
    expect(result).toBeDefined();
  });

  it('create', async () => {
    const params = {
      name: `recipe`,
      kana: `kana`,
    };

    jest.spyOn(service, 'create').mockImplementation(async (userId, params) => ({
      ...params,
      id: 1,
      userId,
      memo: `memo`,
      rate: 0,
      kind: 0,
      createdAt: 0,
      updatedAt: 0,
    }));

    const result = await controller.create({ user }, params);
    expect(result).toBeDefined();
  });

  it('update', async () => {
    const params = {
      id: 1,
      name: `recipe`,
      kana: `kana`,
      memo: `memo`,
    };

    jest.spyOn(service, 'update').mockImplementation(async (userId, params) => ({
      ...params,
      userId,
      rate: 0,
      kind: 0,
      createdAt: 0,
      updatedAt: 0,
    }));

    const result = await controller.update({ user }, params);
    expect(result).toBeDefined();
  });

  it('delete', async () => {
    const params = {
      id: 1,
    };

    jest.spyOn(service, 'delete').mockImplementation(async (userId, id) => ({
      id,
      userId,
      name: `recipe`,
      kana: `kana`,
      memo: `memo`,
      rate: 0,
      kind: 0,
      createdAt: 0,
      updatedAt: 0,
    }));

    const result = await controller.delete({ user }, params);
    expect(result).toBeDefined();
  });

  const createRecipe = async (count: number) => {
    const range = Array.from(Array(count)).map((_, i) => i);

    return range.map(i => ({
      id: i,
      userId: 1,
      name: `recipe${i}`,
      kana: `kana${i}`,
      memo: `memo${i}`,
      rate: 0,
      kind: 0,
      createdAt: 0,
      updatedAt: 0,
    }));
  };
});
