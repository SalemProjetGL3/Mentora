import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import 'reflect-metadata';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Ensure `user` is defined
    if (!user) {
      throw new HttpException('User not found in request', HttpStatus.FORBIDDEN);
    }

    console.log('Decrypted JWT payload:', user);

    const roles = user.role; // Ensure `roles` is defined
    console.log('Roles received:', roles);

    // Directly retrieve metadata from the handler without using Reflector
    const requiredRoles = Reflect.getMetadata('roles', context.getHandler());
    console.log('Roles required:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const hasRole = requiredRoles.some((role: string) => roles?.includes(role));
    if (!hasRole) {
      console.error('Forbidden: You do not have the required roles');
      return false;
    }

    return true;
  }
}