import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { UserRewards } from 'src/points/schemas/user-rewards.schema';

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);
  private leaderboardUpdates$ = new Subject<any>();
  constructor(
    @InjectModel(UserRewards.name)
    private userRewardsModel: Model<UserRewards>,
  ) {}

  async getLeaderboard(limit = 5) {
    return this.userRewardsModel
      .find()
      .sort({ totalPoints: -1 }) 
      .limit(limit)
      .exec();
  }

  @OnEvent('points.updated')
  async handlePointsUpdated(payload: { userId: number }) {
    this.logger.log(`Leaderboard triggered for user: ${payload.userId}`);
    // Re-query top 10 users after update
    const top5 = await this.getLeaderboard(5);
    this.leaderboardUpdates$.next(top5);
  }
  
  // Method to get leaderboard updates as an observable
  getLeaderboardUpdates() {
    return this.leaderboardUpdates$.asObservable();
  }
}
