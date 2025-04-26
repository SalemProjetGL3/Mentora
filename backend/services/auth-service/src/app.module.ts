import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sessionConfig from './auth/config/session.config';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '../../../.env'),
        join(__dirname, '../.env'),
      ],
      load: [sessionConfig],
    }),

    // Connect to MySQL database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),

    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
