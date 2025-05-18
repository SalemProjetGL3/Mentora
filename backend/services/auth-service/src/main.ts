import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true, 
  });
  
  const configService = app.get(ConfigService);
  const sessionSecret = configService.get<string>('SESSION_SECRET'); 

  if (!sessionSecret) {
    throw new Error('SESSION_SECRET is not defined in the environment variables.');
  }

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

  console.log('Initializing middleware...');
  console.log(`CORS enabled for origin: ${process.env.CORS_ORIGIN || 'http://localhost:2000'}`);

  try {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on port ${process.env.PORT ?? 3000}`);
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

bootstrap();
