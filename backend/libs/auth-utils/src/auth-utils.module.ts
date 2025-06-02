import { Module, OnModuleInit } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  providers: [
    ConfigService,
    {
      provide: JwtStrategy,
      useFactory: (configService: ConfigService) => {
        return new JwtStrategy(configService);
      },
      inject: [ConfigService],
    },
    GqlAuthGuard
  ],
  exports: [JwtStrategy, ConfigService, GqlAuthGuard],
})
export class AuthUtilsModule implements OnModuleInit {
  onModuleInit() {
    console.log('AuthUtilsModule initialized');
  }
}