import { Controller, Post, Body, UseGuards, Request, Query, Get, Req, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; 
import { Response } from 'express'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login endpoint (No DTO needed)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    // Await the result of the login method
    const token = await this.authService.login(req.user);

    // Check if the token object contains a 'token' property
    if (token.token) {
      res.cookie('token', token.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', 
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return token;
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

  @Get('public-key')
  getPublicKey(@Res() res: Response) {
    res.type('text/plain').send(process.env.JWT_PUBLIC_KEY);
  }
}
