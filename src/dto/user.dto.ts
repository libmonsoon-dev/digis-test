import { User } from '../models/user.entity';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Gender, GENDERS } from '../models/gender';
import {
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@Exclude()
export class GetUserDto {
  @Expose()
  id!: number;

  @Expose()
  fullName!: string;

  @Expose()
  dob!: string;

  @Expose()
  gender!: Gender;

  static from(user: User): GetUserDto {
    return plainToClass(GetUserDto, user);
  }
}

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @MaxLength(100)
  fullName!: string;

  @Expose()
  @IsISO8601({ strict: true })
  dob!: string;

  @Expose()
  @IsIn(GENDERS)
  gender!: Gender;

  toUser(): User {
    return plainToClass(User, this);
  }
}

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  fullName?: string;

  @Expose()
  @IsISO8601({ strict: true })
  @IsOptional()
  dob?: string;

  @Expose()
  @IsIn(GENDERS)
  @IsOptional()
  gender?: Gender;

  toUser(): User {
    return plainToClass(User, this);
  }
}
