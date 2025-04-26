import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ShopItem extends Document {
  @Prop({ required: true })
  itemId: number; 
  
  @Prop({ required: true })
  itemName: string; 

  @Prop({ required: true, enum: ['nickname', 'avatar'] })
  type: 'nickname' | 'avatar';

  @Prop({ required: true })
  cost: number; // in points

  @Prop()
  imageUrl: string; // for avatars only

  @Prop()
  description: string;
}

export const ShopItemSchema = SchemaFactory.createForClass(ShopItem);
