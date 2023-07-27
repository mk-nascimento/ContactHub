import 'dotenv/config';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const settings = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
  const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}');

  const NODE_ENV: string | undefined = process.env.NODE_ENV;

  if (NODE_ENV === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

  if (!DATABASE_URL) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: 'postgres',
    url: DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(settings());

export { AppDataSource };
