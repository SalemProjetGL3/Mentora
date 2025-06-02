import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log('Headers:', req.headers);
          // Try cookie first
          if (req?.cookies?.token) {
            return req.cookies.token;
          }
          // Then try Authorization header
          return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, username: payload.username, role: payload.role };
  }
}