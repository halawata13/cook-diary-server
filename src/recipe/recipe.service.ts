import { Inject, Injectable } from '@nestjs/common';
import { createQueryBuilder, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { RecipeCreateDto, RecipeUpdateDto } from './recipe.dto';
import { Dish } from '../dish/dish.entity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(userId: number): Promise<Recipe[]> {
    const builder = createQueryBuilder().from(Recipe, 'R')
      .select('*')
      .addSelect(subquery => {
        return subquery.from(Dish, 'D')
          .select('date')
          .where('D.recipe_id = R.id')
          .orderBy('D.date', 'DESC')
          .limit(1);
      }, 'lastCookedDate')
      .where('user_id = :user_id', { user_id: userId })
      .orderBy('lastCookedDate', 'DESC');

    return builder.execute();
  }

  async find(userId: number, id: number): Promise<Recipe | undefined> {
    return this.recipeRepository.findOne({
      userId,
      id,
    });
  }

  async findByName(userId: number, name: string): Promise<Recipe | undefined> {
    return this.recipeRepository.findOne({
      userId,
      name,
    });
  }

  async create(userId: number, params: RecipeCreateDto) {
    const recipe = await this.recipeRepository.create({
      ...params,
      userId,
    });
    return this.recipeRepository.save(recipe);
  }

  async update(userId: number, params: RecipeUpdateDto): Promise<Recipe | null> {
    const recipe = await this.recipeRepository.findOne({
      id: params.id,
      userId,
    });
    if (!recipe) {
      return null;
    }

    const updateParams: Recipe = {
      ...recipe,
      ...params,
    };

    return this.recipeRepository.save(updateParams);
  }

  async delete(userId: number, id: number): Promise<Recipe | null> {
    const recipe = await this.recipeRepository.findOne({
      id,
      userId,
    });
    if (!recipe) {
      return null;
    }

    return this.recipeRepository.remove(recipe);
  }
}
