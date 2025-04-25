import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class UserInventory extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ type: [{ type: Number, ref: 'ShopItem' }], default: [] })
  ownedItems: Number[]; // References to ShopItems

  @Prop()
  activeNickname?: string;

  @Prop()
  activeAvatar?: string; // URL of selected avatar
}

export const UserInventorySchema = SchemaFactory.createForClass(UserInventory);
