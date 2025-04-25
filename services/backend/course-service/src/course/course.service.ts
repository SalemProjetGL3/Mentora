// src/course/course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const created = new this.courseModel(dto);
    return created.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
  }

  async update(id: string, dto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Course #${id} not found`);
    }
  }


  // --- Lessons Management ---
  async addLesson(courseId: string, dto: CreateLessonDto): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    // On push la nouvelle lesson dans le tableau
    course.lessons.push({
      title: dto.title,
      content: dto.content,
      images: dto.images || [],
      videoUrl: dto.videoUrl,
      quizId: dto.quizId,
    });

    await course.save();
    return course;
  }

  
  async updateLesson(courseId: string, lessonId: string, dto: UpdateLessonDto): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    // Trouver la lesson correspondante dans le tableau
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonId} not found in course #${courseId}`);
    }

    // Mettre à jour chaque champ si présent dans dto
    if (dto.title !== undefined) {
      lesson.title = dto.title;
    }
    if (dto.content !== undefined) {
      lesson.content = dto.content;
    }
    if (dto.images !== undefined) {
      lesson.images = dto.images;
    }
    if (dto.videoUrl !== undefined) {
      lesson.videoUrl = dto.videoUrl;
    }
    if (dto.quizId !== undefined) {
      lesson.quizId = dto.quizId;
    }

    await course.save();
    return course;
  }

  
  async removeLesson(courseId: string, lessonId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    // On cherche la lesson
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonId} not found in course #${courseId}`);
    }

    // On supprime la lesson du sous-document
    course.lessons.pull({ _id: lessonId }); 
    await course.save();

    return course;
  }


}
