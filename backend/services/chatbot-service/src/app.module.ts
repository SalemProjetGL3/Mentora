import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ChatGateway } from './gateway/chat.gateway';
import { join } from 'path';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '../.env'),
      ],
    }),
  ],
  controllers: [],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
