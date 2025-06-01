import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Answer } from './answer.schema'; 

export type QuestionDocument = Question & Document;
export enum QuestionType {
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, trim: true })
  text: string;

  @Prop({ required: true, enum: ['single-choice', 'multiple-choice', 'true-false'] })
  type: string; 

  @Prop({ type: [Answer] }) 
  answers: Answer[];

  // Optional: tags, difficulty, etc.
  @Prop([String])
  tags?: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);