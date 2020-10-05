import { Provider } from '@nestjs/common';
import { Config } from '../models/config';
import { getConfigFromEnvironment } from '../infrastructure/config';

export const configProvider: Provider = {
  provide: Config,
  useFactory: getConfigFromEnvironment,
};
