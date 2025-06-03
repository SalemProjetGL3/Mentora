import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItem } from './schema/shop-item.schema';
import { JwtAuthGuard, User } from 'auth-utils';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}
    @Get('user')
    @UseGuards(JwtAuthGuard)
    getUserInventory(@User('id', ParseIntPipe) userId: number) {
        console.log('[shop] User ID from decorator:', userId);
        return this.shopService.getUserInventory(userId);
    }
    @Get(':id')
    getShopItemById(@Param('id', ParseIntPipe) itemId: number) {
        return this.shopService.getShopItemById(itemId);
    }
    @Get()
    getShopItems() {
        return this.shopService.getShopItems();
    }
    @Delete(':id')
    deleteShopItem(@Param('id', ParseIntPipe) itemId: number) {
        return this.shopService.deleteShopItem(itemId);
    }
    @Post('add')
    addShopItem(@Body() item: Partial<ShopItem>) {
        return this.shopService.addShopItem(item);
    }
    @Post('buy/:itemId')
    @UseGuards(JwtAuthGuard)
    buyShopItem(@Param('itemId', ParseIntPipe) itemId: number, @User('id') userId: string) {
        return this.shopService.buyShopItem(itemId, userId);
    }
}
