// src/roadmap/roadmap.controller.ts

import { Controller, Post, Body, Req } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';

@Controller('roadmaps')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  async createRoadmap(@Body() createRoadmapDto: CreateRoadmapDto, @Req() req): Promise<any> {
    const userId = req.user.id;
    return this.roadmapService.createRoadmap(createRoadmapDto, userId);
  }
}
