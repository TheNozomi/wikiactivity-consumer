import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
config();

import dbConfig from './config/database';

export const connectionSource = new DataSource(
  dbConfig().database as PostgresConnectionOptions,
);
