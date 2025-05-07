import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:2000', 
    credentials: true, 
  });
  
  const configService = app.get(ConfigService);
  const sessionSecret = configService.get<string>('SESSION_SECRET'); 

  // Enable session middleware
  app.use(
    session({
      secret: sessionSecret,
      resave: false, 
      saveUninitialized: false,
      cookie: { secure: false }, 
    }),
  );

  // Initialize Passport.js middleware
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
