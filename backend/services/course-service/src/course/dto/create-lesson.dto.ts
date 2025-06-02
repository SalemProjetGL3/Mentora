import { IsString, IsOptional, IsBoolean, IsEnum, IsNumber, IsArray } from 'class-validator';

export class CreateLessonDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsEnum(['video', 'text', 'image', 'quiz'])
  type: 'video' | 'text' | 'image' | 'quiz';

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  duration: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  quizId?: string;

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  order: number;
}
