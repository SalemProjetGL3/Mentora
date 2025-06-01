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
    const progress = await this.progressModel.findOne({ userId, courseId: Number(courseId) }).exec();
    if (!progress) {
      let newprogress= this.initProgress(userId, courseId); 
      return newprogress;
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
        completedLessons: [],
        completedModules: [],
        completedAssessments: [],
        progressRate: 0
      });
    }
  
    // Ajouter la page complétée
    if (dto.completedLessonId && !progress.completedLessons.includes(dto.completedLessonId)) {
      progress.completedLessons.push(dto.completedLessonId);
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
  
    // Réinitialiser les module complétées
    progress.completedModules = [];
  
    for (const module of course.modules) {
      const allLessonIds = module.lessons.map(l => l.id.toString());
      const allLessonsCompleted = allLessonIds.every(pid => progress.completedLessons.includes(pid));
      if (allLessonsCompleted) {
        progress.completedLessons.push(module.id.toString());
      }
    }
  
    // Calcul du taux de progression :
    const totalUnits = course.modules.length + progress.completedAssessments.length; // 1 unité par module + 1 par quiz complété
    const completedUnits = progress.completedModules.length + progress.completedAssessments.length;
  
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
        completedModules: [],
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
