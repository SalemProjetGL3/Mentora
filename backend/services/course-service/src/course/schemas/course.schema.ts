import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class Lesson {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string;

  @Prop({ required: true, enum: ['video', 'text', 'image', 'quiz'] })
  type: 'video' | 'text' | 'image' | 'quiz';

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop()
  videoUrl?: string;

  @Prop()
  quizId?: string;

  @Prop({ required: true, default: false })
  completed: boolean;

}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
export type LessonDocument = Lesson & Document;

@Schema({ _id: false })
export class Module {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons: Types.DocumentArray<LessonDocument>;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
export type ModuleDocument = Module & Document;

@Schema()
export class Course {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  shortDescription?: string;

  @Prop({ type: [ModuleSchema], default: [] })
  modules: Types.DocumentArray<ModuleDocument>;

  @Prop({ required: true , default: '2 hours'})
  duration: string;

  @Prop({ required: true, enum: ['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'] })
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';

  @Prop({ required: true, enum: ['Frontend', 'Backend', 'Fullstack'] })
  category: 'Frontend' | 'Backend' | 'Fullstack';

  @Prop({ required: true, default: 'orange' })
  color: string;

  @Prop({ required: true })
  image: string;

  @Prop({required: true })
  apercu: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
export type CourseDocument = Course & Document;
