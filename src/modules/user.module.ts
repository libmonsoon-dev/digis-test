import { Module } from '@nestjs/common';
import { userProviders } from '../providers/user.provider';
import { UserService } from '../services/user.service';
import { UserController } from '../interfaces/http/rest/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: userProviders,
  exports: [UserService],
})
export class UserModule {}
