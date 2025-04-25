import { IsString, MinLength } from 'class-validator';

export class CreateRoadmapDto {
  @IsString()
  @MinLength(10)
  prompt: string;
}
