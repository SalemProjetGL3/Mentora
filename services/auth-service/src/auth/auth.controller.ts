import { Controller, Post, Body, UseGuards, Request, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // Used for validating user credentials

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
  async register(@Body() body: { email: string; password: string; username: string }) {
    return this.authService.register(body.email, body.password, body.username);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
