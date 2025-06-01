import { Module, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { UsersModule } from '../users/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionMiddleware } from './middlewares/session.middleware';
import { SessionSerializer } from './serializers/session.serializer';
import { MailerModule } from '../mailer/mailer.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    // ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }), 
    UsersModule,
    MailerModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the session middleware globally within the auth module
    consumer.apply(SessionMiddleware).forRoutes('auth/*');
  }
}
