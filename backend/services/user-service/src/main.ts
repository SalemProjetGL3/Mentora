import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  
  app.enableCors({
    origin: ['http://localhost:2000'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'x-apollo-operation-name', 
      'apollo-require-preflight', 
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
  });

  await app.listen(3002);
}
bootstrap();
