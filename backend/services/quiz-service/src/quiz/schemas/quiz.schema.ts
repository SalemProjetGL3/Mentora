import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Question } from '../../question/schemas/question.schema'; 

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Question' }])
  questionIds: MongooseSchema.Types.ObjectId[];

  // Optional: category, difficulty level, etc.
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);