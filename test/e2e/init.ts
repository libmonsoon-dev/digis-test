import { INestApplication } from '@nestjs/common';
import * as uuid from 'uuid';
import { Client } from 'pg';
import { AppFactory } from '../../src/app';
import { getConnection } from 'typeorm/index';
import { RedisService } from 'nestjs-redis';

const database = `test-${uuid.v4()}`;
const databaseConfig = {
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
let app: INestApplication;

export const setup = async (): Promise<INestApplication> => {
  const databaseClient = new Client(databaseConfig);
  await databaseClient.connect();
  await databaseClient.query(`DROP DATABASE IF EXISTS "${database}"`);
  await databaseClient.query(`CREATE DATABASE "${database}"`);
  await databaseClient.end();

  process.env.DB_NAME = database;
  app = await AppFactory.create();
  await getConnection().runMigrations({
    transaction: 'none',
  });
  return app;
};

export const teardown = async () => {
  const databaseClient = new Client(databaseConfig);
  await databaseClient.connect();
  await databaseClient.query(`DROP DATABASE "${database}"`);
  await databaseClient.end();
};

export const clear = async () => {
  const databaseClient = new Client(databaseConfig);
  await databaseClient.connect();
  const { rows } = await databaseClient.query(`
    SELECT table_name AS table
    FROM information_schema.tables
    WHERE table_schema='public'
      AND table_type='BASE TABLE'
      AND table_name NOT IN ('migrations');
  `);
  const query = `TRUNCATE TABLE ${rows
    .map(({ table }) => `"${table}"`)
    .join(',')};`;

  await databaseClient.query(query);
  await databaseClient.end();

  await app.get(RedisService).getClient().flushall();
};
