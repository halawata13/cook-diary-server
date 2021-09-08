import { Test, TestingModule } from '@nestjs/testing';
import { DiaryController } from './diary.controller';
import { DatabaseModule } from "../database.module";
import { diaryProvider } from "./diary.provider";
import { DiaryService } from "./diary.service";

describe('DiaryController', () => {
  let controller: DiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [DiaryController],
      providers: [
        ...diaryProvider,
        DiaryService,
      ],
    }).compile();

    controller = module.get<DiaryController>(DiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
