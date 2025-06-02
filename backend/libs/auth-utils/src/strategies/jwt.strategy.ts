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
          // Log the incoming cookies
          console.log('[JWT STRATEGY] Incoming cookies:', req?.cookies);
          const token = req?.cookies?.token;
          // Log the extracted token
          console.log('[JWT STRATEGY] Extracted token:', token);
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Ensure secretOrKey is a string
    });

    // Log the JWT secret used for verification
    console.log('[JWT STRATEGY] JWT_SECRET:', process.env.JWT_SECRET || 'defaultSecret');
  }

  async validate(payload: any) {
    // Log the decoded payload
    console.log('[JWT STRATEGY] Validating payload:', payload);
    return { id: payload.id, email: payload.email, username: payload.username, role: payload.role };
  }
}
