import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItem } from './schema/shop-item.schema';
import { UserRewards } from 'src/points/schemas/user-rewards.schema';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}
    @Get()
    getShopItems() {
        return this.shopService.getShopItems();
    }
    @Get(':id')
    getShopItemById(@Param('id') itemId: number) {
        return this.shopService.getShopItemById(+itemId);
    }
    @Get('user/:userId')
    getUserInventory(@Param('userId') userId: string) {
        return this.shopService.getUserInventory(userId);
    }
    @Delete(':id')
    deleteShopItem(@Param('id') itemId: number) {
        return this.shopService.deleteShopItem(+itemId);
    }
    @Post('add')
    addShopItem(@Body() item: Partial<ShopItem>) {
        return this.shopService.addShopItem(item);
    }
    @Post('buy/:itemId')
    buyShopItem(@Param('itemId') itemId: number, @Body('userId') userId: number) {
        return this.shopService.buyShopItem(+itemId, userId);
    }

}
