import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import { Optional } from '../types';

export class ParseIntPipeFactory {
  private static instance: Optional<ParseIntPipe>;

  static get(): ParseIntPipe {
    if (!ParseIntPipeFactory.instance) {
      ParseIntPipeFactory.instance = new ParseIntPipe({
        exceptionFactory: (error) => new BadRequestException(error),
      });
    }
    return ParseIntPipeFactory.instance;
  }
}
