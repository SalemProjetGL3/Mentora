import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointsModule } from './points/points.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserRewards, UserRewardsSchema } from './points/schemas/user-rewards.schema';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [PointsModule, 
      LeaderboardModule,     
      ConfigModule.forRoot({
      isGlobal: true,
        envFilePath: [
          join(__dirname, '../../../.env'),
          join(__dirname, '../.env'),
        ]
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
        }),
        inject: [ConfigService],
      }),
      EventEmitterModule.forRoot(),
      ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
