// src/course/schemas/course.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({_id: true}) // true pour générer un ID unique
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string; // texte principal

  @Prop({ type: [String], default: [] })
  images?: string[]; // URLs images

  @Prop()
  videoUrl?: string; // URL vidéo

  @Prop()
  quizId?: string;   // l'ID du quiz dans un autre service
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
export type LessonDocument = Lesson & Document;


@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons: Types.DocumentArray<LessonDocument>;
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
