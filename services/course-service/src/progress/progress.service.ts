// src/progress/progress.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { Course, CourseDocument } from '../course/schemas/course.schema';
import { Model } from 'mongoose';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async getUserProgress(userId: string, courseId: string): Promise<Progress> {
    const progress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (!progress) {
      throw new NotFoundException(`No progress found for user ${userId} on course ${courseId}`);
    }
    return progress;
  }

  async updateProgress(
    userId: string,
    courseId: string,
    dto: UpdateProgressDto
  ): Promise<Progress> {
    // Récupérer ou créer le document progress
    let progress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (!progress) {
      progress = new this.progressModel({
        userId,
        courseId,
        startedAt: new Date(),
        completedLessons: [],
        completedAssessments: [],
      });
    }

    // Ajouter la leçon terminée
    if (dto.completedLessonId) {
      if (!progress.completedLessons.includes(dto.completedLessonId)) {
        progress.completedLessons.push(dto.completedLessonId);
      }
    }

    // Ajouter l'évaluation (quiz) terminée
    if (dto.completedAssessmentId) {
      if (!progress.completedAssessments.includes(dto.completedAssessmentId)) {
        progress.completedAssessments.push(dto.completedAssessmentId);
      }
    }

    // Recalcul du taux de progression
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    const totalUnits = course.lessons.reduce((acc, lesson) => {
      return acc + 1 + (lesson.quizId ? 1 : 0);
    }, 0);
  
    // Les unités complétées sont celles des leçons et des évaluations
    const completedUnits = progress.completedLessons.length + progress.completedAssessments.length;
  
    let newRate = 0;
    if (totalUnits > 0) {
      newRate = Math.round((completedUnits / totalUnits) * 100);
    }
    progress.progressRate = newRate;
  
    if (newRate === 100 && !progress.finishedAt) {
      progress.finishedAt = new Date();
    }
  
    await progress.save();
    return progress;
  }
}
