import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsArray()
  @IsMongoId({ each: true, message: 'Each questionId must be a valid MongoDB ObjectId' })
  questionIds: string[]; 
}