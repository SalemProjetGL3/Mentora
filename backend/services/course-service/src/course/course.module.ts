// src/course/course.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './schemas/course.schema';
import { IdGeneratorService } from '../shared/id-generator.service';
import { Counter, CounterSchema } from '../shared/schemas/counter.schema';
import { AuthUtilsModule } from 'auth-utils';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
    AuthUtilsModule, // Import AuthUtilsModule for JWT and roles guards
  ],
  controllers: [CourseController],
  providers: [CourseService, IdGeneratorService],
  exports: [CourseService], // export si ProgressService en a besoin
})
export class CourseModule {}
