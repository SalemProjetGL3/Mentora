import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'http://localhost:2000', 
    methods: ['GET'],
  });
  await app.listen(process.env.PORT ?? 3009);
}
bootstrap();
