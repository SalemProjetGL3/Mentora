// course.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  // --- Modules Management ---
  @Post(':courseId/modules')
  addModule(
    @Param('courseId') courseId: string,
    @Body() dto: CreateModuleDto,
  ) {
    return this.courseService.addModule(courseId, dto);
  }

  @Patch(':courseId/modules/:moduleId')
  updateModule(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Body() dto: UpdateModuleDto,
  ) {
    return this.courseService.updateModule(courseId, moduleId, dto);
  }

  @Delete(':courseId/modules/:moduleId')
  removeModule(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.courseService.removeModule(courseId, moduleId);
  }

  // --- Lessons Management ---
  @Post(':courseId/modules/:moduleId/lessons')
  addLessonToModule(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.courseService.addLessonToModule(courseId, moduleId, dto);
  }

  @Delete(':courseId/modules/:moduleId/lessons/:lessonId')
  removePageFromLesson(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.removeLessonFromModule(courseId, moduleId, lessonId);
  }

}
