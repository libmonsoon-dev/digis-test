import { validate, validateSync, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class ValidationUtils {
  static async validate(...objects: object[]): Promise<void> {
    await Promise.all(objects.map(ValidationUtils.validateOne));
  }

  static validateSync(object: object): void {
    const errors = validateSync(object);
    if (errors.length > 0) {
      ValidationUtils.validateNested(errors);
    }
  }

  static async validateOne(object: object): Promise<void> {
    const errors = await validate(object);
    if (errors.length > 0) {
      ValidationUtils.validateNested(errors);
    }
  }

  static validateNested(errors: ValidationError[]): void {
    if (errors.length > 0) {
      const firstError = errors[0];
      for (const key in firstError.constraints) {
        if (firstError.constraints?.hasOwnProperty(key)) {
          const childValue = firstError.constraints[key];
          // TODO add custom error handling
          throw new BadRequestException(
            `${firstError.property}: ${childValue}`,
          );
        }
      }
      if (firstError && firstError.children && firstError.children.length > 0) {
        return this.validateNested(firstError.children);
      }
      throw new BadRequestException('Validation error');
    }
    return;
  }
}
