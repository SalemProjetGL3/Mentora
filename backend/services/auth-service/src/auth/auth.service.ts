import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  // Register user
  async register(email: string, password: string, username: string) {
    // Check if user already exists
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      return { errorMessage: 'User with this email already exists.' };
    }

    // Generate verification token
    const verificationToken = this.jwtService.sign(
      { email },
      { 
        secret: this.configService.get('JWT_SECRET'), 
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME') 
      }
    );

    // Hash the password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email : email,
      username : username,
      password : hashedPassword,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    await this.sendVerificationEmailToUser(user.email, verificationToken);

    // Generate a client-side token for the user
    const clientSideToken = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_EMAIL_ONLY_SECRET'),
        expiresIn: '30m' 
      }
    );

    return { 
      token: clientSideToken 
    };  
  }

  // Send verification email
  async sendVerificationEmailToUser(email: string, token?: string) {
    let user = await this.usersService.findOneByEmail(email);
    
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    // If no token is provided, generate a new one
    if (!token) {
      token = this.jwtService.sign(
        { email },
        { secret: this.configService.get('JWT_SECRET'), expiresIn: '1d' },
      );
  
      // Save the new token in the database
      await this.usersService.updateVerificationToken(email, token);
    }
  
    await this.mailerService.sendVerificationEmail(email, token);
  }
  
  // Verify email with token
  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) throw new BadRequestException('Invalid token');

      await this.usersService.markVerified(user.email);
      return { message: 'Email verified successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  // Login user
  async login(user: any) {
    if (!user) {
      return { message: 'Invalid credentials or user not found.' };
    }

    const payload = { 
      sub: user.id,  // Use numeric ID
      username: user.username, 
      email: user.email ,
      role: user.role
    };
    console.log('Payload for JWT:', payload);
    const token = this.jwtService.sign(payload);

    if (!user.isVerified) {
      console.log('User is not verified, sending email...');
      await this.sendVerificationEmailToUser(user.email, user.verificationToken);

      // Generate a client-side token for the user
      const clientSideToken = this.jwtService.sign(
        { email: user.email },
        {
          secret: this.configService.get('JWT_EMAIL_ONLY_SECRET'),
          expiresIn: '30m',
        },
      );

      return {
        errorMessage: 'User is not verified. A verification email has been sent.',
        clientSideToken: clientSideToken,
      };
    }

    console.log('User verified, generating token...');
    return {
      token: token,
    };
  }

  // Validate user credentials (for login)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // console.log('User found in validateUser:', user);

    if(!user) {
      console.log('User not found:', email);
      return null;
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      console.log('[validateUser] User is verified:', user.isVerified);
      return user; // Return the user only if they are verified
    }
    return null;
  }

  async resendVerificationEmail(user: any) {
    if (user.isVerified) {
      return { message: 'User is already verified.' };
    }

    // Resend the verification email
    await this.sendVerificationEmailToUser(user.email, user.verificationToken);

    return { message: 'Verification email has been resent.' };
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return false; // User not found
    }

    const resetToken = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h', // Token valid for 1 hour
      },
    );

    const resetUrl = `http://localhost:2000/reset-password?token=${resetToken}`;
    await this.mailerService.sendPasswordResetEmail(email, resetUrl);

    return true;
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    console.log('[resetPassword] Received token:', token);
    console.log('[resetPassword] Received new password:', newPassword);

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      console.log('[resetPassword] Token payload:', payload);

      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        console.log('[resetPassword] User not found for email:', payload.email);
        throw new BadRequestException('Invalid token');
      }

      console.log('[resetPassword] User found:', user);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log('[resetPassword] Hashed new password:', hashedPassword);

      await this.usersService.updatePassword(user.email, hashedPassword);
      console.log('[resetPassword] Password updated successfully for user:', user.email);

      return true;
    } catch (error) {
      console.error('[resetPassword] Error occurred:', error.message);
      return false; // Invalid or expired token
    }
  }
}