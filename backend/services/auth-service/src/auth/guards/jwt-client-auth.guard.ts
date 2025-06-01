import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class JwtClientGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      request.error = 'Authorization header missing or malformed';
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const secret = this.configService.get<string>('JWT_EMAIL_ONLY_SECRET');
      const decoded = this.jwtService.verify(token, { secret });

      if (!decoded.email) {
        request.error = 'Invalid token payload: email missing';
        return false;
      }

      request.email = decoded.email;
      request.user = await this.usersService.findOneByEmail(decoded.email);

      if (request.user && !request.user.isVerified) {
        request.error = 'User email not verified';
        return false;
      }

      return true;
    } catch (err) {
      request.error = 'Invalid or expired token';
      return false;
    }
  }
}
