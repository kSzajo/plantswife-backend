import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FlowerService } from './flower/flower.service';
import { FlowerController } from './flower/flower.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
