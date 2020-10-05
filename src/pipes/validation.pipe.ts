import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationUtils } from '../utils/validation-utils';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private static ignoreTypes: Set<Type<unknown>> = new Set([
    String,
    Boolean,
    Number,
    Array,
    Object,
  ]);

  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    await ValidationUtils.validate(object);
    return object;
  }

  toValidate(metatype: Type<unknown>): boolean {
    return !ValidationPipe.ignoreTypes.has(metatype);
  }
}
