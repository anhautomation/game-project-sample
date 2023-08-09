import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Powerball Game')
    .setDescription('Powerball Game APIs')
    .setVersion(configService.get<string>('app_version'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(configService.get<string>('app_port'));
}
bootstrap();
