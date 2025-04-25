// points.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { UserRewards, UserRewardsSchema } from './schemas/user-rewards.schema';
import { Badge, BadgeSchema } from './schemas/badge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRewards.name, schema: UserRewardsSchema },
      { name: Badge.name, schema: BadgeSchema },
    ]),
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
