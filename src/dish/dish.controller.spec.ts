import { Test, TestingModule } from '@nestjs/testing';
import { DishController } from './dish.controller';
import { DatabaseModule } from "../database.module";
import { dishProvider } from "./dish.provider";
import { DishService } from "./dish.service";

describe('DishController', () => {
  let controller: DishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [DishController],
      providers: [
        ...dishProvider,
        DishService,
      ],
    }).compile();

    controller = module.get<DishController>(DishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
