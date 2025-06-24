import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './helpers/filters/error-exception/error-exception.filter';

dotenv.config({path: 'backend\faalo\.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
