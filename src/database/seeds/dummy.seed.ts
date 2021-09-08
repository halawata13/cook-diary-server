import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../user/user.entity';
import { Recipe } from '../../recipe/recipe.entity';
import { Diary } from '../../diary/diary.entity';
import { Dish } from '../../dish/dish.entity';

export default class DummySeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const users = await factory(User)().createMany(10);

    await Promise.all(users.map(async user => {
      const recipes = await factory(Recipe)().createMany(100, { userId: user.id });

      await Promise.all(recipes.map(async recipe => {
        await factory(Dish)().createMany(10, { userId: user.id, recipeId: recipe.id })
      }));
    }));

    await Promise.all(users.map(async user => {
      await factory(Diary)().createMany(100, { userId: user.id });
    }));
  }
}
