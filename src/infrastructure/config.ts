import { Config } from '../models/config';
import { plainToClass } from 'class-transformer';
import { ValidationUtils } from '../utils/validation-utils';

export const getConfigFromEnvironment: () => Config = () => {
  const config = plainToClass(Config, {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number.parseInt(process.env.DB_PORT as string, 10),
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,

    CACHE_HOST: process.env.CACHE_HOST,
    CACHE_PORT: Number.parseInt(process.env.CACHE_PORT as string, 10),
  });

  ValidationUtils.validateSync(config);
  return config;
};
