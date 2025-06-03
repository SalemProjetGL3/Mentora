// src/course/course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { IdGeneratorService } from 'src/shared/id-generator.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private idGeneratorService: IdGeneratorService,
  ) {}


  async create(dto: CreateCourseDto): Promise<Course> {
    const courseId = await this.idGeneratorService.getNextId('courses');
    const courseData = {
      ...dto,
      id: courseId,
      modules: await Promise.all(
        (dto.modules?.map(async (module, i) => ({
          ...module,
          id: await this.idGeneratorService.getNextId('modules'),
          lessons: await Promise.all(
            (module.lessons?.map(async (lesson, j) => ({
              ...lesson,
              id: await this.idGeneratorService.getNextId('lessons'),
            })) || [])
          ),
        })) || [])
      ),
    };
    const created = new this.courseModel(courseData);
    return created.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseModel.findOne({ id }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel
      .findOneAndUpdate({ id }, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.courseModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Course #${id} not found`);
    }
  }


  // --- Modules Management ---
  async addModule(courseId: number, dto: CreateModuleDto): Promise<Course> {
    const course = await this.courseModel.findOne({ id: courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    course.modules.push({
      ...dto,
      id: await this.idGeneratorService.getNextId('modules'),
      lessons: await Promise.all((dto.lessons?.map(async lesson => ({
        ...lesson,
        id: await this.idGeneratorService.getNextId('lessons'),
      })) || [])),
    });

    await course.save();
    return course;
  }

  
  async updateModule(courseId: number, moduleId: number, dto: UpdateModuleDto): Promise<Course> {
    const course = await this.courseModel.findOne({ id: courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    // Trouver la lesson correspondante dans le tableau
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
      throw new NotFoundException(`Module #${moduleId} not found in course #${moduleId}`);
    }

    if (dto.title !== undefined) {
      module.title = dto.title;
    }
  
    if (dto.lessons !== undefined) {
      module.set('lessons', dto.lessons);
    }    

    await course.save();
    return course;
  }

  
  async removeModule(courseId: number, moduleId: number): Promise<Course> {
    const course = await this.courseModel.findOne({ id: courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    // On cherche le module
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
      throw new NotFoundException(`Module #${moduleId} not found in course #${courseId}`);
    }
    course.modules.pull(module);

    await course.save();
    return course;
  }

  // --- Lessons Management ---
  async addLessonToModule(courseId: number, moduleId: number, lessonDto: CreateLessonDto): Promise<Course> {
    const course = await this.courseModel.findOne({ id: courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }
  
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
      throw new NotFoundException(`Module #${moduleId} not found in course #${courseId}`);
    }
  
     module.lessons.push({
      ...lessonDto,
      id: await this.idGeneratorService.getNextId('lessons'),
    });

    await course.save();
    return course;
  }

  async removeLessonFromModule(courseId: number, moduleId: number, lessonId: number): Promise<Course> {
    const course = await this.courseModel.findOne({ id: courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }
  
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
      throw new NotFoundException(`Module #${moduleId} not found in course #${courseId}`);
    }
  
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonId} not found in module #${moduleId}`);
    }
  
    module.lessons.pull(lesson);
    await course.save();
    return course;
  }
  
}
