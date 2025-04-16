import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PointsService } from './points.service';
import { UpdatePointsDto } from './dto/update-points.dto';

@Controller('points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}
    //called by course frontend when course/assessement/chapter completed
    @Post('update')
    updatePoints(@Body() body: UpdatePointsDto) {
      return this.pointsService.addPoints(body.userId, body.type);
    }
 
    @Get(':userId')
    getUserPoints(@Param('userId') userId: string) {
        return this.pointsService.getUserPoints(Number(userId));
    }
}
    