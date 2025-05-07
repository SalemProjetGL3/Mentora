import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePageDto } from './create-page.dto';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePageDto)
  pages?: CreatePageDto[];
}
