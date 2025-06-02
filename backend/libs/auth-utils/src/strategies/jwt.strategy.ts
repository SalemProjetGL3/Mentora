import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies?.token;
          console.log('Received token:', token); // Log the token
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Ensure secretOrKey is a string
    });
  }

  async validate(payload: any) {
    console.log('Decrypted payload:', payload); 
    return { id: payload.sub, email: payload.email, username: payload.username, role: payload.role };
  }
}
