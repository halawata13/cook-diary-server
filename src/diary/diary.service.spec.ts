import { Test, TestingModule } from '@nestjs/testing';
import { DiaryService } from './diary.service';
import { DatabaseModule } from "../database.module";
import { diaryProvider } from "./diary.provider";
import { getConnection, getRepository, Repository } from "typeorm";
import { Diary } from "./diary.entity";
import { User } from "../user/user.entity";
import { userProviders } from "../user/user.providers";

describe('DiaryService', () => {
  let module: TestingModule;
  let service: DiaryService;
  let repository: Repository<Diary>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...diaryProvider,
        DiaryService,
        ...userProviders,
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
    repository = getRepository(Diary);
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

  test('find', async () => {
    const user = await createUser('hoge');
    await createDiary(user, new Date(2020, 2, 14));

    const result1 = await service.find(user.id, new Date(2020, 2, 14));
    expect(result1).toBeDefined();

    const result2 = await service.find(99, new Date(2020, 2, 14));
    expect(result2).toBeUndefined();

    const result3 = await service.find(user.id, new Date(3000, 2, 14));
    expect(result3).toBeUndefined();
  });

  test('create', async () => {
    const user = await createUser('hoge');
    const params = {
      date: '2020-03-14',
      memo: 'memomemo',
    };

    const diary = await service.create(user.id, params);
    expect(diary.userId).toStrictEqual(user.id);
    expect(diary.date).toStrictEqual(params.date);
    expect(diary.memo).toStrictEqual(params.memo);

    const result = await repository.findByIds([diary.id]);
    expect(result).toBeDefined();
  });

  test('update', async () => {
    const user = await createUser('hoge');
    const diary = await repository.save(await repository.create({
      userId: user.id,
      date: '2020-03-14',
      memo: 'memomemo',
    }));

    const params = {
      id: diary.id,
      date: '2020-03-14',
      memo: 'momemome',
    };

    const updated = await service.update(user.id, params);
    expect(updated.memo).toStrictEqual(params.memo);
  });

  const createUser = async (name: string) => {
    const user = await userRepository.create({
      name,
      email: name,
      password: name,
    });

    return userRepository.save(user);
  };

  const createDiary = async (user: User, date: Date) => {
    const diary = await repository.create({
      userId: user.id,
      date,
    });

    return repository.save(diary);
  };
});
