import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Set up the session middleware
    session({
      secret: 'your-secret-key', // Use an environment variable for secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000, // Session will expire in 1 hour
      },
    })(req, res, next);
  }
}
