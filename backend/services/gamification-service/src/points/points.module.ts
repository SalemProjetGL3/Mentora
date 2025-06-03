// points.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { UserRewards, UserRewardsSchema } from './schemas/user-rewards.schema';
import { Badge, BadgeSchema } from './schemas/badge.schema';
import { AuthUtilsModule } from 'auth-utils';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRewards.name, schema: UserRewardsSchema },
      { name: Badge.name, schema: BadgeSchema },
    ]),
    AuthUtilsModule, // Import AuthUtilsModule for JWT and roles guards
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
