import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true })
export class Page {
  @Prop()
  title?: string;

  @Prop()
  content?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop()
  videoUrl?: string;

  @Prop()
  quizId?: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
export type PageDocument = Page & { _id: Types.ObjectId };

@Schema({ _id: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [PageSchema], default: [] })
  pages: Types.DocumentArray<PageDocument>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
export type LessonDocument = Lesson & { _id: Types.ObjectId };

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons: Types.DocumentArray<LessonDocument>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
export type CourseDocument = Course & Document;
