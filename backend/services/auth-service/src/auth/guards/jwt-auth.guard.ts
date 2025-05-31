import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Extract the token from the cookies
    const token = request.cookies?.token;
    console.log('[JwtAuthGuard] Token from cookie:', token);

    if (!token) {
      console.log('[JwtAuthGuard] No token found in cookies.');
      return false;
    }

    try {
      // Verify the token
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      console.log('[JwtAuthGuard] User decoded from token:', request.user);
      return true;
    } catch (err) {
      console.log('[JwtAuthGuard] Token verification failed:', err);
      return false;
    }
  }
}
