import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
  app.enableCors({
    origin: 'http://localhost:2000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Add Authorization if you use it
    credentials: true, // If you need to send cookies or authorization headers
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3006);

  console.log(`Quiz Service is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
