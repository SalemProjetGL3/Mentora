import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule.register({
      baseURL: 'http://course-service:3003',
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}