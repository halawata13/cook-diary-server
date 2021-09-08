import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from "../database.module";
import { userProviders } from "./user.providers";
import { getConnection, getRepository, Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let repository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...userProviders,
        UserService,
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = getRepository(User);
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

  it('findAll', async () => {
    await createUsers(5);

    const result = await service.findAll();
    expect(result.length).toStrictEqual(5);
  });

  it('findOne', async () => {
    await createUsers(1);

    const result = await service.findOne('name0');
    expect(result).toBeDefined();
  });

  it('findOne no user', async () => {
    await createUsers(1);

    const result = await service.findOne('name1');
    expect(result).toBeUndefined();
  });

  const createUsers = async (count: number) => {
    return await Promise.all(Array.from(Array(count)).map(async (_, i) => {
      const recipe = await repository.create({
        name: `name${i}`,
        email: `email${i}`,
        password: `password${i}`,
      });

      return await repository.save(recipe);
    }));
  };
});
