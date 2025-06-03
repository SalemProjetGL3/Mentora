// course.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }

  // --- Modules Management ---
  @Post(':courseId/modules')
  addModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: CreateModuleDto,
  ) {
    return this.courseService.addModule(courseId, dto);
  }

  @Patch(':courseId/modules/:moduleId')
  updateModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: UpdateModuleDto,
  ) {
    return this.courseService.updateModule(courseId, moduleId, dto);
  }

  @Delete(':courseId/modules/:moduleId')
  removeModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('moduleId', ParseIntPipe) moduleId: number,
  ) {
    return this.courseService.removeModule(courseId, moduleId);
  }

  // --- Lessons Management ---
  @Post(':courseId/modules/:moduleId/lessons')
  addLessonToModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: CreateLessonDto,
  ) {
    return this.courseService.addLessonToModule(courseId, moduleId, dto);
  }

  @Delete(':courseId/modules/:moduleId/lessons/:lessonId')
  removePageFromLesson(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.courseService.removeLessonFromModule(courseId, moduleId, lessonId);
  }

}
