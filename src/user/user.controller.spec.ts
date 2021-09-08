import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { Repository } from "typeorm";
import { User } from "./user.entity";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const repo = new Repository<User>();
    service = new UserService(repo);
    controller = new UserController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get', () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve([]));

    const result = controller.get();
    expect(result).toBeDefined();
  });
});
