import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.token, // Explicitly type `req`
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Ensure secretOrKey is a string
    });
  }

  async validate(payload: any) {
    return { email: payload.email, username: payload.username, role: payload.role };
  }
}
