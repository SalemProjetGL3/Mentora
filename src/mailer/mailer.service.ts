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
      service: 'gmail', // Change if using another service
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), 
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  // Function to send verification email
  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
    
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
}
