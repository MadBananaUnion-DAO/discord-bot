import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors: CorsOptions = {
    origin: ['http://localhost:3000', 'https://madbananaunion.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.enableCors(cors);

  const port = 3000;
  await app.listen(port);

  // Log the URL
  const url = await app.getUrl();

  Logger.log(`Bananas Go Boom Thru: ${url}`, 'Banana Bombstrapped');
}

bootstrap();
