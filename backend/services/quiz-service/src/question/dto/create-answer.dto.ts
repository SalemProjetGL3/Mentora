import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}