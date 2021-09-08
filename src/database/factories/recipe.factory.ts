import { define } from 'typeorm-seeding';
import { Recipe } from '../../recipe/recipe.entity';

define(Recipe, (faker => {
  const recipe = new Recipe();
  const name = faker.name.title();

  recipe.name = name;
  recipe.kana = name;
  recipe.memo = faker.lorem.text();

  return recipe;
}));
