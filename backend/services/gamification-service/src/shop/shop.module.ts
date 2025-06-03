import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopItem, ShopItemSchema } from './schema/shop-item.schema';
import { UserInventory, UserInventorySchema } from './schema/user-inventory.schema';
import { AuthUtilsModule } from 'auth-utils';


@Module({
    imports: [
      MongooseModule.forFeature([
        { name: ShopItem.name, schema: ShopItemSchema },
        { name: UserInventory.name, schema: UserInventorySchema }, 
        { name: 'UserRewards', schema: UserInventorySchema }, // Assuming UserRewards schema is similar to UserInventory
      ]),
      AuthUtilsModule, // Import AuthUtilsModule for JWT and roles guards
    ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
