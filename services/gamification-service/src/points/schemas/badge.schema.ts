import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Badge extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: "" })
  description: string;

  @Prop({ default: "" })
  icon: string;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
