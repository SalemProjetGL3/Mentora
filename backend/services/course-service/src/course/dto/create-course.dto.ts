import { IsString, IsEnum, IsNumber, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateModuleDto } from './create-module.dto';

export class CreateCourseDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModuleDto)
  modules: CreateModuleDto[];

  @IsString()
  duration: string;

  @IsEnum(['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'])
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';

  @IsEnum(['Frontend', 'Backend', 'Fullstack'])
  category: 'Frontend' | 'Backend' | 'Fullstack';

  @IsString()
  image: string;

  @IsString()
  apercu: string;

  @IsString()
  color: string;
}
