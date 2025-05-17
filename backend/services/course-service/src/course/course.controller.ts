// course.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreatePageDto } from './dto/create-page.dto';

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

  // --- Lessons Management ---
  @Post(':courseId/lessons')
  addLesson(
    @Param('courseId') courseId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.courseService.addLesson(courseId, dto);
  }

  @Patch(':courseId/lessons/:lessonId')
  updateLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.courseService.updateLesson(courseId, lessonId, dto);
  }

  @Delete(':courseId/lessons/:lessonId')
  removeLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.removeLesson(courseId, lessonId);
  }

  // --- Pages Management ---
  @Post(':courseId/lessons/:lessonId/pages')
  addPageToLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Body() dto: CreatePageDto,
  ) {
    return this.courseService.addPageToLesson(courseId, lessonId, dto);
  }

  @Delete(':courseId/lessons/:lessonId/pages/:pageId')
  removePageFromLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.courseService.removePageFromLesson(courseId, lessonId, pageId);
  }

}
