import { Module, OnModuleInit } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthUtilsModule implements OnModuleInit {
  onModuleInit() {
    console.log('AuthUtilsModule initialized');
  }
}