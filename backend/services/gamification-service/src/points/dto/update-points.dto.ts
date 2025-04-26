import { IsEnum, IsNumber, IsString } from '@nestjs/class-validator'

export enum CompletionType {
  COURSE = 'course',
  CHAPTER = 'chapter',
  ASSESSMENT = 'assessment',
}

export class UpdatePointsDto {
  @IsNumber()
  userId: number;

  @IsEnum(CompletionType)
  type: CompletionType;

  @IsString()
  resourceId: string;
}
