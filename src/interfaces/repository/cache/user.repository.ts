import { Inject } from '@nestjs/common';
import { PERSISTENT_USER_STORAGE } from '../../../providers/constants';
import { AbstractUserRepository } from '../user.repository';
import { User } from '../../../models/user.entity';
import { Optional } from '../../../types';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { plainToClass } from 'class-transformer';

export class RedisUserRepository implements AbstractUserRepository {
  private readonly client: Redis;
  readonly PATH = 'user';
  constructor(
    @Inject(PERSISTENT_USER_STORAGE)
    private readonly repo: AbstractUserRepository,
    private readonly redisService: RedisService,
  ) {
    this.client = redisService.getClient();
  }

  saveToCache(id: number, user: User) {
    return this.client.hset(this.PATH, id.toString(), JSON.stringify(user));
  }

  async getFromCache(id: number): Promise<Optional<User>> {
    const cacheUser = await this.client.hget(this.PATH, id.toString());
    if (cacheUser) {
      return plainToClass(User, JSON.parse(cacheUser) as User);
    }
  }

  async createUser(user: User): Promise<User> {
    const result = await this.repo.createUser(user);
    await this.saveToCache(result.id, result);
    return result;
  }

  async findById(id: number): Promise<Optional<User>> {
    const cacheUser = await this.getFromCache(id);
    if (cacheUser) {
      return cacheUser;
    }

    const user = await this.repo.findById(id);
    if (user) {
      await this.saveToCache(id, user);
    }
    return user;
  }

  async updateUser(id: number, user: Partial<User>): Promise<Optional<User>> {
    const result = await this.repo.updateUser(id, user);
    if (!result) {
      await this.client.hdel(id.toString());
      return;
    }
    await this.saveToCache(id, result);
    return result;
  }
}
