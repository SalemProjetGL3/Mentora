import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: true }) // Mongoose will add _id automatically
export class Answer extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: false })
  isCorrect: boolean;
}

