import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';
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
    if (existingUser) throw new BadRequestException('Email already in use');

    // Generate verification token
    const verificationToken = this.jwtService.sign(
      { email },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '1d' },
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

    return { message: 'Registration successful. Please check your email.' };
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
  
    if (!user.isVerified) {
      console.log('User is not verified, sending email...');
      await this.sendVerificationEmailToUser(user.email, user.verificationToken);
      return {
        message: 'User is not verified. A verification email has been sent.',
      };
    }
  
    console.log('User verified, generating token...');
    const payload = { username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate user credentials (for login)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('User found in validateUser:', user);

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
}