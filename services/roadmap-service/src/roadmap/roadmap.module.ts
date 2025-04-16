import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Roadmap, RoadmapSchema } from './schemas/roadmap.schema';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './roadmap.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roadmap.name, schema: RoadmapSchema }
    ]),
  ],
  providers: [RoadmapService],
  controllers: [RoadmapController],
})
export class RoadmapModule {}
