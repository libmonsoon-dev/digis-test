import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './infrastructure/db/typeorm-config';
import { ConfigModule } from './modules/config.module';
import { RedisModule } from 'nestjs-redis';
import { Config } from './models/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      imports: [ConfigModule],
    }),
    RedisModule.forRootAsync({
      useFactory: (config: Config) => ({
        host: config.CACHE_HOST,
        port: config.CACHE_PORT,
      }),
      imports: [ConfigModule],
      inject: [Config],
    }),
    UserModule,
  ],
})
export class AppModule {}
