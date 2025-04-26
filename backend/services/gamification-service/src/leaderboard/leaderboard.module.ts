import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRewards, UserRewardsSchema } from 'src/points/schemas/user-rewards.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: UserRewards.name, schema: UserRewardsSchema },
      ]),
    ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService]
})
export class LeaderboardModule {}
