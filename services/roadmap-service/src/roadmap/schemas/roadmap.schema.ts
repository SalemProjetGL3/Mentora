// src/roadmap/roadmap.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RoadmapDocument = Roadmap & Document;

@Schema()
export class Roadmap {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  content: any;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
