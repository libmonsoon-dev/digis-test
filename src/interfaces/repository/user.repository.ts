import { Optional } from '../../types';
import { User } from '../../models/user.entity';

export abstract class AbstractUserRepository {
  abstract findById(id: number): Promise<Optional<User>>;

  abstract createUser(user: User): Promise<User>;

  abstract updateUser(id: number, user: Partial<User>): Promise<Optional<User>>;
}
