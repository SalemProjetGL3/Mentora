import { IsString, IsEmail, MinLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  verificationToken: string;
}
