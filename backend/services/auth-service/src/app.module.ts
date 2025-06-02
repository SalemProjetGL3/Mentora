import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sessionConfig from './auth/config/session.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const host = config.get<string>('DB_HOST');
        const port = config.get<number>('DB_PORT');
        const username = config.get<string>('DB_USERNAME');
        const password = config.get<string>('DB_PASSWORD');
        const database = config.get<string>('DB_NAME');

        // Validate required configuration
        if (!host || !port || !username || !password || !database) {
          throw new Error(
            `Database configuration error. Missing required values:
            Host: ${host ? '✓' : '✗'}
            Port: ${port ? '✓' : '✗'}
            Username: ${username ? '✓' : '✗'}
            Password: ${password ? '✓' : '✗'}
            Database: ${database ? '✓' : '✗'}`
          );
        }

        // Create and return the database configuration
        const dbConfig: TypeOrmModuleOptions = {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
        };

        // Log configuration (without sensitive data)
        console.log('Database configuration loaded:', {
          host,
          port,
          username,
          database,
          autoLoadEntities: true,
          synchronize: true,
        });

        return dbConfig;
      },
    }),

    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
