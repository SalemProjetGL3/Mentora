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
    let progress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (!progress) {
      progress = new this.progressModel({
        userId,
        courseId,
        startedAt: new Date(),
        completedPages: [],
        completedLessons: [],
        completedAssessments: [],
      });
    }
  
    // Ajouter la page complétée
    if (dto.completedPageId && !progress.completedPages.includes(dto.completedPageId)) {
      progress.completedPages.push(dto.completedPageId);
    }
  
    // Ajouter le quiz complété
    if (dto.completedAssessmentId && !progress.completedAssessments.includes(dto.completedAssessmentId)) {
      progress.completedAssessments.push(dto.completedAssessmentId);
    }
  
    // Charger le cours pour recalculer la progression
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }
  
    // Réinitialiser les leçons complétées
    progress.completedLessons = [];
  
    for (const lesson of course.lessons) {
      const allPageIds = lesson.pages.map(p => p._id.toString());
      const allPagesCompleted = allPageIds.every(pid => progress.completedPages.includes(pid));
      if (allPagesCompleted) {
        progress.completedLessons.push(lesson._id.toString());
      }
    }
  
    // Calcul du taux de progression :
    const totalUnits = course.lessons.length + progress.completedAssessments.length; // 1 unité par leçon + 1 par quiz complété
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

  async initProgress(userId: string, courseId: string): Promise<Progress> {
    let progress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (!progress) {
      progress = new this.progressModel({
        userId,
        courseId,
        completedLessons: [],
        completedAssessments: [],
        progressRate: 0,
        startedAt: new Date(),
      });
      await progress.save();
    }
    return progress;
  }
  
}
