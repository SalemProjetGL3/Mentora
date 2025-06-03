import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Decorator data:', data);
    console.log('Request user object:', request.user);
    console.log('Request user ID:', request.user?.id);
    console.log('Request user ID type:', typeof request.user?.id);
    return data ? request.user?.[data] : request.user;
  },
);