import { createConnection } from 'typeorm';

let factory;

if (process.env.NODE_ENV !== 'test') {
  factory = () => createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'cook_diary',
    password: 'cook_diary',
    database: 'cook_diary2',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    logging: 'all',
  });
} else {
  factory = () => createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'cook_diary',
    password: 'cook_diary',
    database: 'cook_diary2_test',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
  });
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: factory,
  },
];
