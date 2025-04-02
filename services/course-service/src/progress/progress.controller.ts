// src/progress/progress.controller.ts
import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get(':userId/:courseId')
  getUserProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.progressService.getUserProgress(userId, courseId);
  }

  @Patch(':userId/:courseId')
  updateProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress(userId, courseId, dto);
  }
}
