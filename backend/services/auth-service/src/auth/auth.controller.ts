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
  async login(
    @Request() req,
    @Body('rememberMe') rememberMe: boolean,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(req.user);

    // Set the token in a cookie
    res.cookie('token', token.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: rememberMe
        ? 7 * 24 * 60 * 60 * 1000 // 7 days
        : 1 * 60 * 60 * 1000, // 1 hour
      path: '/',
    });

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

  // @Get('public-key')
  // getPublicKey(@Res() res: Response) {
  //   res.type('text/plain').send(process.env.JWT_PUBLIC_KEY);
  // }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Logout successful' };
  }

  // Request password reset
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const result = await this.authService.sendPasswordResetEmail(email);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Password reset email sent' };
  }

  // Reset password
  @Post('reset-password')
  async resetPassword(
    @Req() req: any,
    @Body('password') newPassword: string,
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Authorization header missing or malformed', HttpStatus.BAD_REQUEST);
    }

    const token = authHeader.split(' ')[1];
    console.log('[resetPassword] Extracted token from Authorization header:', token);

    const result = await this.authService.resetPassword(token, newPassword);
    if (!result) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
    return { message: 'Password reset successful' };
  }
}
