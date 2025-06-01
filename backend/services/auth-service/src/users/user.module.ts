import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUtilsModule } from 'auth-utils';

@Module({
  imports: [
    AuthUtilsModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
