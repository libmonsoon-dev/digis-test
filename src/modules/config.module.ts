import { Module } from '@nestjs/common';
import { configProvider } from '../providers/config.provider';
import { Config } from '../models/config';

@Module({
  providers: [configProvider],
  exports: [Config],
})
export class ConfigModule {}
