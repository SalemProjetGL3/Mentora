// points.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { UserRewards, UserRewardsSchema } from './schemas/user-rewards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRewards.name, schema: UserRewardsSchema },
    ]),
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
