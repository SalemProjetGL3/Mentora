import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
  console.log('Setting roles metadata:', roles);
  return SetMetadata('roles', roles);
};