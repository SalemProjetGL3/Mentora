import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRewards, UserRewardsSchema } from 'src/points/schemas/user-rewards.schema';
import { AuthUtilsModule } from 'auth-utils';


@Module({
  imports: [
      MongooseModule.forFeature([
        { name: UserRewards.name, schema: UserRewardsSchema },
      ]),
      AuthUtilsModule, // Import AuthUtilsModule for JWT and roles guards
    ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService]
})
export class LeaderboardModule {}
