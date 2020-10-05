import { User } from '../../../models/user.entity';
import { EntityRepository, Repository } from 'typeorm/index';
import { AbstractUserRepository } from '../user.repository';
import { Optional } from '../../../types';

@EntityRepository(User)
export class PostgresUserRepository
  extends Repository<User>
  implements AbstractUserRepository {
  findById(id: number): Promise<Optional<User>> {
    return this.findOne({ id });
  }

  async createUser(user: User): Promise<User> {
    const result = await this.insert(user);
    return { ...user, id: result.identifiers[0].id };
  }

  async updateUser(id: number, user: Partial<User>): Promise<Optional<User>> {
    const result = await this.update(id, user);
    return this.findById(id);
  }
}
