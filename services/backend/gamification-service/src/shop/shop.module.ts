import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopItem, ShopItemSchema } from './schema/shop-item.schema';
import { UserInventory, UserInventorySchema } from './schema/user-inventory.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: ShopItem.name, schema: ShopItemSchema },
        { name: UserInventory.name, schema: UserInventorySchema }, 
        { name: 'UserRewards', schema: UserInventorySchema }, // Assuming UserRewards schema is similar to UserInventory
      ]),
    ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
