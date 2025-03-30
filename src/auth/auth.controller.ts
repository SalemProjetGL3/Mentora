import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // Used for validating user credentials
import { CreateUserDto } from '../users/dto/create-user.dto'; // Importing DTO for registration

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login endpoint (No DTO needed)
  @UseGuards(LocalAuthGuard) // Guard that validates user credentials (email, password)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); // req.user will contain user data from the LocalAuthGuard
  }

  // Register endpoint (Requires CreateUserDto)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
