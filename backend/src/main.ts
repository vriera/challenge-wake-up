import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions/global-expections.filter';
import { TypeOrmExceptionFilter } from './exceptions/query-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('TableScript API')
    .setDescription('REST API for the TablesScript webpage')
    .setVersion('1.0')
    .setBasePath('/spec')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new TypeOrmExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter());
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
