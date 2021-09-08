import { Test, TestingModule } from '@nestjs/testing';
import { RecipeSiteService } from './recipe-site.service';

describe('RecipeSiteService', () => {
  let module: TestingModule;
  let service: RecipeSiteService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [RecipeSiteService],
    }).compile();

    service = module.get<RecipeSiteService>(RecipeSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getAll', () => {
    const result = service.getAll();
    expect(result.length).toBeTruthy();
  });
});
