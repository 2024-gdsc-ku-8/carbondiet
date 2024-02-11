import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('CarbonDiet API')
    .setDescription('API for CarbonDiet')
    .setVersion('1.0')
    .build();
  const docs = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, docs);
  await app.listen(3000);
}
bootstrap();
