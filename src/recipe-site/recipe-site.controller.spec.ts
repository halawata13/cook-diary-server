import { RecipeSiteController } from './recipe-site.controller';
import { RecipeSiteService } from "./recipe-site.service";
import { PasswordOmitUser } from "../user/user.type";

describe('RecipeSiteController', () => {
  const user: PasswordOmitUser = {
    id: 1,
    name: 'test',
    email: 'test',
    createdAt: 0,
    updatedAt: 0,
    recipes: [],
    diaries: [],
  };

  let service: RecipeSiteService;
  let controller: RecipeSiteController;

  beforeAll(async () => {
    service = new RecipeSiteService();
    controller = new RecipeSiteController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('get', async () => {
    jest.spyOn(service, 'getAll').mockImplementation(() => [
      {
        id: 1,
        name: 'name1',
        url: 'url1',
      },
      {
        id: 2,
        name: 'name2',
        url: 'url2',
      },
    ]);

    const result = controller.get({ user });
    expect(result.length).toStrictEqual(2);
  });
});
