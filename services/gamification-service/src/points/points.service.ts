import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompletionType } from './dto/update-points.dto';
import { UserRewards } from './schemas/user-rewards.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PointsService {
    constructor(
        @InjectModel(UserRewards.name)
        private userRewardsModel: Model<UserRewards>,
        private eventEmitter: EventEmitter2,
      ) {}
    private readonly pointsMap = {
        [CompletionType.COURSE]: 100,
        [CompletionType.CHAPTER]: 25,
        [CompletionType.ASSESSMENT]: 50,
    };
    //this should be called when course is completed
    async addPoints(userId: number, type: CompletionType) {
      const amount = this.pointsMap[type] || 0;
  
      const user = await this.userRewardsModel.findOneAndUpdate(
        { userId },
        {
          $inc: { currentPoints: amount, totalPoints: amount },
        },
        { new: true, upsert: true },
      );
      //Emit event to notify leaderboard
      this.eventEmitter.emit('points.updated', {
        userId: user.userId,
      })
      return user;
    }
    async getUserPoints(userId: number) {
        const user = await this.userRewardsModel.findOne({ userId });
        if (!user) {
          throw new NotFoundException('User rewards not found');
        }
        return {
          userId: user.userId,
          currentPoints: user.currentPoints,
          totalPoints: user.totalPoints,
        };
      }
    
}
