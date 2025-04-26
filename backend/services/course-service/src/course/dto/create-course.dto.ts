// src/course/dto/create-course.dto.ts
import { IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CreateLessonDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  quizId?: string;
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  lessons?: CreateLessonDto[];
}
