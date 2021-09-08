import { Connection } from 'typeorm';
import { Dish } from "./dish.entity";

export const dishProvider = [
  {
    provide: 'DISH_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Dish),
    inject: ['DATABASE_CONNECTION'],
  },
];
