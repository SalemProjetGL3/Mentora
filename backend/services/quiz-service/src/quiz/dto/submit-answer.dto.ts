import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class SubmittedAnswerDto {
  @IsNotEmpty()
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsMongoId({ each: true }) 
  selectedAnswerIds: string[];
}

export class QuizSubmissionDto {
  @IsArray()
  @Type(() => SubmittedAnswerDto)
  @ValidateNested({ each: true })
  answers: SubmittedAnswerDto[];
}