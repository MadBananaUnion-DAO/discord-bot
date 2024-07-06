import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);

  // Log the URL
  const url = await app.getUrl();

  Logger.log(`Application is running on: ${url}`, 'Bootstrap');
}

bootstrap();
