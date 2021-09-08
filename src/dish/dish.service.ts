import { Inject, Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Dish } from "./dish.entity";
import { DishCreateDto } from './dish.dto';

@Injectable()
export class DishService {
  constructor(
    @Inject('DISH_REPOSITORY')
    private readonly dishRepository: Repository<Dish>,
  ) {}

  async findByRecipe(userId: number, recipeId: number): Promise<Dish[]> {
    return this.dishRepository.find({
      where: {
        userId,
        recipeId,
      },
      join: {
        alias: 'dish',
        innerJoinAndSelect: {
          user: 'dish.user',
          recipe: 'dish.recipe',
        }
      },
      order: {
        date: 'DESC',
      },
    });
  }

  async findByDate(userId: number, date: Date): Promise<Dish[]> {
    return this.dishRepository.find({
      where: {
        userId,
        date,
      },
      join: {
        alias: 'dish',
        innerJoinAndSelect: {
          user: 'dish.user',
          recipe: 'dish.recipe',
        }
      },
    });
  }

  async create(userId: number, params: DishCreateDto): Promise<Dish | null> {
    const dish = await this.dishRepository.create({
      userId,
      ...params,
    });
    return this.dishRepository.save(dish);
  }

  async delete(userId: number, id: number): Promise<Dish | null> {
    const dish = await this.dishRepository.findOne({
      id,
      userId,
    });
    if (!dish) {
      return null;
    }

    return this.dishRepository.remove(dish);
  }
}
