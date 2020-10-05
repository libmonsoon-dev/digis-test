import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

export const createSwaggerDocument: (app: INestApplication) => OpenAPIObject = (
  app,
) => {
  const options = new DocumentBuilder()
    .setTitle('digis-test')
    .setDescription('TODO')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, options);
};

export const applySwagger: (app: INestApplication) => void = (app) => {
  const document = createSwaggerDocument(app);
  SwaggerModule.setup('swagger', app, document);
};
