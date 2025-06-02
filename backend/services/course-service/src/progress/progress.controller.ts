// src/progress/progress.controller.ts
import { Controller, Get, Patch, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard, RolesGuard, Roles } from 'auth-utils';

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('/:courseId')
  getUserProgress(
    @Req() req: any,
    @Param('courseId') courseId: string,
  ) {
    const userId = req.user.id;
    return this.progressService.getUserProgress(userId, courseId);
  }

  @Patch(':courseId')
  updateProgress(
    @Req() req: any,
    @Param('courseId') courseId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    const userId = req.user.id;
    return this.progressService.updateProgress(userId, courseId, dto);
  }

  @Post('init')
  async initProgress(@Body() dto: { courseId: string }, @Req() req: any) {
    const userId = req.user.id;
    return this.progressService.initProgress(userId, dto.courseId);
  }

}
