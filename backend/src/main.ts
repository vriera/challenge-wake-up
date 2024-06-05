import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions/global-expections.filter';
import { TypeOrmExceptionFilter } from './exceptions/query-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Example API')
  .setDescription('The example API description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  // Change the Swagger path here
  SwaggerModule.setup('/spec', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new TypeOrmExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
