import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  logger: 'file',
  entities: [`${__dirname}../../entities/*.{ts,js}`],
  migrations: [`${__dirname}../../migrations/*.{ts,js}`],
  autoLoadEntities: true,
  migrationsTableName: 'migration_table',
};

export { config };

export default new DataSource(config as DataSourceOptions);
