import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { UpdatePointsDto } from './dto/update-points.dto';
import { JwtAuthGuard, User } from 'auth-utils';

@Controller('points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}
    //called by course frontend when course/assessement/chapter completed
    @Post('update')
    updatePoints(@Body() body: UpdatePointsDto) {
      return this.pointsService.addPoints(body.userId, body.type);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    getUserPoints(@User('id') userId: number) {
      if (!userId) {
        throw new BadRequestException('User ID is missing');
      }
      return this.pointsService.getUserPoints(Number(userId));
    }
}
    