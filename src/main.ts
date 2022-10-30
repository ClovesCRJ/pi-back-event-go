import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('EventsGo V1 API')
    .setDescription('Documentação da api do Sistema de Gerenciamento de Produção de Eventos desenvolvido para o Projeto Integrado (Trabalho de Conclusão de Curso) da especialização em Desenvolvimento Web Full Stack da PUC Minas Virtual pelo aluno Cloves Rodrigues Junior')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
