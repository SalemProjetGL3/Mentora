// src/progress/schemas/progress.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Progress extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ type: [String], default: [] })
  completedLessons: string[];

  // Taux de progression (0-100)
  @Prop({ default: 0 })
  progressRate: number;

  @Prop()
  startedAt?: Date;

  @Prop()
  finishedAt?: Date;
}

export type ProgressDocument = Progress & Document;

export const ProgressSchema = SchemaFactory.createForClass(Progress);
