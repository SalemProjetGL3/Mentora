// src/progress/progress.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress, ProgressSchema } from './schemas/progress.schema';
// On a besoin d'accéder au Course pour calculer la progression
import { Course, CourseSchema } from '../course/schemas/course.schema';
import { AuthUtilsModule } from 'auth-utils'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    AuthUtilsModule, 
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
