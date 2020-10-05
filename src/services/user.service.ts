import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { Optional } from '../types';
import { AbstractUserRepository } from '../interfaces/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repo: AbstractUserRepository) {}

  findById(id: number): Promise<Optional<User>> {
    return this.repo.findById(id);
  }

  create(user: User): Promise<User> {
    return this.repo.createUser(user);
  }

  update(id: number, user: Partial<User>): Promise<Optional<User>> {
    return this.repo.updateUser(id, user);
  }
}
