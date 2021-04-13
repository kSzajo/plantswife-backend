import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'https://plantswife.herokuapp.com', allowedHeaders: '*' });
  const options = new DocumentBuilder()
    .setTitle('Plantswife backend')
    .setDescription('You need to register and login to access plant endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3069);
}
bootstrap();
