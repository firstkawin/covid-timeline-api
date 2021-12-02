import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ validationError: { target: false } }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  await app.listen(port);
  console.log(`running on port::${port}`);
}
bootstrap();
