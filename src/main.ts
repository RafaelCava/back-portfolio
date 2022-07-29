import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Api de Mensagens')
    .setDescription('API de teste para envio de mensagens')
    .setVersion('1.0')
    .setContact(
      'Rafael',
      'https://github.com/RafaelCava',
      'rafael.cavalcante@tallos.com.br',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
