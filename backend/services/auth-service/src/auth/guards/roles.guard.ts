import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('[RolesGuard] Required roles for this route:', requiredRoles);

    if (!requiredRoles) {
      console.log('[RolesGuard] No roles required, allowing access.');
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('[RolesGuard] User making the request:', user);

    if (!user) {
      console.log('[RolesGuard] No user found in the request, denying access.');
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    if (!requiredRoles.includes(user.role)) {
      console.log(`[RolesGuard] User role "${user.role}" does not match required roles, denying access.`);
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    console.log('[RolesGuard] User role matches required roles, allowing access.');
    return true;
  }
}