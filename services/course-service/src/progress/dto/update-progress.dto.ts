// src/progress/dto/update-progress.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsString()
  completedLessonId?: string;
}
