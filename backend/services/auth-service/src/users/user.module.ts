import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUtilsModule } from 'auth-utils';

@Module({
  imports: [
    AuthUtilsModule, // Importing AuthUtilsModule for JWT and roles decorators
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporting for use in AuthModule
})
export class UsersModule {}
