import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class Config {
  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @Expose()
  @IsInt()
  DB_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  CACHE_HOST!: string;

  @Expose()
  @IsInt()
  CACHE_PORT!: number;
}
