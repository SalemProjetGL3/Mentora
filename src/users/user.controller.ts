import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint for creating a user (Registration)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Optional: Endpoint to get all users (for testing purposes)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Optional: Endpoint to get a user by email (for login)
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
