import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShopItem } from './schema/shop-item.schema';
import { Model } from 'mongoose';
import { UserInventory } from './schema/user-inventory.schema';
import { UserRewards } from 'src/points/schemas/user-rewards.schema';

@Injectable()
export class ShopService {
    constructor(
        @InjectModel(ShopItem.name)
        private shopItemModel: Model<ShopItem>,
        @InjectModel(UserInventory.name) 
        private userInventoryModel: Model<UserInventory>, 
        @InjectModel('UserRewards')
        private userRewardsModel: Model<UserRewards>,
    ) {}
    async getShopItems(): Promise<ShopItem[]> {
        return this.shopItemModel.find().exec();
    }
    async getShopItemById(itemId: number): Promise<ShopItem> {
        const shopItem = await this.shopItemModel.findOne({itemId}).exec();
        if (!shopItem) {
            throw new Error(`Shop item with id ${itemId} not found`);
        }
        return shopItem;
    }
    async getUserInventory(userId: string): Promise<UserInventory> {
        const userInventory = await this.userInventoryModel.findOne({ userId }).exec();
        if (!userInventory) {
            throw new Error(`User inventory for userId ${userId} not found`);
        }
        return userInventory;
    }
    async addShopItem(item: Partial<ShopItem>): Promise<ShopItem> {
        const newItem = new this.shopItemModel(item);
        return newItem.save();
    }
    async deleteShopItem(itemId: number): Promise<ShopItem> {
        const deletedItem = await this.shopItemModel.findOneAndDelete({ itemId }).exec();
        if (!deletedItem) {
            throw new Error(`Shop item with id ${itemId} not found`);
        }
        return deletedItem;
    }
    async buyShopItem(itemId: number, userId: number): Promise<UserInventory> {
        const shopItem = await this.shopItemModel.findOne({ itemId }).exec();
        if (!shopItem) {
            throw new Error(`Shop item with id ${itemId} not found`);
        }
        const userInventory = await this.userInventoryModel.findOne({ userId }).exec();
        const userRewards = await this.userRewardsModel.findOne({ userId}).exec();
        if (!userInventory) {
            throw new Error(`User inventory for userId ${userId} not found`);
        }
        if (!userRewards) {
            throw new Error(`User rewards for userId ${userId} not found`);
        }
        if (userRewards.currentPoints < shopItem.cost) {
            throw new HttpException(
                { message: 'Not enough points.' },
                HttpStatus.BAD_REQUEST
            );
        } else {
            if (userInventory.ownedItems.includes(itemId)) {
                throw new HttpException(
                    { message: 'Item already owned.' },
                    HttpStatus.BAD_REQUEST
                );
            } else {
                userRewards.currentPoints -= shopItem.cost;
                await userRewards.save();
                userInventory.ownedItems.push(itemId);
                await userInventory.save();
            }
        }
        return userInventory;
    }
}
