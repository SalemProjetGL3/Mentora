import { Controller, Post, Body, UseGuards, Request, Query, Get, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; 
import { JwtClientGuard } from './guards/jwt-client-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login endpoint (No DTO needed)
  @UseGuards(LocalAuthGuard) 
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

  @UseGuards(JwtClientGuard) 
  @Post('resend-verification')
  async resendVerification(@Req() req: any) {
    const user = req.user; 
    console.log('User from JWT:', user);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.authService.resendVerificationEmail(user);
    return result;
  }

  // Me endpoint
  @UseGuards(JwtClientGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    const user = req.user;
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return { user };
  }
}
