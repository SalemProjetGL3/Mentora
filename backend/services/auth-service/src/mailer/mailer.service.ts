import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), 
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  // Function to send verification email
  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `http://localhost:2000/verify-email?token=${token}`;
    
    // Read the HTML template from file
    const templatePath = path.join('src/mailer/templates', 'verify-email.html');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Replace the placeholder with actual URL
    const emailContent = template.replace('{{verification_url}}', verificationUrl);

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject: 'Verify Your Email',
      html: emailContent,  // Pass the dynamic email content
    };

    await this.transporter.sendMail(mailOptions);
  }

  // Function to send password reset email
  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const emailContent = `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject: 'Password Reset Request',
      html: emailContent,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
