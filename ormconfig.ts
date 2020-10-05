import { TypeormConfig } from './src/infrastructure/db/typeorm-config';
import { getConfigFromEnvironment } from './src/infrastructure/config';

module.exports = new TypeormConfig(getConfigFromEnvironment())
  .createTypeOrmOptions();
