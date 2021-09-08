import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DatabaseModule } from "../database.module";
import { dishProvider } from "./dish.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [DishController],
  providers: [
    ...dishProvider,
    DishService,
  ]
})
export class DishModule {}
