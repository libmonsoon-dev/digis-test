import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { applySwagger } from './swagger';

export class AppFactory {
  static async create(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);

    applySwagger(app);
    app.setGlobalPrefix('api');

    // validate input parameters (query, boyd...)
    app.useGlobalPipes(new ValidationPipe());

    return app.init();
  }
}
