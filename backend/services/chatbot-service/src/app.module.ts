import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
