import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serverPort = configService.getOrThrow<string>('SERVER_PORT');

  await app.listen(serverPort);
  Logger.log(`Back-up Batch Application running on ${serverPort} 🚀`);
}
bootstrap();
