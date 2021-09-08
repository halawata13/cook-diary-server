import { Connection } from 'typeorm';
import { Recipe } from './recipe.entity';

export const recipeProvider = [
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Recipe),
    inject: ['DATABASE_CONNECTION'],
  },
];
