import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard, RolesGuard, Roles } from 'auth-utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint for creating a user (Registration)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Optional: Endpoint to get all users (for testing purposes)
  // @Roles('ADMIN') 
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Optional: Endpoint to get a user by email (for login)
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('delete/:email')
  async deleteUser(@Param('email') email: string) {
    return this.usersService.deleteUser(email);
  }
  
}
