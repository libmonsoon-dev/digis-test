import { Provider, Type } from '@nestjs/common';
import { Connection, getCustomRepository, ObjectType } from 'typeorm/index';
import { getConnectionToken } from '@nestjs/typeorm';

export class ProviderUtils {
  static makeTypeormRepositoryProvider<
    Instance extends object,
    AbstractClass extends ObjectType<Instance>,
    Class extends ObjectType<Instance>
  >(provide: AbstractClass | symbol, repo: Class): Provider<Instance> {
    return {
      inject: [getConnectionToken()],
      provide,
      useFactory: (connection: Connection) =>
        getCustomRepository(repo, connection.name),
    };
  }

  static makeRedisProvider<
    Instance extends object,
    AbstractClass extends ObjectType<Instance>,
    Class extends Type<Instance>
  >(provide: AbstractClass, repo: Class): Provider<Instance> {
    return {
      provide,
      useClass: repo,
    };
  }
}
