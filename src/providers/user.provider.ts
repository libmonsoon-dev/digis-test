import { Provider } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ProviderUtils } from '../utils/provider-utils';
import { PostgresUserRepository } from '../interfaces/repository/postgres/user.repository';
import { AbstractUserRepository } from '../interfaces/repository/user.repository';
import { RedisUserRepository } from '../interfaces/repository/cache/user.repository';
import { PERSISTENT_USER_STORAGE } from './constants';

const postgresUserRepository = ProviderUtils.makeTypeormRepositoryProvider(
  PERSISTENT_USER_STORAGE,
  PostgresUserRepository,
);

const redisUserRepository = ProviderUtils.makeRedisProvider(
  AbstractUserRepository,
  RedisUserRepository,
);

export const userProviders: Provider[] = [
  UserService,
  postgresUserRepository,
  redisUserRepository,
];
