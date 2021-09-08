import { define } from 'typeorm-seeding';
import { Dish } from '../../dish/dish.entity';

const date = new Date();

define(Dish, faker => {
  const dish = new Dish();
  date.setTime(date.getTime() - 1000 * 60 * 60 * 24);

  dish.userId = 1;
  dish.recipeId = 1;
  dish.date = date;

  return dish;
});
