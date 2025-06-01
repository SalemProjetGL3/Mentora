import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsOptional, IsArray, IsBoolean } from 'class-validator'; // Add validators as needed

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(3)
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  company?: string;
  
  @Field()
  @IsString() // Or an enum
  role: string; // e.g., 'USER', 'MENTOR'

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @Field(() => [String], { nullable: 'itemsAndList', defaultValue: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enrolledCourseIds?: string[];
}