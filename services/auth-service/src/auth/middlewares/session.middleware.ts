import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    session({
      secret: this.configService.get<string>('session.secret'), 
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000, 
      },
    })(req, res, next);
  }
}