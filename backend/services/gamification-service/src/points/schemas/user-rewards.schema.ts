import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserRewards extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ default: 0 })
  currentPoints: number;

  @Prop({ default: 0 })
  totalPoints: number;

  @Prop({ default: 0 })
  streak: number;

  @Prop({ type: [String], default: [] })
  badgesIds: string[];
}

export const UserRewardsSchema = SchemaFactory.createForClass(UserRewards);
