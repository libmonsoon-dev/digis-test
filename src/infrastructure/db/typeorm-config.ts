import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Config } from '../../models/config';
import { User } from '../../models/user.entity';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: Config) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { config } = this;
    return {
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      extra: {
        connectTimeout: 1500,
        connectionLimit: 50,
      },
      entities: [User],
      synchronize: false,
      //TODO: cache with ORM
      cache: false,
      migrations: ['migrations/*.ts'],
      cli: {
        migrationsDir: 'migrations',
      },
      logging: ['error'],
    };
  }
}
