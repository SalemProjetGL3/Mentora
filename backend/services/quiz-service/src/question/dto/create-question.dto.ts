import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  text: string;

  @IsNotEmpty()
  @IsEnum(['single-choice', 'multiple-choice', 'true-false'])
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}