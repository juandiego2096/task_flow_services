import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>('SERVICE_PORT', 3000), '0.0.0.0');
}
bootstrap();
